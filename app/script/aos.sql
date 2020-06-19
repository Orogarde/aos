-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  ven. 19 juin 2020 à 12:34
-- Version du serveur :  5.7.26
-- Version de PHP :  7.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `aos`
--

-- --------------------------------------------------------

--
-- Structure de la table `aptitude`
--

DROP TABLE IF EXISTS `aptitude`;
CREATE TABLE IF NOT EXISTS `aptitude` (
  `aptitudeId` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) NOT NULL,
  `effet` varchar(500) NOT NULL,
  `aosPts` varchar(45) NOT NULL,
  `modeleId` int(11) NOT NULL,
  PRIMARY KEY (`aptitudeId`),
  KEY `fkIdx_172` (`modeleId`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='Basic information \r\nabout Product';

--
-- Déchargement des données de la table `aptitude`
--

INSERT INTO `aptitude` (`aptitudeId`, `nom`, `effet`, `aosPts`, `modeleId`) VALUES
(1, 'apti nickel', 'apti super whaouuuuu', '500', 1),
(3, 'rdfgjg', 'hjh', '400', 3);

-- --------------------------------------------------------

--
-- Structure de la table `aptitude_commandement`
--

DROP TABLE IF EXISTS `aptitude_commandement`;
CREATE TABLE IF NOT EXISTS `aptitude_commandement` (
  `aptitudeCId` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) NOT NULL,
  `effet` varchar(500) NOT NULL,
  `aosPts` varchar(45) NOT NULL,
  `modeleId` int(11) NOT NULL,
  PRIMARY KEY (`aptitudeCId`),
  KEY `fkIdx_169` (`modeleId`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='Basic information \r\nabout Product';

--
-- Déchargement des données de la table `aptitude_commandement`
--

INSERT INTO `aptitude_commandement` (`aptitudeCId`, `nom`, `effet`, `aosPts`, `modeleId`) VALUES
(1, 'apti co test 2', 'effet test super', '500', 1);

-- --------------------------------------------------------

--
-- Structure de la table `arme`
--

DROP TABLE IF EXISTS `arme`;
CREATE TABLE IF NOT EXISTS `arme` (
  `armeId` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) NOT NULL,
  `portee` varchar(45) NOT NULL,
  `nb_attaque` varchar(45) NOT NULL,
  `touche` varchar(45) NOT NULL,
  `blesse` varchar(45) NOT NULL,
  `perforation` varchar(45) NOT NULL,
  `degat` varchar(45) NOT NULL,
  `aosPts` varchar(45) NOT NULL,
  `modeleId` int(11) NOT NULL,
  PRIMARY KEY (`armeId`),
  KEY `fkIdx_166` (`modeleId`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='Basic information \r\nabout Product';

--
-- Déchargement des données de la table `arme`
--

INSERT INTO `arme` (`armeId`, `nom`, `portee`, `nb_attaque`, `touche`, `blesse`, `perforation`, `degat`, `aosPts`, `modeleId`) VALUES
(1, 'faux', '2', '45', '3', '4', '-1', '2', '15', 3);

-- --------------------------------------------------------

--
-- Structure de la table `battletome`
--

DROP TABLE IF EXISTS `battletome`;
CREATE TABLE IF NOT EXISTS `battletome` (
  `battletomeId` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(500) NOT NULL,
  `visuel` varchar(500) NOT NULL,
  PRIMARY KEY (`battletomeId`)
) ENGINE=MyISAM AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COMMENT='Basic information \r\nabout Product';

--
-- Déchargement des données de la table `battletome`
--

INSERT INTO `battletome` (`battletomeId`, `description`, `visuel`) VALUES
(14, 'Stormcast Eternal', 'artwork-bt-stormcast2.jpg'),
(13, 'Lumineth', 'artwork-bt-lumineth.jpg'),
(7, 'Sylvaneth', 'artwork-bt-sylvaneth.jpg'),
(19, 'Seraphon', 'artwork-bt-seraphon.png');

-- --------------------------------------------------------

--
-- Structure de la table `effet`
--

DROP TABLE IF EXISTS `effet`;
CREATE TABLE IF NOT EXISTS `effet` (
  `effetId` int(11) NOT NULL AUTO_INCREMENT,
  `blessure` text NOT NULL,
  `nom` varchar(45) NOT NULL,
  `valeur` text NOT NULL,
  `aosPts` varchar(45) NOT NULL,
  `modeleId` int(11) NOT NULL,
  PRIMARY KEY (`effetId`),
  KEY `fkIdx_163` (`modeleId`)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='Basic information \r\nabout Product';

--
-- Déchargement des données de la table `effet`
--

INSERT INTO `effet` (`effetId`, `blessure`, `nom`, `valeur`, `aosPts`, `modeleId`) VALUES
(1, '8', 'arme test', '4', '-4', 3),
(7, '78', 'nul', '8888', '2', 3),
(4, '8', 'test', '8', '-87', 1),
(8, '4', 'arme sequitor', '5', '-14', 3);

-- --------------------------------------------------------

--
-- Structure de la table `modele`
--

DROP TABLE IF EXISTS `modele`;
CREATE TABLE IF NOT EXISTS `modele` (
  `modeleId` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(40) NOT NULL,
  `uniteId` int(11) NOT NULL,
  PRIMARY KEY (`modeleId`),
  KEY `fkIdx_181` (`uniteId`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='Basic information \r\nabout Customer';

--
-- Déchargement des données de la table `modele`
--

INSERT INTO `modele` (`modeleId`, `nom`, `uniteId`) VALUES
(1, 'Kurnoth Hunters avec arc', 8),
(3, 'Kurnoth Hunters avec faux', 8),
(4, 'sequitor avec épée', 4);

-- --------------------------------------------------------

--
-- Structure de la table `profil`
--

DROP TABLE IF EXISTS `profil`;
CREATE TABLE IF NOT EXISTS `profil` (
  `profilId` int(11) NOT NULL AUTO_INCREMENT,
  `sauvegarde` varchar(45) NOT NULL,
  `blessure` varchar(45) NOT NULL,
  `bravoure` varchar(45) NOT NULL,
  `mouvement` varchar(45) NOT NULL,
  `aosPts` varchar(45) NOT NULL,
  `modeleId` int(11) NOT NULL,
  PRIMARY KEY (`profilId`),
  KEY `fkIdx_163` (`modeleId`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='Basic information \r\nabout Product';

--
-- Déchargement des données de la table `profil`
--

INSERT INTO `profil` (`profilId`, `sauvegarde`, `blessure`, `bravoure`, `mouvement`, `aosPts`, `modeleId`) VALUES
(1, '30', '40', '80', '600', '350', 4),
(3, '4', '5', '7', '5', '70', 3);

-- --------------------------------------------------------

--
-- Structure de la table `unite`
--

DROP TABLE IF EXISTS `unite`;
CREATE TABLE IF NOT EXISTS `unite` (
  `uniteId` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(500) NOT NULL,
  `taille_min` int(11) NOT NULL,
  `taille_max` int(11) NOT NULL,
  `cout_min` int(11) NOT NULL,
  `cout_max` int(11) NOT NULL,
  `taille_critique` int(11) NOT NULL,
  `visuel` varchar(500) NOT NULL,
  `battletomeId` int(11) NOT NULL,
  PRIMARY KEY (`uniteId`),
  KEY `fkIdx_199` (`battletomeId`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='Basic information \r\nabout Product';

--
-- Déchargement des données de la table `unite`
--

INSERT INTO `unite` (`uniteId`, `description`, `taille_min`, `taille_max`, `cout_min`, `cout_max`, `taille_critique`, `visuel`, `battletomeId`) VALUES
(8, 'Kurnoth Hunters', 3, 12, 200, 600, 9, 'kurnoth.webp', 7),
(9, 'Tree-revenants', 5, 30, 80, 420, 30, 'tree-revenant.webp', 7),
(4, 'sequitor', 5, 20, 130, 520, 20, 'sequitor.webp', 14);

-- --------------------------------------------------------

--
-- Structure de la table `utilisateur`
--

DROP TABLE IF EXISTS `utilisateur`;
CREATE TABLE IF NOT EXISTS `utilisateur` (
  `utilisateurId` int(11) NOT NULL AUTO_INCREMENT,
  `login` varchar(40) NOT NULL,
  `password` varchar(500) NOT NULL,
  PRIMARY KEY (`utilisateurId`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='Basic information \r\nabout Product';

--
-- Déchargement des données de la table `utilisateur`
--

INSERT INTO `utilisateur` (`utilisateurId`, `login`, `password`) VALUES
(1, 'fred', '570a90bfbf8c7eab5dc5d4e26832d5b1');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
