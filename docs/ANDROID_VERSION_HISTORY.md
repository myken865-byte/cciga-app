# CCIGA App — Historique des versions Android

_Mandat "Automatisation Google Play" (2026-09-07), §7 — Versioning automatique. Chaque ligne correspond à un AAB/APK réellement produit. Mis à jour à chaque nouveau build, jamais réécrit rétroactivement._

| versionCode | versionName | Commit Git | Date | Environnement | Track Google Play | Résultat |
|---|---|---|---|---|---|---|
| 1 | 1.0 | (non tracé — build initial, avant la mise en place de cet historique) | — | Local / test-builds | Aucun (jamais uploadé) | N/A |
| 2 | 1.0 | 1385077 (correctif applicationId) + suivant (bump versionCode) | 2026-09-08 | CI GitHub Actions (`android-release-aab.yml`) | Aucun — AAB produit et vérifié en CI, aucun upload Google Play effectué | Build/signature/vérifications réussis (voir run CI) |

## Règle de progression

- Le prochain AAB **réellement envoyé à Google Play** (n'importe quel track) doit utiliser un versionCode strictement supérieur à **2** — mettre à jour `LAST_UPLOADED_VERSION_CODE` dans `.github/workflows/android-release-aab.yml` uniquement après un upload réel confirmé, jamais avant.
- `versionCode` doit être strictement croissant, sans exception, y compris entre deux tracks différents (Internal Testing puis Closed Testing partagent la même séquence).
- Ne jamais réutiliser un `versionCode` déjà listé ci-dessus, même si l'upload correspondant a échoué côté Google Play — incrémenter et réessayer.

## État de la clé de signature (Play App Signing)

- Aucun AAB n'a jamais été uploadé sur Google Play Console à ce jour — donc aucune "App Signing Key" n'a encore été générée par Google, et aucun "Upload Key" n'est encore enregistré côté Play Console.
- Le keystore de release (`cciga-release.keystore`) n'est pas conservé en clair dans le dépôt ni sur la machine de développement en dehors d'une fenêtre de build : il est stocké encodé en base64 dans le secret GitHub Actions `ANDROID_RELEASE_KEYSTORE_BASE64` (+ `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`), écrit temporairement sur le disque par `.github/workflows/android-release-aab.yml` puis supprimé explicitement après chaque build (« defense in depth »). C'est la source de vérité pour toute signature de release.
