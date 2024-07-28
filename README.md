# Nobunaga

Nobunaga est un bot Discord conçu pour intégrer une banque sur le bot [Enderbot](https://ender.gg/#) 
## Table des matières

- [Commandes](#Commandes)
- [Installation](#installation)
- [Configuration](#configuration)
- [Utilisation](#utilisation)
- [Contribuer](#contribuer)
- [Licence](#licence)

## Commandes

- **Exploration, Alchemy, Inventory, Resources**: Ces commandes permettent de consulter différents inventaires.
- **Add**: Ajoute des ressources à la banque.
- **Get**: Récupère des ressources de la banque.
- **Assert**: Connaître le nombre de ressources disponibles.
- **Configuration**: Configure les accès à la banque, notamment pour la commande `get`. Syntaxe : `configuration add/remove id`.


## Installation

Pour installer Nobunaga, suivez ces étapes :

1. Clonez le dépôt GitHub :
    ```bash
    git clone https://github.com/votre-utilisateur/nobunaga.git
    ```

2. Naviguez dans le répertoire du projet :
    ```bash
    cd nobunaga
    ```

3. Installez les dépendances :
    ```bash
    npm install
    tsc 
    ```
4. Installez PM2
   ```bash
   npm install -g pm2
   ```
## Configuration

1. Configurez votre ecosystem.config.js :
   ```js
     module.exports = {
      apps : [{
          exec_mode: 'cluster',
          name   : "White",
          script : "./dist/src/index.js",
          log: './logs/combined.log',
          error_file : "./logs/error.log",
          out_file : "./logs/out.log",
          combine_logs:true,
          autorestart:true,
          time: true,
          env_prod:{
              NODE_ENV:"prod",
              TOKEN:"", // ICI VOTRE TOKEN
              BOT_ID:'', // ICI VOTRE ID DE BOT
          },
          ignore_watch: [
              'node_modules',
              'logs',
              '.git',
          ],
          watch_options: {
              "followSymlinks": false,
              "usePolling": true
          }
      }]
    }
    ```
2. Configurez les owners :
   Allez dans le fichier `/src/Modules/Database/config.json` et ajoutez les identifiants des propriétaires qui pourront utiliser la commande `configuration`.
   Vous pouvez également entrer à la main les utilisateurs qui pourront utiliser la commande `get`

3. Dernière étape ! Lancer votre bot: 
   ```bash
    pm2 start --env prod
   ```
## Utilisation

Pour utiliser Nobunaga, assurez-vous que votre bot est en ligne et que vous avez configuré les permissions nécessaires sur votre serveur Discord.

## Contribuer

Les contributions sont les bienvenues ! Pour proposer des améliorations, veuillez ouvrir une issue ou soumettre une pull request.

## Licence

Ce projet est sous licence MIT. Pour plus de détails, consultez le fichier LICENSE.

Pour plus d'informations sur Enderbot, visitez [Ender.gg](https://ender.gg/).
