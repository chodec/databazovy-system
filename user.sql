-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 18, 2019 at 01:16 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user`
--

-- --------------------------------------------------------

--
-- Table structure for table `school`
--

CREATE TABLE `school` (
  `name` varchar(100) COLLATE utf16_czech_ci NOT NULL,
  `gender` varchar(20) COLLATE utf16_czech_ci NOT NULL,
  `headmaster` varchar(30) COLLATE utf16_czech_ci NOT NULL,
  `headmaster7` varchar(35) COLLATE utf16_czech_ci NOT NULL,
  `shortname` varchar(50) COLLATE utf16_czech_ci NOT NULL,
  `street` varchar(50) COLLATE utf16_czech_ci NOT NULL,
  `city` varchar(50) COLLATE utf16_czech_ci NOT NULL,
  `psc` int(10) NOT NULL,
  `ico` int(20) NOT NULL,
  `redizo` varchar(30) COLLATE utf16_czech_ci NOT NULL,
  `web` varchar(100) COLLATE utf16_czech_ci NOT NULL,
  `contactperson` varchar(100) COLLATE utf16_czech_ci NOT NULL,
  `contactemail` varchar(100) COLLATE utf16_czech_ci NOT NULL,
  `contactphone` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `email` varchar(100) COLLATE utf16_czech_ci NOT NULL,
  `name` varchar(100) COLLATE utf16_czech_ci NOT NULL,
  `surname` varchar(50) COLLATE utf16_czech_ci NOT NULL,
  `password` varchar(100) COLLATE utf16_czech_ci NOT NULL,
  `authorization` varchar(20) COLLATE utf16_czech_ci NOT NULL,
  `school` varchar(100) COLLATE utf16_czech_ci NOT NULL,
  `phone` varchar(11) COLLATE utf16_czech_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16 COLLATE=utf16_czech_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`email`, `name`, `surname`, `password`, `authorization`, `school`, `phone`) VALUES
('dfgfg@dgfsd.cz', 'Ada', 'Ada', '1asd', 'user', 'Å kola', '123123123'),
('dfgfgaaaa@dgfsd.cz', 'Ada', 'Ada', '1adad', 'user', 'Å kola', '123132132');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
