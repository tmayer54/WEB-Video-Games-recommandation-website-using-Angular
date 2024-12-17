-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Dim 18 Juin 2023 à 21:32
-- Version du serveur :  5.7.11
-- Version de PHP :  5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `we4b`
--

-- --------------------------------------------------------

--
-- Structure de la table `category`
--

CREATE TABLE `category` (
  `ID` int(8) NOT NULL,
  `name` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `category`
--

INSERT INTO `category` (`ID`, `name`) VALUES
(1, ''),
(2, 'Solo'),
(3, 'Multiplayer'),
(4, 'Adventure'),
(5, 'FPS'),
(6, 'Puzzle'),
(7, 'Open World'),
(8, 'RPG'),
(9, 'Strategy'),
(10, 'Simulation'),
(11, 'MOBA'),
(12, 'Retro');

-- --------------------------------------------------------

--
-- Structure de la table `categorygame`
--

CREATE TABLE `categorygame` (
  `ID` int(8) NOT NULL,
  `ID_category` int(8) NOT NULL,
  `ID_game` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `categorygame`
--

INSERT INTO `categorygame` (`ID`, `ID_category`, `ID_game`) VALUES
(20, 7, 26),
(21, 10, 26),
(22, 2, 27),
(23, 10, 27),
(24, 3, 28),
(25, 5, 28),
(26, 9, 28),
(30, 3, 30),
(31, 5, 30),
(32, 7, 30),
(33, 2, 31),
(34, 7, 31);

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

CREATE TABLE `comment` (
  `ID` int(8) NOT NULL,
  `content` varchar(2000) NOT NULL,
  `ID_game` int(8) NOT NULL,
  `ID_user` int(8) NOT NULL,
  `note` int(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `comment`
--

INSERT INTO `comment` (`ID`, `content`, `ID_game`, `ID_user`, `note`) VALUES
(36, 'Ils font tellement de maj c\'est incroyable ! ', 26, 36, 5),
(37, 'Un jeu sympa mais vite répétitif !', 27, 36, 3),
(38, 'C\'était mieux avant :/', 28, 34, 2),
(39, 'Il a complétement vrillé ce jeu ! Mais il est sympa , vivement le 6 ', 30, 35, 3),
(40, 'Ne mérite pas sa réputation...', 26, 37, 2),
(41, 'Jeu surprenant, un vrai coup de cœur !', 28, 37, 5),
(42, 'Aucun intérêt, à éviter à tout prix !', 30, 37, 1),
(43, 'Très bon jeu !', 26, 35, 4),
(44, 'Sensationnel !', 28, 35, 5),
(45, 'Passionnant et extrêmement beau ! Ce jeu a beaucoup à vous apporter !', 27, 35, 5);

-- --------------------------------------------------------

--
-- Structure de la table `game`
--

CREATE TABLE `game` (
  `ID` int(8) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` varchar(2000) NOT NULL,
  `dev` int(8) NOT NULL COMMENT 'ID dev',
  `longDescription` varchar(5000) NOT NULL,
  `price` int(5) NOT NULL DEFAULT '0',
  `videoCode` varchar(200) DEFAULT 'R2hkdKVJSJ0',
  `cpu` varchar(200) DEFAULT NULL,
  `gpu` varchar(200) DEFAULT NULL,
  `ram` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `game`
--

INSERT INTO `game` (`ID`, `name`, `description`, `dev`, `longDescription`, `price`, `videoCode`, `cpu`, `gpu`, `ram`) VALUES
(26, 'Satisfactory', 'Sublime jeu de construction , d\'industrialisation et d\'automatisation ! ', 34, 'Satisfactory est un jeu de construction d’usines en vue à la première personne dans un monde ouvert avec une touche d’exploration et de combats. Jouez seul ou entre amis, explorez une planète inconnue, construisez des usines à plusieurs niveaux et des tapis roulants à l’infini !\nConstruire\nDominez la nature en construisant d’énormes usines à travers le pays. Développez-les librement. La planète regorge de ressources naturelles précieuses qui n’attendent que vous. En tant qu’employé de la FICSIT, il est de votre devoir de garantir leur bonne utilisation.\nAutomatiser\nConstruisez vos usines à la perfection, ou mettez en place de complexes réseaux de tapis roulants pour satisfaire tous vos besoins. Automatisez les camions et les trains pour atteindre vos avant-postes éloignés et assurez-vous de bien manipuler les liquides en les transportant dans des tuyaux. Il s’agit de minimiser le travail manuel !\nExplorer et exploiter\nAventurez-vous dans des expéditions à la recherche de nouveaux matériaux et assurez-vous de tout utiliser à bon escient. La nature est à vous et vous offre toutes ses ressources ! Vous avez des véhicules, des jetpacks, des tapis de saut et plus encore à votre disposition pour faciliter vos explorations. Prenez soin de revêtir l’équipement de sécurité adéquat, au cas où vous rencontrez la faune locale.\n\nSource: https://www.instant-gaming.com/', 21, 'QvWaV4qshZQ', 'Intel Core i5-11600K', 'NVIDIA GeForce GTX 1660 Ti', '8 GB DDR4 RAM'),
(27, 'Pan\'orama', 'Petit jeu indé créatif et amusant. Jeu de construction basé sur des "tuiles".', 35, 'Détendez-vous et soyez créatif dans un jeu de puzzle de construction de ville. Créez des paysages étonnants et découvrez des structures fantastiques. Plongez dans un monde de beauté et de sérénité avec vos panoramas et prenez soin de vos animaux de compagnie !', 10, 'Os5caLye1ng', 'Intel Core i7-10700K', 'AMD Radeon RX 5500 XT', '8 GB DDR4 RAM'),
(28, 'Rainbow six siege', 'Jeux FPS multijoueur connu et réputé pour mettre un accent sur la stratégie ! \nNe foncez pas dans le tas ! ', 35, 'Rainbow Six Siege pour PC est un jeu de tir tactique en ligne. L\'accent est mis sur la destruction de l\'environnement et la coopération entre les joueurs, chaque joueur prenant le contrôle d\'un personnage à défendre ou à attaquer dans chaque scénario. Il s\'agit notamment de la libération d\'otages, du désamorçage de bombes et de la capture ou de la défense d\'un point de contrôle.\n\nLe jeu démarre lentement, mais de nombreuses mises à jour de contenu téléchargeable, ainsi que le travail des développeurs, depuis sa sortie, ont permis de combler les lacunes dans le gameplay, l’intrigue et la progression. Ce jeu est maintenant reconnu comme des meilleurs jeux de son genre avec plus de 45 millions de joueurs enregistrés dans le monde.\n', 7, 'h_rf8K13gow', 'AMD Ryzen 7 5800X', 'NVIDIA GeForce RTX 3060 Ti', '16 GB DDR4 RAM'),
(30, 'GTA V', 'Grand Theft Auto V : Édition Premium inclut l\'histoire complète de Grand Theft Auto V, un accès gratuit au monde en perpétuelle évolution de Grand Theft Auto Online et aux améliorations de gameplay et au contenu existants, dont le Braquage de Cayo Perico, le Diamond Casino & Hôtel, le Braquage du Diamond Casino, Trafic d\'armes, et bien plus encore. Vous obtiendrez également le Pack d\'entrée dans le monde criminel, le moyen le plus rapide de lancer votre empire criminel dans Grand Theft Auto Online.', 34, '\nGRAND THEFT AUTO V\nUn jeune arnaqueur, un braqueur de banque à la retraite et un terrible psychopathe doivent effectuer une série de braquages pour survivre dans une ville sans pitié où ils ne peuvent faire confiance à personne, et encore moins à leurs compagnons.\n\nGRAND THEFT AUTO ONLINE\nDécouvrez un monde en constante évolution où vous pourrez gravir les échelons de la hiérarchie criminelle de Los Santos et de Blaine County comme vous le souhaitez dans l\'expérience en ligne ultime.\n\nLE PACK D\'ENTRÉE DANS LE MONDE CRIMINEL\nLe Pack d\'entrée dans le monde criminel est pour les nouveaux joueurs de GTA Online le moyen le plus rapide de lancer leur empire criminel. Profitez du contenu le plus populaire et d\'un bonus de 1 000 000 GTA$ à dépenser en jeu, le tout pour une valeur totale de plus de 10 000 000 GTA$ (si acheté séparément).\n', 10, 'tV95N0TIltc', 'AMD Ryzen 7 5800X', 'AMD Radeon RX 6800', '16 GB DDR4 RAM'),
(31, 'Outer Wild', 'Nommé Game of the Year 2019 par Giant Bomb, Polygon, Eurogamer et The Guardian, acclamé par la critique et récompensé par de nombreux prix, Outer Wilds est un jeu mystérieux en monde ouvert, mettant en scène un système solaire piégé dans une boucle temporelle infinie.', 37, 'Bienvenue dans le programme spatial !\nVous êtes la nouvelle recrue de Outer Wilds Ventures, un récent programme spatial qui enquête sur un étrange système solaire en évolution permanente.\n\nLes mystères du système solaire...\nQu\'est-ce qui se cache au cœur du sinistre Dark Bramble ? Qui a bâti les ruines extraterrestres sur la Lune ? Est-il possible de stopper la boucle temporelle infinie ? Des réponses vous attendent dans les étendues spatiales les plus dangereuses.\n\nUn monde qui évolue au fil du temps\nLes planètes de Outer Wilds sont pleines de lieux cachés qui évoluent au fil du temps. Visitez une cité souterraine avant qu\'elle ne soit ensevelie sous le sable, ou explorez la surface d\'une planète qui s\'effrite sous vos pieds. Chaque secret est protégé dans des environnements dangereux et soumis à des catastrophes naturelles.', 7, 'd6LGnVCL1_A', 'Intel Core i5-11600K', 'NVIDIA GeForce RTX 3060 Ti', '8 GB DDR4 RAM');

-- --------------------------------------------------------

--
-- Structure de la table `hasbought`
--

CREATE TABLE `hasbought` (
  `ID` int(8) NOT NULL,
  `ID_user` int(8) NOT NULL,
  `ID_game` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `hasbought`
--

INSERT INTO `hasbought` (`ID`, `ID_user`, `ID_game`) VALUES
(14, 36, 26),
(15, 36, 27),
(16, 34, 28),
(17, 35, 30),
(18, 37, 26),
(19, 37, 28),
(20, 37, 31),
(21, 37, 30),
(22, 35, 26),
(23, 35, 28),
(24, 35, 27);

-- --------------------------------------------------------

--
-- Structure de la table `image`
--

CREATE TABLE `image` (
  `ID` int(8) NOT NULL,
  `link` varchar(500) NOT NULL,
  `ID_game` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `image`
--

INSERT INTO `image` (`ID`, `link`, `ID_game`) VALUES
(26, '../assets/images/1687093070073.jpg', 26),
(27, '../assets/images/1687093077201.jpg', 26),
(28, '../assets/images/1687093859498.jpg', 27),
(29, '../assets/images/1687093862360.jpg', 27),
(30, '../assets/images/1687094076373.jpg', 28),
(31, '../assets/images/1687094949972.jpg', 30),
(32, '../assets/images/1687094960896.jpg', 30),
(33, '../assets/images/1687109759179.jpg', 31);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `ID` int(8) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `dev` tinyint(1) NOT NULL DEFAULT '0',
  `profilePictureURL` varchar(500) NOT NULL DEFAULT './assets/images/Pesto_tete.png',
  `email` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`ID`, `username`, `password`, `dev`, `profilePictureURL`, `email`) VALUES
(34, 'Alex', '*56B8928A47B1E466F9A464B6C7A19189E397332D', 1, './assets/images/Pesto_tete.png', 'alex.b@gmail.com'),
(35, 'Luc', '*56B8928A47B1E466F9A464B6C7A19189E397332D', 1, '../assets/images/1687093140379.jpg', 'luc@utbm.fr'),
(36, 'Iron', '*56B8928A47B1E466F9A464B6C7A19189E397332D', 0, '../assets/images/1687094541636.jpg', 'Ironmc@gmail.fr'),
(37, 'LeBelfortdu90', '*56B8928A47B1E466F9A464B6C7A19189E397332D', 1, './assets/images/Pesto_tete.png', 'bellefortte@utbm.fr'),
(38, 'usertest', '*CB906022B4E0E990F2583F7E97924C99ECC580DD', 1, '../assets/images/1687123825278.png', 'usertest@gmail.com'),
(39, 'usertest2', '*03BCA50D1C8F8D56E077B51F5C70F2AC4512D70B', 0, '../assets/images/1687123900484.jpg', 'usertest2@gmail.com');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID`);

--
-- Index pour la table `categorygame`
--
ALTER TABLE `categorygame`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `categorygame_ibfk_1` (`ID_game`),
  ADD KEY `categorygame_ibfk_2` (`ID_category`);

--
-- Index pour la table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `comment_ibfk_1` (`ID_game`),
  ADD KEY `comment_ibfk_2` (`ID_user`);

--
-- Index pour la table `game`
--
ALTER TABLE `game`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `game_ibfk_1` (`dev`);

--
-- Index pour la table `hasbought`
--
ALTER TABLE `hasbought`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `hasbought_ibfk_1` (`ID_user`),
  ADD KEY `hasbought_ibfk_2` (`ID_game`);

--
-- Index pour la table `image`
--
ALTER TABLE `image`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `image_ibfk_1` (`ID_game`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT pour la table `categorygame`
--
ALTER TABLE `categorygame`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT pour la table `comment`
--
ALTER TABLE `comment`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT pour la table `game`
--
ALTER TABLE `game`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT pour la table `hasbought`
--
ALTER TABLE `hasbought`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT pour la table `image`
--
ALTER TABLE `image`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `categorygame`
--
ALTER TABLE `categorygame`
  ADD CONSTRAINT `categorygame_ibfk_1` FOREIGN KEY (`ID_game`) REFERENCES `game` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `categorygame_ibfk_2` FOREIGN KEY (`ID_category`) REFERENCES `category` (`ID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`ID_game`) REFERENCES `game` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`ID_user`) REFERENCES `user` (`ID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `game`
--
ALTER TABLE `game`
  ADD CONSTRAINT `game_ibfk_1` FOREIGN KEY (`dev`) REFERENCES `user` (`ID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `hasbought`
--
ALTER TABLE `hasbought`
  ADD CONSTRAINT `hasbought_ibfk_1` FOREIGN KEY (`ID_user`) REFERENCES `user` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `hasbought_ibfk_2` FOREIGN KEY (`ID_game`) REFERENCES `game` (`ID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `image`
--
ALTER TABLE `image`
  ADD CONSTRAINT `image_ibfk_1` FOREIGN KEY (`ID_game`) REFERENCES `game` (`ID`) ON DELETE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
