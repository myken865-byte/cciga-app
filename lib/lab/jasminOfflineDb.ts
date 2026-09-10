"use client";

/**
 * IndexedDB minimal, isolé, pour le prototype "Jasmine Kindergarten —
 * offline lab" (mandat Phase 1, 2026-09-09). Aucune table Prisma, aucune
 * donnée réelle : base locale au navigateur uniquement, nom dédié pour ne
 * jamais entrer en collision avec un autre usage du navigateur.
 *
 * Trois object stores :
 * - packages   : un enregistrement par unité téléchargée (statut, version).
 * - progress   : événements de progression déjà appliqués localement.
 * - syncQueue  : file d'attente de synchronisation, clé = idempotencyKey
 *                (jamais recréée pour un même événement — c'est la garantie
 *                anti-doublon testée en §10 du mandat).
 */

const DB_NAME = "jasmin-offline-lab";
const DB_VERSION = 1;

export interface PackageRecord {
  unitId: string;
  version: string;
  status: "downloaded" | "removed";
  downloadedAt: string;
  resourceCount: number;
  totalSizeBytes: number;
}

export interface ProgressEvent {
  id?: number;
  idempotencyKey: string;
  studentIdFictif: number;
  unitId: string;
  activityId: string;
  outcome: "completed" | "to_review";
  localDate: string;
}

export interface SyncQueueItem {
  idempotencyKey: string;
  studentIdFictif: number;
  unitId: string;
  activityId: string;
  contentVersion: string;
  localDate: string;
  actionType: "activity_completed";
  syncStatus: "pending" | "synced" | "error";
  attempts: number;
  lastError: string | null;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains("packages")) {
        db.createObjectStore("packages", { keyPath: "unitId" });
      }
      if (!db.objectStoreNames.contains("progress")) {
        const store = db.createObjectStore("progress", { keyPath: "id", autoIncrement: true });
        store.createIndex("byIdempotencyKey", "idempotencyKey", { unique: true });
      }
      if (!db.objectStoreNames.contains("syncQueue")) {
        db.createObjectStore("syncQueue", { keyPath: "idempotencyKey" });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function tx<T>(db: IDBDatabase, store: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(store, mode);
    const request = fn(transaction.objectStore(store));
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function savePackageRecord(record: PackageRecord): Promise<void> {
  const db = await openDb();
  await tx(db, "packages", "readwrite", (s) => s.put(record));
}

export async function getPackageRecord(unitId: string): Promise<PackageRecord | undefined> {
  const db = await openDb();
  return tx(db, "packages", "readonly", (s) => s.get(unitId));
}

export async function deletePackageRecord(unitId: string): Promise<void> {
  const db = await openDb();
  await tx(db, "packages", "readwrite", (s) => s.delete(unitId));
}

export async function addProgressEvent(event: Omit<ProgressEvent, "id">): Promise<void> {
  const db = await openDb();
  await tx(db, "progress", "readwrite", (s) => s.add(event));
  const queueItem: SyncQueueItem = {
    idempotencyKey: event.idempotencyKey,
    studentIdFictif: event.studentIdFictif,
    unitId: event.unitId,
    activityId: event.activityId,
    contentVersion: "1.0.0",
    localDate: event.localDate,
    actionType: "activity_completed",
    syncStatus: "pending",
    attempts: 0,
    lastError: null,
  };
  await tx(db, "syncQueue", "readwrite", (s) => s.put(queueItem));
}

export async function getAllProgress(unitId: string): Promise<ProgressEvent[]> {
  const db = await openDb();
  const all = await tx<ProgressEvent[]>(db, "progress", "readonly", (s) => s.getAll());
  return all.filter((e) => e.unitId === unitId);
}

export async function getSyncQueue(): Promise<SyncQueueItem[]> {
  const db = await openDb();
  return tx(db, "syncQueue", "readonly", (s) => s.getAll());
}

export async function updateSyncQueueItem(item: SyncQueueItem): Promise<void> {
  const db = await openDb();
  await tx(db, "syncQueue", "readwrite", (s) => s.put(item));
}

/** Réinitialisation complète — bouton de test uniquement, jamais exposé hors du prototype. */
export async function clearAllLabData(): Promise<void> {
  const db = await openDb();
  await tx(db, "packages", "readwrite", (s) => s.clear());
  await tx(db, "progress", "readwrite", (s) => s.clear());
  await tx(db, "syncQueue", "readwrite", (s) => s.clear());
}
