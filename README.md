
# Insurance Policy Management System - Backend

This repository contains the Backend (BE) of the Insurance Policy Management System. The backend handles user authentication, quote generation, policy purchase, and claims management.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Running the Backend](#running-the-backend)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Security Considerations](#security-considerations)
- [Testing](#testing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Authentication**: Secure registration and login using JWT.
- **Quote Generation**: Generate insurance quotes based on user input.
- **Policy Purchase**: Purchase insurance policies based on generated quotes.
- **Claims Management**: File and manage claims associated with policies.
- **Validation and Error Handling**: Robust input validation and comprehensive error messages.

## Prerequisites

- **Node.js**: Version 14.x or later
- **npm**: Version 6.x or later
- **PostgreSQL**: Version 10.x or later
- **Git**: For cloning the repository

## Installation

Clone the Repository:

```bash
git clone https://github.com/saimanish1/insurance-BE.git
cd insurance-backend
```

Install Dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```plaintext
# Server Configuration
PORT=3000

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600s
```

## Database Setup

Ensure PostgreSQL is running and create a new database:

```bash
createdb your_db_name
```

Run Migrations (if using TypeORM migrations):

```bash
npm run typeorm migration:run
```

## Running the Backend

**Development Mode:**

```bash
npm run start:dev
```

**Production Mode:**

```bash
npm run build
npm run start:prod
```

## API Documentation

The API endpoints are documented using Swagger. Access the API documentation at:

```bash
http://localhost:3000/api
```

## Project Structure

```plaintext
src/
├── auth/                # Authentication module
├── user/                # User module
├── policy/              # Policy module
├── dto/                 # Data Transfer Objects
├── embeddables/         # Embedded entities for complex fields
├── claim/               # Claim module
├── main.ts              # Entry point
└── test/                # Test files
ormconfig.ts             # TypeORM configuration
package.json             # Dependencies and scripts
```

## Security Considerations

- **Password Hashing**: User passwords are hashed with bcrypt.
- **JWT Authentication**: Secure token-based authentication.
- **Input Validation**: Validation using `class-validator`.
- **Error Handling**: Detailed error messages.
- **Environment Variables**: Sensitive data stored securely in `.env`.

## Testing

Run unit tests:

```bash
npm run test
```




