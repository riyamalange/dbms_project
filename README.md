# Unified Payment Gateway Management System

A database-driven web application developed as a DBMS group project to demonstrate the management of customers, merchants, payment methods, payment gateways, transactions, and refunds through a unified payment platform.

## 📌 Project Overview

The Unified Payment Gateway Management System provides a centralized platform for managing payment-related operations.

The system allows users to:

- Register and log in
- Manage payment methods
- View available merchants and payment gateways
- Make demo payments
- View transaction history
- Process refunds
- View payment and transaction statistics

This project demonstrates the practical implementation of database concepts such as relational tables, primary keys, foreign keys, constraints, relationships, SQL queries, and transaction management.

> **Note:** This is an academic/demo project. It does not process real payments or store real card, CVV, UPI PIN, or banking credentials.

---

## 🎯 Objectives

The main objectives of this project are:

1. To design a relational database for payment gateway management.
2. To manage customer, merchant, payment gateway, and transaction information.
3. To demonstrate relationships between multiple database entities.
4. To implement CRUD operations using a web application.
5. To provide transaction and refund management.
6. To demonstrate database constraints and data integrity.
7. To provide a simple and user-friendly payment management interface.

---

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Python
- Flask
- Flask-CORS

### Database
- MySQL

### Database Connectivity
- MySQL Connector/Python

### Development Tools
- Visual Studio Code
- Git
- GitHub

---

## 🏗️ System Architecture

```text
              ┌─────────────────────┐
              │      Frontend       │
              │   HTML / CSS / JS   │
              └──────────┬──────────┘
                         │
                         │ HTTP Requests
                         ▼
              ┌─────────────────────┐
              │       Flask         │
              │      Backend        │
              └──────────┬──────────┘
                         │
                         │ SQL Queries
                         ▼
              ┌─────────────────────┐
              │       MySQL         │
              │      Database       │
              └─────────────────────┘
