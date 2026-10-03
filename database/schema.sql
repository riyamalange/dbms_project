-- ============================================================
-- UNIFIED PAYMENT GATEWAY MANAGEMENT SYSTEM
-- Complete Database Schema
--
-- Roles:
--   USER
--   MERCHANT
--   ADMIN
--
-- Application:
--   Food Delivery + Ride Applications
--
-- Database:
--   UnifiedPaymentGateway
-- ============================================================


-- ============================================================
-- 1. DATABASE
-- ============================================================

CREATE DATABASE IF NOT EXISTS UnifiedPaymentGateway;

USE UnifiedPaymentGateway;


-- ============================================================
-- 2. DROP EXISTING TABLES
-- ============================================================
-- Drop child tables first because of foreign keys.

DROP TABLE IF EXISTS system_logs;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS refunds;
DROP TABLE IF EXISTS settlements;
DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS payment_methods;
DROP TABLE IF EXISTS payment_gateways;
DROP TABLE IF EXISTS merchants;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS users;


-- ============================================================
-- 3. USERS
-- ============================================================
-- Central login table for all three roles.
--
-- USER      -> User Dashboard
-- MERCHANT  -> Merchant Dashboard
-- ADMIN     -> Admin Dashboard
-- ============================================================

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    password_hash VARCHAR(255) NOT NULL,

    role ENUM(
        'USER',
        'MERCHANT',
        'ADMIN'
    ) NOT NULL DEFAULT 'USER',

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- ============================================================
-- 4. CUSTOMERS
-- ============================================================
-- Stores customer-specific information.
-- Login is handled through users table.
-- ============================================================

CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    phone VARCHAR(20),

    password_hash VARCHAR(255) NOT NULL,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 5. MERCHANTS
-- ============================================================
-- A merchant can be:
--   RESTAURANT
--   DRIVER
--   OTHER
--
-- user_id connects the merchant to its login account.
-- ============================================================

CREATE TABLE merchants (
    merchant_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNIQUE NULL,

    name VARCHAR(150) NOT NULL,

    merchant_type ENUM(
        'RESTAURANT',
        'DRIVER',
        'OTHER'
    ) NOT NULL,

    phone VARCHAR(20),

    email VARCHAR(150),

    address VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
);


-- ============================================================
-- 6. PAYMENT GATEWAYS
-- ============================================================
-- Demo gateways for the project.
--
-- Examples:
--   Razorpay Demo
--   PayU Demo
--   Stripe Demo
-- ============================================================

CREATE TABLE payment_gateways (
    gateway_id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) UNIQUE NOT NULL,

    code VARCHAR(50) UNIQUE,

    status ENUM(
        'ACTIVE',
        'INACTIVE'
    ) DEFAULT 'ACTIVE',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 7. PAYMENT METHODS
-- ============================================================
-- Payment methods belonging to customers.
--
-- Supported:
--   UPI
--   CARD
--   NET_BANKING
--   WALLET
--   CASH
-- ============================================================

CREATE TABLE payment_methods (
    payment_method_id INT AUTO_INCREMENT PRIMARY KEY,

    customer_id INT NOT NULL,

    method_type ENUM(
        'UPI',
        'CARD',
        'NET_BANKING',
        'WALLET',
        'CASH'
    ) NOT NULL,

    display_name VARCHAR(100),

    last_four VARCHAR(4),

    gateway_id INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE CASCADE,

    FOREIGN KEY (gateway_id)
        REFERENCES payment_gateways(gateway_id)
        ON DELETE SET NULL
);


-- ============================================================
-- 8. ORDERS
-- ============================================================
-- Supports both:
--
-- FOOD -> food delivery order
-- RIDE -> ride booking
--
-- Customer creates order.
-- Merchant/driver receives order.
-- ============================================================

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,

    customer_id INT NOT NULL,

    merchant_id INT NOT NULL,

    order_type ENUM(
        'FOOD',
        'RIDE'
    ) NOT NULL,

    description VARCHAR(255),

    amount DECIMAL(12,2) NOT NULL,

    status ENUM(
        'PENDING',
        'PAID',
        'PAYMENT_FAILED',
        'REFUNDED',
        'CANCELLED'
    ) DEFAULT 'PENDING',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE CASCADE,

    FOREIGN KEY (merchant_id)
        REFERENCES merchants(merchant_id)
        ON DELETE RESTRICT
);


-- ============================================================
-- 9. TRANSACTIONS
-- ============================================================
-- Every payment is recorded here.
--
-- One order can have one transaction in this project.
-- ============================================================

CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT UNIQUE NOT NULL,

    customer_id INT NOT NULL,

    gateway_id INT NOT NULL,

    payment_method_id INT,

    amount DECIMAL(12,2) NOT NULL,

    status ENUM(
        'SUCCESS',
        'FAILED',
        'PENDING'
    ) NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
        ON DELETE CASCADE,

    FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE CASCADE,

    FOREIGN KEY (gateway_id)
        REFERENCES payment_gateways(gateway_id)
        ON DELETE RESTRICT,

    FOREIGN KEY (payment_method_id)
        REFERENCES payment_methods(payment_method_id)
        ON DELETE SET NULL
);


