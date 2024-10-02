# Classement ELO pour le tournoi de fléchettes

Ce projet utilise un système de **classement ELO** pour gérer et évaluer la performance des joueurs dans un tournoi de fléchettes 

# Lancer le projet
- npm install
- npm run dev / build (pour la prod)

https://fr.wikipedia.org/wiki/Classement_ELO

## Fonctionnement du système ELO

Le **système de classement ELO** repose sur les principes suivants :
- Chaque joueur commence avec un score ELO de base, typiquement **1000**.
- À la fin de chaque match, les scores ELO des joueurs sont ajustés en fonction des résultats :
  - Si un joueur gagne, son score ELO augmente.
  - Si un joueur perd, son score ELO diminue.
  - Le changement dépend de la différence de classement ELO entre les deux joueurs avant le match.
