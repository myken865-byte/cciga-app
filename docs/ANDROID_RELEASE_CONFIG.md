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