-- ============================================================
-- 10. REFUNDS
-- ============================================================
-- Customers can request refunds for transactions.
-- Admin can process the refund.
-- ============================================================

CREATE TABLE refunds (
    refund_id INT AUTO_INCREMENT PRIMARY KEY,

    transaction_id INT NOT NULL,

    customer_id INT NOT NULL,

    amount DECIMAL(12,2) NOT NULL,

    status ENUM(
        'REQUESTED',
        'PROCESSED',
        'FAILED'
    ) DEFAULT 'REQUESTED',

    reason VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (transaction_id)
        REFERENCES transactions(transaction_id)
        ON DELETE CASCADE,

    FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE CASCADE
);


-- ============================================================
-- 11. SETTLEMENTS
-- ============================================================
-- Merchant settlement information.
--
-- gross_amount      = customer payment
-- commission_amount = platform commission
-- net_amount        = merchant receives
-- ============================================================

CREATE TABLE settlements (
    settlement_id INT AUTO_INCREMENT PRIMARY KEY,

    order_id INT UNIQUE NOT NULL,

    merchant_id INT NOT NULL,

    gross_amount DECIMAL(12,2) NOT NULL,

    commission_amount DECIMAL(12,2) NOT NULL,

    net_amount DECIMAL(12,2) NOT NULL,

    status ENUM(
        'PENDING',
        'PAID',
        'ADJUSTED'
    ) DEFAULT 'PENDING',

    settled_at DATETIME NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
        ON DELETE CASCADE,

    FOREIGN KEY (merchant_id)
        REFERENCES merchants(merchant_id)
        ON DELETE RESTRICT
);


-- ============================================================
-- 12. NOTIFICATIONS
-- ============================================================
-- Used by:
--   USER dashboard
--   MERCHANT dashboard
--
-- Examples:
--   Payment successful
--   Order created
--   Refund processed
--   Settlement completed
-- ============================================================

CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    title VARCHAR(150) NOT NULL,

    message VARCHAR(500) NOT NULL,

    is_read BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE CASCADE
);


-- ============================================================
-- 13. SYSTEM LOGS
-- ============================================================
-- Used by ADMIN dashboard.
--
-- Records important system actions.
-- ============================================================

CREATE TABLE system_logs (
    log_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NULL,

    action VARCHAR(150) NOT NULL,

    description VARCHAR(500),

    ip_address VARCHAR(45),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(user_id)
        ON DELETE SET NULL
);


-- ============================================================
-- 14. INDEXES
-- ============================================================
-- Improve commonly used queries.

CREATE INDEX idx_users_role
ON users(role);

CREATE INDEX idx_customers_email
ON customers(email);

CREATE INDEX idx_merchants_type
ON merchants(merchant_type);

CREATE INDEX idx_orders_customer
ON orders(customer_id);

CREATE INDEX idx_orders_merchant
ON orders(merchant_id);

CREATE INDEX idx_orders_status
ON orders(status);

CREATE INDEX idx_orders_type
ON orders(order_type);

CREATE INDEX idx_transactions_customer
ON transactions(customer_id);

CREATE INDEX idx_transactions_status
ON transactions(status);

CREATE INDEX idx_refunds_customer
ON refunds(customer_id);

CREATE INDEX idx_refunds_status
ON refunds(status);

CREATE INDEX idx_settlements_merchant
ON settlements(merchant_id);

CREATE INDEX idx_settlements_status
ON settlements(status);

CREATE INDEX idx_notifications_user
ON notifications(user_id);

CREATE INDEX idx_notifications_read
ON notifications(is_read);

CREATE INDEX idx_logs_user
ON system_logs(user_id);

CREATE INDEX idx_logs_created
ON system_logs(created_at);


-- ============================================================
-- 15. DEMO PAYMENT GATEWAYS
-- ============================================================

INSERT INTO payment_gateways
(name, code, status)
VALUES
('Razorpay Demo', 'RAZORPAY', 'ACTIVE'),
('PayU Demo', 'PAYU', 'ACTIVE'),
('Stripe Demo', 'STRIPE', 'ACTIVE');


-- ============================================================
-- 16. DEMO MERCHANTS
-- ============================================================
-- These are available for demonstration.
-- Their login accounts are created by Flask's initialization
-- code rather than storing passwords in this SQL file.
-- ============================================================

INSERT INTO merchants
(name, merchant_type, phone, email, address)
VALUES
(
    'Food Hub',
    'RESTAURANT',
    '9000000001',
    'foodhub@example.com',
    'Pune'
),
(
    'Spice Kitchen',
    'RESTAURANT',
    '9000000002',
    'spice@example.com',
    'Pune'
),
(
    'Demo Driver Rahul',
    'DRIVER',
    '9000000003',
    'rahul@example.com',
    'Pune'
);


-- ============================================================
-- 17. VERIFY DATABASE
-- ============================================================

SHOW TABLES;


-- ============================================================
-- 18. VERIFY GATEWAYS
-- ============================================================

SELECT *
FROM payment_gateways;


-- ============================================================
-- 19. VERIFY MERCHANTS
-- ============================================================

SELECT *
FROM merchants;


-- ============================================================
-- END OF SCHEMA
-- ============================================================