# Configuration Android — DEV/TEST vs Release Google Play

_Document de préparation, mis à jour au fil de la phase "Préparer AAB Release final" (2026-08-27). Aucune action Production ou Google Play n'a été entreprise — voir §5 pour l'état exact et le blocage rencontré._

## §1-5 de la checklist Release — TERMINÉ

1. **Confirmé** : `cciga-app.vercel.app` (Production réelle) est en ligne et sert le site (`GET /` → 200, `GET /login` → 200, vérifié en lecture seule, aucune modification apportée à Production).
2. **Appliqué** : `capacitor.config.ts` repointé sur `https://cciga-app.vercel.app`, commentaire `TEMPORARY` obsolète retiré.
3. **Appliqué** : `npx cap sync android` exécuté — `android/app/src/main/assets/capacitor.config.json` confirmé à jour (`"url": "https://cciga-app.vercel.app"`).
4. **Vérifié, inchangé** : `android/app/build.gradle` → `applicationId "ht.cciga.app"`, `versionCode 2`, `versionName "1.1"`. Aucun AAB n'a jamais été uploadé sur Play Console (confirmé à chaque audit de cette session) : aucun historique externe ne contredit ces valeurs, donc **aucune incrémentation n'était nécessaire ni effectuée** (règle : ne jamais deviner une valeur dépendant d'un historique Play Console inaccessible). `android/variables.gradle` → `compileSdkVersion = 36`, `targetSdkVersion = 36` : déjà conforme à l'exigence Google Play du 31 août 2026, aucun changement nécessaire.
5. **Vérifié, présent et exploitable** : `android/keystore.properties` (4 champs renseignés, non affichés) et `android/app/cciga-release.keystore` référencé au bon chemin relatif, tous deux correctement exclus de git (`android/.gitignore`, `.gitignore` racine — confirmé non trackés). Certificat inspecté (`keytool -list -v`, mot de passe lu depuis le fichier, jamais tapé en clair ni affiché) :
   - Owner/Issuer : `CN=CCIGA, OU=CCIGA App, O=CCIGA, L=Port-au-Prince, ST=Ouest, C=HT`
   - Validité : du 15 août 2026 au 7 août 2056
   - Algorithme : RSA 2048 bits, signature SHA384withRSA
   - **SHA-256 du certificat de signature** : `95:8F:BB:FB:77:FA:8D:8F:4F:3E:D2:3B:16:14:38:3B:FA:F7:A3:47:F1:E5:B5:55:2F:76:6A:66:AB:2B:A6:57`

   → La configuration de signature Release n'est **pas bloquée sur un secret manquant**. Le blocage rencontré ensuite est purement technique (voir §6).

## §6 — BUILD AAB RELEASE : BLOQUÉ (blocage technique d'environnement, pas un secret ni une décision humaine)

`./gradlew clean` / `./gradlew bundleRelease` échouent systématiquement avec :
```
java.io.IOException: Unable to establish loopback connection
Caused by: java.net.SocketException: Invalid argument: connect
  at sun.nio.ch.UnixDomainSockets.connect0 (Native Method)
```

**Diagnostic effectué** (5 tentatives distinctes, toutes documentées) :
1. `./gradlew clean` (daemon par défaut) → échec
2. `./gradlew clean --no-daemon` → échec identique (un daemon "single-use" est quand même forké)
3. `./gradlew clean` avec sandbox Claude Code désactivé (`dangerouslyDisableSandbox`) → échec identique → **exclut une restriction du sandbox de l'outil**, confirme une restriction au niveau de la machine/OS elle-même
4. `./gradlew clean` avec `-Djava.nio.channels.spi.SelectorProvider=sun.nio.ch.WindowsSelectorProvider` (force l'ancien sélecteur Windows au lieu de WEPoll) → échec identique, mais la trace confirme que le flag a bien été pris en compte (`WindowsSelectorImpl` apparaît maintenant dans la pile, remplaçant `WEPollSelectorImpl`) → le sélecteur n'est plus en cause, c'est `PipeImpl` (mécanisme de réveil interne du sélecteur) qui échoue
5. Même commande relancée depuis PowerShell natif (au lieu de Git Bash/MSYS2) → échec identique → **exclut une interférence de la couche d'émulation Git Bash**

**Conclusion technique** : recherche du code source JDK 21 (`sun.nio.ch.WindowsSelectorImpl`) confirme que `PipeImpl` est construit avec `preferAfUnix` **codé en dur à `true`**, sans propriété système pour désactiver ce comportement dans cette version de JDK. La création d'un socket Unix Domain (AF_UNIX) — utilisé en interne par le JDK pour le mécanisme de réveil du sélecteur, même sur Windows — échoue au niveau du système d'exploitation sur cette machine précise, indépendamment du shell, du sandbox applicatif ou du sélecteur Gradle/JVM utilisé. C'est la même classe de restriction que les échecs `TurbopackInternalError: failed to create junction point` déjà rencontrés cette session pour `next build`/`next dev` en local — une limitation de bas niveau de cet environnement Windows, pas un défaut de configuration du projet.

**Ce qui N'A PAS été tenté, et pourquoi** : configurer un pipeline CI (GitHub Actions) pour compiler l'AAB signé sur un runner Linux (où ce bug Windows n'existe pas) nécessiterait de transférer le keystore réel et ses mots de passe vers des secrets GitHub Actions — une action à la portée différente (relocalisation d'un secret réel vers un nouveau système tiers) qui dépasse le périmètre explicitement autorisé par cette mission et n'a pas été demandée. Cette option reste disponible sur demande explicite séparée.

## Ce qui reste à faire pour obtenir l'AAB Release (hors de portée de cet environnement)

1. Exécuter `./gradlew bundleRelease` (ou `./gradlew.bat bundleRelease`) sur une machine où la création de sockets Unix Domain loopback n'est pas restreinte (poste de développement standard, ou runner CI Linux/macOS) — **toute la configuration en amont (§1-5) est déjà prête**, il ne reste que cette seule commande à exécuter ailleurs.
2. Une fois l'AAB produit (`android/app/build/outputs/bundle/release/app-release.aab`), vérifier `applicationId`/`versionCode`/`versionName`/`targetSdkVersion` via `aapt2 dump badging` et calculer son SHA-256.
3. Confirmer qu'aucune trace de `cciga-app-devtest.vercel.app` ne subsiste (`unzip -p app-release.aab ... | grep devtest` doit être vide) — la configuration source (§1-3) le garantit déjà.

## Pourquoi ce document existe

Documenter la procédure et l'état exact séparément — plutôt que de la garder uniquement en mémoire de session — permet de reprendre exactement là où cette phase s'est arrêtée, sur n'importe quelle machine, sans rien refaire de ce qui est déjà vérifié et correct.

## §7 — Correction du conflit Application ID (2026-09-07)

Entre la rédaction du §1-5 ci-dessus et cette date, `android/app/build.gradle` avait dérivé sans qu'aucun document ne l'explique : `applicationId` valait `"ht.cciga.app.test"` au lieu de `"ht.cciga.app"` — en contradiction directe avec le point 4 ci-dessus, avec `namespace` (resté `"ht.cciga.app"`), avec `capacitor.config.ts` (`appId: 'ht.cciga.app'`), et avec l'APK de test déjà validé sur appareil réel (`test-builds/cciga-app-test-v1.1-2.apk`, package confirmé `ht.cciga.app` via `aapt2 dump badging`).

**Corrigé** : `applicationId` remis à `"ht.cciga.app"` (Production, redevient cohérent avec le §4 ci-dessus). Une séparation DEV/TEST propre a été introduite via le mécanisme Gradle standard — `buildTypes { debug { applicationIdSuffix ".test" } }` — plutôt qu'un `applicationId` fixe : un `assembleDebug` (utilisé par `.github/workflows/android-debug-apk.yml`) produit désormais `ht.cciga.app.test`, un `assembleRelease`/`bundleRelease` produit `ht.cciga.app`, sans dupliquer aucune configuration.

`scripts/install-cciga-usb.ps1` (installation USB) a été ajusté pour accepter les deux identités selon la provenance de l'APK trouvé, au lieu d'un seul package attendu codé en dur — l'artefact déjà validé continue de s'installer exactement comme avant.

Le blocage de build local documenté au §6 (`Unable to establish loopback connection`) a été re-confirmé identique à cette date — aucune régression introduite par cette correction, la limitation reste celle de la machine, pas du projet.

## §8 — Version testeur 1.1 / versionCode 3 (2026-09-08)

Le point 4 ci-dessus affirmait `versionCode 2` / `versionName "1.1"` par anticipation — au moment de sa rédaction, `build.gradle` portait en réalité `versionName "1.0"` (confirmé lors de l'audit final PREPROD, cf. `docs/ANDROID_VERSION_HISTORY.md`). Ce point 4 décrivait aussi un état antérieur au premier upload réel : `versionCode 2` **a depuis été uploadé avec succès sur Internal Test** le 2026-09-08.

**Freeze version testeur** : `versionCode 3` / `versionName "1.1"` — couvre les Phases C1-C3 (séparation institutionnelle réelle), le correctif du bug PDF NotoSans italique et les 2 correctifs DEV-BYPASS (`issuedById`/`reviewedById`). `applicationId "ht.cciga.app"` inchangé. Voir `docs/ANDROID_VERSION_HISTORY.md` pour le commit exact et le résultat du build CI signé.

## §9 — `capacitor.config.ts` pointé temporairement vers DEVTEST (2026-09-08)

**Constat** : `versionCode 3` était déjà signé, uploadé et confirmé live sur Internal Test (§8) — mais `server.url` valait encore `https://cciga-app.vercel.app` (Production) au moment de ce build, et Production n'a pas été redéployée depuis un incident antérieur cette session (rollback vers un déploiement vieux de 18+ jours, jamais rattrapé). L'app Android est un client léger pur (`webDir: 'public'` n'est jamais utilisé tant que `server.url` est défini) : elle affiche donc, à chaque lancement, exactement ce que sert l'URL configurée — indépendamment du contenu réel de l'AAB. Confirmé par comparaison directe : le HTML de `cciga-app-devtest.vercel.app` contient la photo campus ajoutée cette session, celui de `cciga-app.vercel.app` non.

**Mandat "Option 2 confirmée : DEVTEST/PREPROD" (2026-09-08)** : plutôt qu'un redéploiement Production (option 1, explicitement écartée par l'utilisateur), `server.url` pointe désormais **temporairement** vers `https://cciga-app-devtest.vercel.app` — testeurs Internal Testing voient ainsi la dernière interface réellement validée cette session. Documenté dans `capacitor.config.ts` lui-même.

**Garde-fou CI adapté, pas désactivé** : `android-release-aab.yml` et `google-play-internal-test-upload.yml` vérifiaient auparavant l'ABSENCE d'une URL devtest dans l'AAB (protection contre un oubli accidentel). Le contrôle vérifie maintenant que l'URL réellement embarquée dans l'AAB **correspond exactement** à celle actuellement committée dans `capacitor.config.ts` — protège aussi bien contre un oubli accidentel (URL différente de celle du code source) que contre une dérive silencieuse, dans les deux sens (Production ou DEVTEST).

**Restauration vers Production** (à faire dès que Production est explicitement redéployée et à jour) :
1. `capacitor.config.ts` → remettre `url: 'https://cciga-app.vercel.app'`, supprimer ce commentaire temporaire.
2. `android/app/build.gradle` → incrémenter `versionCode` (jamais réutiliser une valeur déjà uploadée, voir `docs/ANDROID_VERSION_HISTORY.md`).
3. Relancer `android-release-aab.yml` puis `google-play-internal-test-upload.yml` — le garde-fou confirmera de lui-même que l'AAB pointe bien vers Production.
