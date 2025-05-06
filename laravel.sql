-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 06, 2025 at 02:07 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `laravel`
--

-- --------------------------------------------------------

--
-- Table structure for table `business_requirements`
--

CREATE TABLE `business_requirements` (
  `business_requiremnt_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `identification_type` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `submitted_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_requirements`
--

INSERT INTO `business_requirements` (`business_requiremnt_id`, `user_id`, `identification_type`, `image`, `submitted_at`, `updated_at`, `created_at`) VALUES
(1, 1, 'National_Id', 'images/1746380359_tungtungtungsahur.jpg', '2025-05-04 17:39:19', '2025-05-04 17:39:19', '2025-05-04 17:39:19'),
(3, 2, 'Passport', 'images/1746500873_NETWORKING_DIAGRAM.png', '2025-05-06 03:07:53', '2025-05-06 03:07:53', '2025-05-06 03:07:53');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `product_image` varchar(255) DEFAULT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `product_name`, `category_id`, `description`, `user_id`, `product_image`, `product_price`, `created_at`, `updated_at`) VALUES
(1, 'tung tung tung sahur', 4, 'asdh jkhdkjhkjhkajh akjhfakj k', 1, 'images/1746424085_tungtungtungsahur.jpg', 100.00, '2025-05-05 05:48:05', '2025-05-05 05:48:05'),
(2, 'brr brr patapim', 5, 'adwqqqqq', 1, 'images/1746448722_brrbrrpatapim.jfif', 120.00, '2025-05-05 12:38:42', '2025-05-05 12:38:42'),
(3, 'asdsadad', 3, 'sdasd', 1, 'images/1746462382_apple-fruit.jpg', 1.00, '2025-05-05 16:26:22', '2025-05-05 16:26:22'),
(4, 'asdasdasd', 4, 'asdasd', 1, 'images/1746463502_spcode-3gu9GUB33fKleqcPLXuaHE.png', 122.00, '2025-05-05 16:45:02', '2025-05-05 16:45:02'),
(5, 'Sandals', 13, '6 inch tall sandals for our short kings', 1, 'images/1746466082_044776780e1129ee0d63a819079d9f1f.jpg', 234.00, '2025-05-05 17:28:02', '2025-05-05 17:28:02'),
(6, 'asdad', 3, 'adas', 1, 'images/1746466229_nud_assess_logo (2).png', 2.00, '2025-05-05 17:30:29', '2025-05-05 17:30:29'),
(8, 'asdadasdsd', 3, 'adas', 1, 'images/1746466279_nud_assess_logo (2).png', 2.00, '2025-05-05 17:31:19', '2025-05-05 17:31:19'),
(9, 'Kaldero', 14, 'asdasdj ; asd ajd i903upij 2 wq', 1, 'images/1746466355_cooking_pot_PNG14056.png', 221.00, '2025-05-05 17:32:35', '2025-05-05 17:32:35'),
(10, 'noodle', 5, 'hdajdiadlancnn ,mnci hd as dasd', 2, 'images/1746501219_noodle_PNG15.png', 299.00, '2025-05-06 03:13:39', '2025-05-06 03:13:39'),
(11, 'talk that talk', 12, 'tell me what oyu want', 1, 'images/1746505547_frying_pan_PNG8351.png', 899.00, '2025-05-06 04:25:47', '2025-05-06 04:25:47'),
(12, 'set me free', 12, 'you make me wanna risk it all', 1, 'images/1746505652_Animation BG.png', 899.00, '2025-05-06 04:27:32', '2025-05-06 04:27:32'),
(13, 'bubble gum', 5, 'oh baby sweet like bubble gum', 1, 'images/1746505779_R (5).png', 677.00, '2025-05-06 04:29:39', '2025-05-06 04:29:39'),
(14, 'cheshire', 12, 'hey! why so serious', 1, 'images/1746506036_R (4).png', 387.00, '2025-05-06 04:33:56', '2025-05-06 04:33:56'),
(15, 'imaginary friend', 3, 'dad you know i i i i', 1, 'images/1746507096_brrbrrpatapim.jfif', 22.00, '2025-05-06 04:51:36', '2025-05-06 04:51:36'),
(16, 'frned', 3, 'asdasd', 1, 'images/1746507210_0787925f-26c0-45b2-8e51-088251f6f6bc.jpg', 2.00, '2025-05-06 04:53:30', '2025-05-06 04:53:30'),
(17, 'Solar Panel', 16, '1000 watts , 100% legit product, made in bangladesh', 1, 'images/1746531960_R (7).png', 9999.00, '2025-05-06 11:46:00', '2025-05-06 11:46:00');

-- --------------------------------------------------------

--
-- Table structure for table `product_categories`
--

CREATE TABLE `product_categories` (
  `category_id` int(11) NOT NULL,
  `category` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_categories`
--

INSERT INTO `product_categories` (`category_id`, `category`, `created_at`, `updated_at`) VALUES
(3, 'ogoogoogaga', '2025-05-05 02:20:16', '2025-05-05 02:20:16'),
(4, 'Appliances', '2025-05-05 02:36:03', '2025-05-05 02:36:03'),
(5, 'Food', '2025-05-05 02:36:08', '2025-05-05 02:36:08'),
(6, 'Fruit', '2025-05-05 02:36:14', '2025-05-05 02:36:14'),
(7, 'Vegetables', '2025-05-05 02:36:23', '2025-05-05 02:36:23'),
(8, 'Drinks', '2025-05-05 02:40:02', '2025-05-05 02:40:02'),
(12, 'Entertainment', '2025-05-05 10:47:16', '2025-05-05 10:47:16'),
(13, 'Fashion', '2025-05-05 17:26:42', '2025-05-05 17:26:42'),
(14, 'Kitchen', '2025-05-05 17:32:28', '2025-05-05 17:32:28'),
(16, 'Technology', '2025-05-06 11:44:23', '2025-05-06 11:44:23');

-- --------------------------------------------------------

--
-- Table structure for table `product_inventory`
--

CREATE TABLE `product_inventory` (
  `stock_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_inventory`
--

INSERT INTO `product_inventory` (`stock_id`, `product_id`, `quantity`, `user_id`, `created_at`, `updated_at`) VALUES
(3, 1, 10, 1, '2025-05-06 03:58:51', '2025-05-06 03:58:51'),
(4, 6, 10, 1, '2025-05-06 04:01:31', '2025-05-06 04:01:31'),
(5, 8, 2, 1, '2025-05-06 04:10:02', '2025-05-06 04:10:02'),
(6, 8, 2, 1, '2025-05-06 04:10:54', '2025-05-06 04:10:54'),
(7, 4, 1, 1, '2025-05-06 04:22:30', '2025-05-06 04:22:30'),
(8, 4, 1, 1, '2025-05-06 04:23:07', '2025-05-06 04:23:07'),
(9, 1, 2, 1, '2025-05-06 05:42:22', '2025-05-06 05:42:22'),
(10, 9, 50, 1, '2025-05-06 11:17:26', '2025-05-06 11:17:26'),
(11, 5, 77, 1, '2025-05-06 11:17:35', '2025-05-06 11:17:35'),
(12, 17, 22, 1, '2025-05-06 11:46:19', '2025-05-06 11:46:19');

-- --------------------------------------------------------

--
-- Table structure for table `product_purchase`
--

CREATE TABLE `product_purchase` (
  `purchase_id` int(11) NOT NULL,
  `stock_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_purchase`
--

INSERT INTO `product_purchase` (`purchase_id`, `stock_id`, `quantity`, `user_id`, `status`, `created_at`, `updated_at`) VALUES
(2, 3, 10, 1, 'cancelled', '2025-05-06 09:39:05', '2025-05-06 10:53:11'),
(3, 3, 10, 1, 'cancelled', '2025-05-06 09:41:25', '2025-05-06 10:56:34'),
(4, 3, 1, 1, 'cancelled', '2025-05-06 09:46:19', '2025-05-06 10:52:58'),
(5, 3, 1, 1, 'cancelled', '2025-05-06 10:56:58', '2025-05-06 10:59:01'),
(6, 3, 4, 1, 'cancelled', '2025-05-06 10:59:48', '2025-05-06 11:16:50'),
(7, 3, 2, 1, 'cancelled', '2025-05-06 11:05:56', '2025-05-06 11:16:48'),
(8, 3, 2, 1, 'cancelled', '2025-05-06 11:06:50', '2025-05-06 11:16:52'),
(9, 3, 1, 1, 'cancelled', '2025-05-06 11:15:59', '2025-05-06 11:16:57'),
(10, 10, 2, 1, 'confirmed', '2025-05-06 11:37:40', '2025-05-06 11:37:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_number` varchar(20) DEFAULT NULL,
  `email_address` varchar(254) NOT NULL,
  `role` varchar(50) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `password`, `full_name`, `address`, `contact_number`, `email_address`, `role`, `created_at`, `updated_at`) VALUES
(1, 'zyozyo_', '$2y$10$uFd3XMWI6FI0zxH6DxjEru6gkyvlPIwxgS5nH3EHfGD6tPqDHC.K2', 'Park Jihyo', 'address b 9', '09123456789', 'zyo@egmail.com', 'seller', '2025-05-04 17:24:23', '2025-05-04 17:39:46'),
(2, 'mina', '$2y$10$fIhXV6y4TdfwtnVZCXEZROmSHHOoGyMnCgSXwL6jNFlgRTuJ/4MUi', 'mina  myoi', 'sdad', '09607898778', 'mina@gmail.com', 'seller', '2025-05-06 03:03:56', '2025-05-06 03:07:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `business_requirements`
--
ALTER TABLE `business_requirements`
  ADD PRIMARY KEY (`business_requiremnt_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`),
  ADD UNIQUE KEY `product_name` (`product_name`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `product_inventory`
--
ALTER TABLE `product_inventory`
  ADD PRIMARY KEY (`stock_id`),
  ADD KEY `product_id` (`product_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `product_purchase`
--
ALTER TABLE `product_purchase`
  ADD PRIMARY KEY (`purchase_id`),
  ADD KEY `stock_id` (`stock_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email_address` (`email_address`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `business_requirements`
--
ALTER TABLE `business_requirements`
  MODIFY `business_requiremnt_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `product_inventory`
--
ALTER TABLE `product_inventory`
  MODIFY `stock_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `product_purchase`
--
ALTER TABLE `product_purchase`
  MODIFY `purchase_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `business_requirements`
--
ALTER TABLE `business_requirements`
  ADD CONSTRAINT `business_requirements_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `product_categories` (`category_id`),
  ADD CONSTRAINT `product_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `product_inventory`
--
ALTER TABLE `product_inventory`
  ADD CONSTRAINT `product_inventory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  ADD CONSTRAINT `product_inventory_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `product_purchase`
--
ALTER TABLE `product_purchase`
  ADD CONSTRAINT `product_purchase_ibfk_1` FOREIGN KEY (`stock_id`) REFERENCES `product_inventory` (`stock_id`),
  ADD CONSTRAINT `product_purchase_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
