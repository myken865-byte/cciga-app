/**
 * Service worker global — app-shell offline minimal pour CCIGA App.
 * Mandat "OPTION C — vrai app-shell offline global" (2026-09-10).
 *
 * OBJECTIF UNIQUE : permettre à l'app installée (Android/Electron) de
 * s'ouvrir sur un écran utilisable après une fermeture complète + coupure
 * réseau, au lieu de tomber sur `offline.html` (garde-fou Capacitor,
 * conservé intact, jamais déclenché tant que ce service worker contrôle
 * déjà la page — seule la toute première ouverture, avant toute connexion,
 * reste dépendante de lui).
 *
 * SÉCURITÉ — liste blanche stricte (default-deny) : seules les pages
 * publiques listées dans SAFE_PUBLIC_PATHS peuvent être mises en cache.
 * Rien sous /admin, /portail, /api, /mon-espace, /verify, /verify-badge,
 * /reinitialiser-mot-de-passe, /dev-bypass n'est jamais intercepté ni caché
 * ici — ces requêtes ne passent JAMAIS par ce service worker, elles vont
 * toujours directement au réseau (voir isCacheableNavigation()).
 *
 * PORTÉE DE L'INTERCEPTION — volontairement restreinte à deux catégories :
 *   1. Navigations plein document (request.mode === "navigate") : ce sont
 *      les seules requêtes qu'on met réellement en cache/sert depuis le
 *      cache ci-dessous.
 *   2. Assets statiques Next.js immuables (/_next/static/*) : cache-first,
 *      sûr car ces URLs sont déjà fingerprintées par build.
 * Toute autre requête (fetch RSC de navigation client Next.js, appels API,
 * images, etc.) n'est PAS interceptée — elle passe nativement au réseau.
 * C'est délibéré : Next.js App Router réutilise la même URL pour la
 * navigation plein document et pour son fetch RSC interne (mode différent,
 * en-têtes différents) ; les intercepter toutes les deux sous la même clé
 * de cache corromprait le cache document. Conséquence connue et documentée
 * (voir rapport) : un clic sur un <Link> Next.js hors-ligne échoue toujours
 * si le réseau est coupé (navigation câblée en douceur/SPA) — seule une
 * navigation plein document (ex. <a href>, rechargement, ouverture de
 * l'app) sert la page depuis le cache.
 */

const CACHE_VERSION = "shell-v3";
const PAGE_CACHE = `cciga-pages-${CACHE_VERSION}`;
const STATIC_CACHE = `cciga-static-${CACHE_VERSION}`;
const CURRENT_CACHES = new Set([PAGE_CACHE, STATIC_CACHE]);

// Pages publiques, sans authentification, sans donnée personnelle — seules
// URLs jamais mises en cache par ce service worker. Tenue à jour à la main :
// toute nouvelle page publique destinée à être joignable hors-ligne doit être
// ajoutée ici explicitement (jamais de correspondance par préfixe large).
const SAFE_PUBLIC_PATHS = [
  "/",
  "/a-propos",
  "/programmes",
  "/actualites",
  "/evenements",
  "/galerie",
  "/admission",
  "/admission/candidater",
  "/faq",
  "/contact",
  "/politique-de-confidentialite",
  "/ecole-classique",
  "/ecole-professionnelle",
  "/universite",
  "/login",
];

function isSafePublicPath(pathname) {
  return SAFE_PUBLIC_PATHS.includes(pathname);
}

// Correction (2026-09-10, après échec du 1er test Android physique) :
// contrairement à un navigateur classique, le service worker d'une app
// Capacitor tourne DANS le processus de l'app — fermer complètement l'app
// tue ce processus immédiatement, sans laisser au worker le temps de finir
// en arrière-plan. L'installation précédente attendait 16 fetches en
// parallèle avant de pouvoir passer à `activate` ; si l'app était fermée
// avant la fin, le worker restait bloqué en "installing", donc jamais actif
// à la réouverture hors-ligne — exactement le symptôme observé (repli
// systématique sur offline.html). Installation réduite au strict minimum :
// un seul aller-retour réseau ("/"), pour garantir une activation quasi
// instantanée même si l'app est refermée quelques centaines de ms après
// l'avoir ouverte. Les autres pages sûres se mettent en cache normalement,
// une par une, via handleNavigate() ci-dessous, au fil des visites réelles.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    (async () => {
      const cache = await caches.open(PAGE_CACHE);
      try {
        const response = await fetch("/", { credentials: "same-origin" });
        if (response.ok) await cache.put("/", response);
      } catch {
        // best-effort — le shell sera mis en cache à la prochaine visite en ligne.
      }
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.filter((name) => !CURRENT_CACHES.has(name)).map((name) => caches.delete(name)),
      );
      await self.clients.claim();
    })(),
  );
});

async function handleNavigate(request) {
  const url = new URL(request.url);
  const cacheable = isSafePublicPath(url.pathname);

  if (cacheable) {
    try {
      const response = await fetch(request);
      if (response.ok) {
        const cache = await caches.open(PAGE_CACHE);
        cache.put(url.pathname, response.clone());
      }
      return response;
    } catch {
      const cache = await caches.open(PAGE_CACHE);
      const cached = await cache.match(url.pathname);
      if (cached) return cached;
      // Page listée sûre mais jamais mise en cache avec succès (jamais
      // visitée en ligne) : retombe sur le garde-fou existant.
      return caches.match("/offline.html").then((r) => r || Response.error());
    }
  }

  // Route non listée (admin, portail, api, auth...) : jamais interceptée
  // côté cache — comportement réseau natif inchangé, aucun risque de servir
  // une page protégée depuis un cache partagé.
  try {
    return await fetch(request);
  } catch {
    const cache = await caches.open(PAGE_CACHE);
    const shell = await cache.match("/");
    return shell || caches.match("/offline.html").then((r) => r || Response.error());
  }
}

async function handleStaticAsset(request) {
  const cache = await caches.open(STATIC_CACHE);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return cached || Response.error();
  }
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(handleNavigate(request));
    return;
  }

  if (url.pathname.startsWith("/_next/static/")) {
    event.respondWith(handleStaticAsset(request));
    return;
  }

  // Tout le reste (fetch RSC, /api/*, images, polices hors _next/static,
  // etc.) n'est pas intercepté — réseau natif, aucune mise en cache.
});
