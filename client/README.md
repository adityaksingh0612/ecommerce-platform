# 🛒 E-Commerce Platform

A full-stack MERN e-commerce application built with modern web technologies. The platform provides a seamless shopping experience with secure authentication, product management, shopping cart, online payments, and an admin dashboard.

## 🚀 Features

### User Features

* User registration and login using JWT Authentication
* Secure protected routes
* Browse products
* Product search
* Product details page
* Shopping cart management
* Update item quantity
* Remove items from cart
* Secure checkout
* Razorpay payment integration
* Order history
* Order details
* Responsive user interface
* Loading and empty states

### Admin Features

* Role-based authorization
* Product CRUD operations
* Product image upload using Cloudinary
* Stock management
* Admin dashboard

---

## 🛠 Tech Stack

### Frontend

* React 19
* Redux Toolkit
* React Router
* Axios
* Tailwind CSS
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* Bcrypt

### Third-Party Services

* MongoDB Atlas
* Cloudinary
* Razorpay

---

## 📂 Project Structure

```text
ecommerce-platform/
├── client/
│   ├── src/
│   ├── public/
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/adityaksingh0612/ecommerce-platform.git
cd ecommerce-platform
```

### Backend Setup

```bash
cd server
npm install
npm run dev
```

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

## 🔐 Environment Variables

### Server (.env)

```env
PORT=8000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Client (.env)

```env
VITE_API_URL=your_backend_url
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

---

## 📸 Screenshots

> Add screenshots after deployment.

Suggested screenshots:

* Home Page
* Product Details
* Shopping Cart
* Checkout
* My Orders
* Order Details
* Admin Dashboard

---

## ✨ Highlights

* JWT-based authentication and authorization
* Secure password hashing with Bcrypt
* RESTful API architecture
* Cloudinary image storage
* Razorpay payment gateway integration
* Redux Toolkit state management
* Responsive modern UI
* Protected routes
* Stock management
* Production-ready frontend build

---

## 🔮 Future Improvements

* Wishlist
* Product reviews and ratings
* Email notifications
* Coupon system
* Order tracking
* User profile management

---

## 🤝 Contributing

Contributions are welcome. Feel free to fork the repository and submit a pull request.

---

## 👨‍💻 Author

**Aditya Singh**

GitHub: https://github.com/adityaksingh0612

---

## 📄 License

This project is developed for educational and portfolio purposes.
