-- MySQL dump 10.13  Distrib 5.7.27, for Linux (x86_64)
--
-- Host: localhost    Database: task4society
-- ------------------------------------------------------
-- Server version	5.7.27-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- -----------------------------------------------------
-- Schema task4society
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `task4society` DEFAULT CHARACTER SET utf8 ;
USE `task4society` ;

--
-- Table structure for table `atividades`
--

DROP TABLE IF EXISTS `atividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `atividades` (
  `id_atividade` int(11) NOT NULL AUTO_INCREMENT,
  `id_espaco` int(11) NOT NULL,
  `id_tipo_atividade` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `valor` decimal(10,2) DEFAULT '0.00',
  `num_participantes` int(11) DEFAULT NULL,
  `confirmada` bit(1) DEFAULT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_atividade`),
  KEY `atividades_FK` (`id_tipo_atividade`),
  KEY `atividades_FK_1` (`id_espaco`),
  CONSTRAINT `atividades_FK` FOREIGN KEY (`id_tipo_atividade`) REFERENCES `tipos_atividades` (`id_tipo_atividade`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `atividades_FK_1` FOREIGN KEY (`id_espaco`) REFERENCES `espacos` (`id_espaco`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atividades`
--

LOCK TABLES `atividades` WRITE;
/*!40000 ALTER TABLE `atividades` DISABLE KEYS */;
/*!40000 ALTER TABLE `atividades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `atividades_materiais`
--

DROP TABLE IF EXISTS `atividades_materiais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `atividades_materiais` (
  `id_atividade` int(11) NOT NULL,
  `id_material` int(11) NOT NULL,
  `quantidade` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_atividade`,`id_material`),
  KEY `atividades_materiais_material` (`id_material`),
  CONSTRAINT `atividades_materiais_atividade` FOREIGN KEY (`id_atividade`) REFERENCES `atividades` (`id_atividade`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `atividades_materiais_material` FOREIGN KEY (`id_material`) REFERENCES `materiais` (`id_material`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `atividades_materiais`
--

LOCK TABLES `atividades_materiais` WRITE;
/*!40000 ALTER TABLE `atividades_materiais` DISABLE KEYS */;
/*!40000 ALTER TABLE `atividades_materiais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `espacos`
--

DROP TABLE IF EXISTS `espacos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `espacos` (
  `id_espaco` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `morada` varchar(255) DEFAULT NULL,
  `localidade` varchar(100) NOT NULL,
  `distrito` varchar(100) NOT NULL,
  `cod_postal` varchar(45) DEFAULT NULL,
  `lotacao` int(11) NOT NULL,
  `id_gestor_espaco` int(11) NOT NULL,
  `imagem` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_espaco`),
  KEY `fk_id_gestor_espaco_idx` (`id_gestor_espaco`),
  CONSTRAINT `fk_id_gestor_espaco` FOREIGN KEY (`id_gestor_espaco`) REFERENCES `utilizadores` (`id_utilizador`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `espacos`
--

LOCK TABLES `espacos` WRITE;
/*!40000 ALTER TABLE `espacos` DISABLE KEYS */;
/*!40000 ALTER TABLE `espacos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `espacos_tipos_atividade`
--

DROP TABLE IF EXISTS `espacos_tipos_atividade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `espacos_tipos_atividade` (
  `id_espaco` int(11) NOT NULL,
  `id_tipo_atividade` int(11) NOT NULL,
  PRIMARY KEY (`id_espaco`,`id_tipo_atividade`),
  KEY `espacos_tipos_atividade_tipo_atividade` (`id_tipo_atividade`),
  CONSTRAINT `espacos_tipos_atividade_espaco` FOREIGN KEY (`id_espaco`) REFERENCES `espacos` (`id_espaco`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `espacos_tipos_atividade_tipo_atividade` FOREIGN KEY (`id_tipo_atividade`) REFERENCES `tipos_atividades` (`id_tipo_atividade`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `espacos_tipos_atividade`
--

LOCK TABLES `espacos_tipos_atividade` WRITE;
/*!40000 ALTER TABLE `espacos_tipos_atividade` DISABLE KEYS */;
/*!40000 ALTER TABLE `espacos_tipos_atividade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materiais`
--

DROP TABLE IF EXISTS `materiais`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `materiais` (
  `id_material` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id_material`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materiais`
--

LOCK TABLES `materiais` WRITE;
/*!40000 ALTER TABLE `materiais` DISABLE KEYS */;
/*!40000 ALTER TABLE `materiais` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materiais_espaco`
--

DROP TABLE IF EXISTS `materiais_espaco`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `materiais_espaco` (
  `id_material` int(11) NOT NULL,
  `id_espaco` int(11) NOT NULL,
  `qtd_disponivel` decimal(10,2) DEFAULT '0.00',
  PRIMARY KEY (`id_material`,`id_espaco`),
  KEY `materiais_espaco_FK_1` (`id_espaco`),
  CONSTRAINT `materiais_espaco_FK` FOREIGN KEY (`id_material`) REFERENCES `materiais` (`id_material`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `materiais_espaco_FK_1` FOREIGN KEY (`id_espaco`) REFERENCES `espacos` (`id_espaco`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materiais_espaco`
--

LOCK TABLES `materiais_espaco` WRITE;
/*!40000 ALTER TABLE `materiais_espaco` DISABLE KEYS */;
/*!40000 ALTER TABLE `materiais_espaco` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participantes_atividade`
--

DROP TABLE IF EXISTS `participantes_atividade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `participantes_atividade` (
  `id_utilizador` int(11) NOT NULL,
  `id_atividade` int(11) NOT NULL,
  `pagou` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id_utilizador`,`id_atividade`),
  KEY `participantes_atividade_FK` (`id_atividade`),
  CONSTRAINT `fk_id_utilizador` FOREIGN KEY (`id_utilizador`) REFERENCES `utilizadores` (`id_utilizador`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `participantes_atividade_FK` FOREIGN KEY (`id_atividade`) REFERENCES `atividades` (`id_atividade`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participantes_atividade`
--

LOCK TABLES `participantes_atividade` WRITE;
/*!40000 ALTER TABLE `participantes_atividade` DISABLE KEYS */;
/*!40000 ALTER TABLE `participantes_atividade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patrocinador`
--

DROP TABLE IF EXISTS `patrocinador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patrocinador` (
  `id_patrocinador` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `logotipo` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id_patrocinador`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patrocinador`
--

LOCK TABLES `patrocinador` WRITE;
/*!40000 ALTER TABLE `patrocinador` DISABLE KEYS */;
/*!40000 ALTER TABLE `patrocinador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patrocinio`
--

DROP TABLE IF EXISTS `patrocinio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `patrocinio` (
  `id_patrocinador` int(11) NOT NULL,
  `id_espaco` int(11) NOT NULL,
  `valor` decimal(10,2) DEFAULT NULL,
  `ativo` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id_patrocinador`,`id_espaco`),
  KEY `fk_id_espaco` (`id_espaco`),
  CONSTRAINT `fk_id_espaco` FOREIGN KEY (`id_espaco`) REFERENCES `espacos` (`id_espaco`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_id_patrocinador` FOREIGN KEY (`id_patrocinador`) REFERENCES `patrocinador` (`id_patrocinador`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patrocinio`
--

LOCK TABLES `patrocinio` WRITE;
/*!40000 ALTER TABLE `patrocinio` DISABLE KEYS */;
/*!40000 ALTER TABLE `patrocinio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reservas` (
  `id_espaco` int(11) NOT NULL,
  `id_atividade` int(11) NOT NULL,
  `dataHora` datetime DEFAULT NULL,
  PRIMARY KEY (`id_espaco`,`id_atividade`),
  KEY `reservas_FK` (`id_atividade`),
  CONSTRAINT `fk_reservas_espacos` FOREIGN KEY (`id_espaco`) REFERENCES `espacos` (`id_espaco`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reservas_FK` FOREIGN KEY (`id_atividade`) REFERENCES `atividades` (`id_atividade`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipos_atividades`
--

DROP TABLE IF EXISTS `tipos_atividades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipos_atividades` (
  `id_tipo_atividade` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id_tipo_atividade`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipos_atividades`
--

LOCK TABLES `tipos_atividades` WRITE;
/*!40000 ALTER TABLE `tipos_atividades` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipos_atividades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilizadores`
--

DROP TABLE IF EXISTS `utilizadores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utilizadores` (
  `id_utilizador` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `morada` varchar(255) DEFAULT NULL,
  `cod_postal` varchar(45) DEFAULT NULL,
  `localidade` varchar(100) DEFAULT NULL,
  `distrito` varchar(100) DEFAULT NULL,
  `telefone` varchar(45) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `nacionalidade` varchar(45) DEFAULT NULL,
  `perfil` varchar(100) NOT NULL,
  PRIMARY KEY (`id_utilizador`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilizadores`
--

LOCK TABLES `utilizadores` WRITE;
/*!40000 ALTER TABLE `utilizadores` DISABLE KEYS */;
/*!40000 ALTER TABLE `utilizadores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'task4society'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-11-16 12:31:06
