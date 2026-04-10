# 🛒 Ecommerce MERN Stack Application

## 📌 Project Overview

This is a full-stack ecommerce web application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). The application allows users to browse products, add items to cart, and place orders with a secure authentication system.

---

## 🚀 Features

### 👤 User Features

- User Registration & Login
- Email OTP Verification during signup (secure authentication)
- Welcome Email sent after successful registration
- View Products
- Product Details Page
- Add to Cart
- Checkout System

### 🛠️ Backend Features

- RESTful API development using Express.js
- Secure user authentication flow
- Email service integration using Nodemailer
- OTP generation and verification system
- Database integration with MongoDB

---

## 🔐 Authentication Flow

1. User enters email during signup
2. OTP is generated and sent to user's email
3. User verifies OTP
4. Account is created securely
5. Welcome email is sent automatically

👉 This ensures secure and verified user registration.

---

## 🧑‍💻 Tech Stack

### Frontend:

- React.js
- Vite
- CSS / Bootstrap

### Backend:

- Node.js
- Express.js

### Database:

- MongoDB

---

## 📁 Project Structure

```
ecommerce-mern/
├── frontend/
├── backend/
├── .gitignore
├── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository

```
git clone https://github.com/Gowri-jinka/ecommerce-mern.git
```

### 2. Install dependencies

#### Frontend:

```
cd frontend
npm install
npm run dev
```

#### Backend:

```
cd backend
npm install
npm run dev
```

---

## 🌐 Usage

- Frontend runs on → http://localhost:3000
- Backend runs on → http://localhost:5000

---

## 📌 Future Improvements

- Payment Gateway Integration
- Admin Dashboard
- Order Tracking
- Wishlist Feature

---

## 👩‍💻 Author

**Gowri Jinka**

---

## ⭐ Acknowledgement

This project was built as part of learning full-stack web development.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
