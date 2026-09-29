# Unified Payment Gateway Management System

A DBMS-based web application for managing payments, orders, merchants, transactions, refunds, and settlements through a unified payment gateway system.

## Project Overview

The Unified Payment Gateway Management System provides a centralized platform for managing payment operations for food delivery and ride applications.

The system is designed around common payment operations such as:

- Customer management
- Merchant management
- Food delivery orders
- Ride orders
- Payment methods
- Payment gateways
- Payment transactions
- Refunds
- Merchant settlements

The project uses a Flask backend, MySQL database, and HTML/CSS/JavaScript frontend.

---

## Features

### Dashboard

The dashboard provides an overview of:

- Total revenue
- Successful payments
- Total orders
- Active merchants
- Recent transactions
- Quick payment operations

### Payment Management

The system supports demonstration of different payment methods:

- UPI
- Credit/Debit Card
- Net Banking
- Wallet
- Cash

### Payment Gateways

The system models multiple payment gateways, such as:

- Razorpay
- Stripe
- PayU

### Order Management

The system supports two major order types:

- FOOD - Food delivery orders
- RIDE - Ride service orders

### Merchant Management

Merchants can represent:

- Restaurants
- Drivers
- Food delivery businesses
- Ride service providers

### Transaction Management

The transaction module stores and displays:

- Transaction ID
- Customer
- Payment method
- Payment gateway
- Amount
- Transaction status

### Refund Management

Refund records contain:

- Refund ID
- Transaction ID
- Refund reason
- Refund amount
- Refund status

### Settlement Management

Merchant settlements contain:

- Settlement ID
- Merchant
- Settlement amount
- Settlement date
- Settlement status

---

## Technology Stack

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

### Development Tools

- Visual Studio Code
- MySQL Workbench
- Git
- GitHub

---

## Project Structure

```text
unified-payment-gateway/
│
├── backend/
│   ├── app.py
│   ├── config.py
│   ├── database.py
│   └── requirements.txt
│
├── database/
│   └── schema.sql
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── .gitignore
└── README.md