"use client";

/**
 * Cache API — stockage local des médias (images/audio) du prototype offline
 * (mandat Phase 1, 2026-09-09). Nom de cache dédié et versionné : une
 * nouvelle version de contenu ouvre un nouveau nom de cache plutôt que
 * d'écraser silencieusement l'ancien (voir §11 du mandat — une nouvelle
 * version de paquet ne doit pas effacer la progression ni les médias
 * encore utilisés par l'ancienne version tant qu'elle n'a pas été purgée
 * explicitement).
 */

export function cacheNameFor(unitId: string, version: string): string {
  return `jasmin-lab-${unitId}-v${version}`;
}

export async function isCacheApiSupported(): Promise<boolean> {
  return typeof window !== "undefined" && "caches" in window;
}

export async function cacheResource(cacheName: string, url: string): Promise<{ ok: true } | { ok: false; error: string }> {
  try {
    const cache = await caches.open(cacheName);
    const response = await fetch(url);
    if (!response.ok) return { ok: false, error: `HTTP ${response.status} pour ${url}` };
    await cache.put(url, response.clone());
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/** Lecture strictement locale — ne touche jamais le réseau, utilisée par le mode hors-ligne simulé. */
export async function readCachedResource(cacheName: string, url: string): Promise<Response | undefined> {
  const cache = await caches.open(cacheName);
  return cache.match(url);
}

export async function deleteCache(cacheName: string): Promise<boolean> {
  return caches.delete(cacheName);
}

export async function cacheHasUrl(cacheName: string, url: string): Promise<boolean> {
  const cache = await caches.open(cacheName);
  const match = await cache.match(url);
  return !!match;
}
