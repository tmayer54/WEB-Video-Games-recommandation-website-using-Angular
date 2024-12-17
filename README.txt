Projet WE4B - Site de recommandation de jeux vidéos
Alexandre BARTHELME, Thibault MAYER, Loric RAVASSARD, Louis ROLLAND

Avant de lancer le projet, vous devez avoir un serveur MySQL qui tourne avec la base de données backend/we4b.sql (serveur avec XAMPP ou UwAmp par exemple). 
Pour le back-end, nous avons opté pour un mélange entre les notions vues en cours de WE4B et les compétences déjà acquises en WE4A. 
En effet, le back-end est organisé de la manière suivante :
   • un serveur node.js pour pouvoir accéder à une base de données MySQL
   • une base de données relationnelle que nous connaissons déjà grâce à l'UV WE4A
   • un système de service liant le back-end et le front-end à l'aide de requêtes http diverses (put, post et get).
Les sources du projet angular sont dans le dossier frontend.

Les paramètres de connexion à la base de données sont dans le fichier backend/index.js dans la fonction createConnection().
Les paramètres par défaut sont: 
  - host:"localhost",
  - user:"root",
  - password:"",    
  - database:"we4b",
  - port:3306

Vous devrez créer un projet angular (avec "ng new") puis remplacer les fichiers et le dossier src par ce qu'il a dans le dossier frontend.
Une fois le projet angular créé, utiliser la commande "npm install" depuis le dossier backend ET le dossier frontend pour installer toutes les dépendances du back-end et celles du front-end.

Pour lancer le back-end: "nodemon index.js" depuis le dossier backend.
Pour lancer le front-end: "ng serve" depuis le dossier frontend.

Le back-end et le front-end peuvent être lancés avec une seule commande en étant dans le dossier frontend: "npm start".


--------------------------------------------------------------------------
Fonctionnalités:

Pour tester les fonctionnalités du site, des utilisateurs sont déjà enregistrés dans la base de données:
    Nom d'utilisateur / mot de passe / développeur?
  - Alex / iron68 / oui
  - Luc / iron68 / oui
  - Iron / iron68 / non
  - LeBelfortdu90 / iron68 / oui

Deux types d'utilisateurs: l'utilisateur standard et le développeur. Seul un développeur peut ajouter un jeu dans la boutique, les deux types d'utilisateurs interagissent avec les jeux de la même manière.

Connecté ou non, un utilisateur peut consulter tous les jeux répertoriés (onglet Boutique) et rechercher un jeu ou un utilisateur spécifique (onglet Recherche). La recherche de jeu se fait selon plusieurs critères: nom du jeu, prix (min et max) et/ou nom du développeur.

N'importe quel utilisateur peut créer un compte (onglet Register) en choisissant sa photo de profil et son statut (développeur ou utilisateur standard). Une fois l'inscription faite, l'utilisateur est automatiquement connecté au compte créé et pourra se reconnecter à tout moment après une déconnexion en réutilisant les identifiants rentrés lors de l'inscription.

Seulement un utilisateur connecté ayant acheté le jeu (achat possible depuis l'onglet "En savoir plus" de chaque jeu) peut ajouter un commentaire et une note au jeu qu'il a acheté (un seul commentaire par personne & par jeu). La liste des commentaires & notations attribués à un jeu sont affichés dans les sections "En savoir plus" de chaque jeu.

L'ensemble de la bibliothèque de jeux disponibles est accessible depuis l'onglet Boutique. Chacun des jeux est affiché avec une image caractéristique, une description courte, des catégories, et la note globale attribuée par les joueurs. Dans l'onglet En savoir Plus, des informations plus approfondies sont apportées (note moyenne précise, configuration requise pour faire tourner le jeu, description longue, vidéo trailer, images du jeu et commentaires).

Le profil d'un compte développeur est accessible depuis chaque jeu créé par ce dernier, mais également depuis l'onglet Recherche. A l'opposé, un profil standard n'est visionnable que depuis l'onglet Recherche. Un utilisateur, qu'il soit développeur ou non, peut consulter et modifier son profil à tout moment (depuis l'onglet Mon Profil).
