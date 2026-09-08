# CCIGA App — Historique des versions Android

_Mandat "Automatisation Google Play" (2026-09-07), §7 — Versioning automatique. Chaque ligne correspond à un AAB/APK réellement produit. Mis à jour à chaque nouveau build, jamais réécrit rétroactivement._

| versionCode | versionName | Commit Git | Date | Environnement | Track Google Play | Résultat |
|---|---|---|---|---|---|---|
| 1 | 1.0 | (non tracé — build initial, avant la mise en place de cet historique) | — | Local / test-builds | Aucun (jamais uploadé) | N/A |
| 2 | 1.0 | 0cdd48c (correctif signature) | 2026-09-08 | CI GitHub Actions (`google-play-internal-test-upload.yml`) | **Internal Test** | ✅ **Premier upload réel réussi** — edit `15161737921180393799`, commité et confirmé live sur le track. SHA-256 `a5bb839f82cab9d05bfa53e963d562304d69f6c8028523a75a5fe21056100059`, 6 172 070 octets. |

## Règle de progression

- Le prochain AAB **réellement envoyé à Google Play** (n'importe quel track) doit utiliser un versionCode strictement supérieur à **2** (déjà mis à jour dans les deux workflows après cet upload confirmé).
- `versionCode` doit être strictement croissant, sans exception, y compris entre deux tracks différents (Internal Testing puis Closed Testing partagent la même séquence).
- Ne jamais réutiliser un `versionCode` déjà listé ci-dessus, même si l'upload correspondant a échoué côté Google Play — incrémenter et réessayer.

## État de la clé de signature (Play App Signing)

- versionCode 2 a été uploadé avec succès le 2026-09-08 sur le track Internal Test — Play App Signing (déjà actif côté Play Console) a désormais enregistré une empreinte de certificat de clé d'importation à partir de ce premier bundle.
- Le keystore de release (`cciga-release.keystore`) n'est pas conservé en clair dans le dépôt ni sur la machine de développement en dehors d'une fenêtre de build : il est stocké encodé en base64 dans le secret GitHub Actions `ANDROID_RELEASE_KEYSTORE_BASE64` (+ `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD`), écrit temporairement sur le disque par `.github/workflows/android-release-aab.yml` puis supprimé explicitement après chaque build (« defense in depth »). C'est la source de vérité pour toute signature de release.
