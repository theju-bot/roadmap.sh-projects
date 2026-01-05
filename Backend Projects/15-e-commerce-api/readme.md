# 🛒 E-Commerce API

A full-stack e-commerce application built with MongoDB, Express.js, Node.js, and EJS, featuring user authentication, product management, shopping cart functionality, and Stripe payment integration.

## 👨‍💻 Author
**Thesigan Yogarasa**  
MERN Stack Enthusiast & Aspiring Fullstack Developer

Built as part of [roadmap.sh E-Commerce API Project](https://roadmap.sh/projects/ecommerce-api)

### 🤖 AI Assistance & Learning Journey

**Transparency Note:** I want to be completely honest about my development process and the tools I used:

#### What I Built Myself 💪
- **Backend Architecture (80-90% self-coded):** Express.js server setup, routing, middleware, controllers, and MongoDB schemas were primarily written by me
- **Core Technologies I'm Proficient In:**
  - ✅ **Node.js & Express.js** - Comfortable building RESTful APIs and server-side logic
  - ✅ **JavaScript** - Strong grasp of ES6+ features, async/await, promises
  - ✅ **MongoDB & Mongoose** - Database design, schemas, and queries
  - ✅ **HTML, CSS, EJS** - Frontend fundamentals and templating engines
  - ✅ **Authentication & Authorization** - JWT implementation, middleware
  - ✅ **API Design** - RESTful principles and route structuring

#### Where I Used AI Heavily 🤖
- **Frontend Implementation (EJS views, JavaScript, CSS):** I got confused with the frontend logic and styling, and became lazy, relying heavily on AI for:
  - EJS template structure and data rendering
  - Client-side JavaScript and event handling
  - CSS styling and responsive design
  - Form validation and user interactions
  - Integration between frontend views and backend routes

#### Why This Matters to Me 📚
I believe in **radical transparency** about the learning process. While I'm proud of the backend work I've done independently, I recognize that:

- This project is **far from perfect** and represents a learning milestone, not a finished product
- I took shortcuts on the frontend when I should have pushed through the confusion
- Even though I know HTML, CSS, and EJS, I didn't apply myself as much as I should have
- **I'm actively working to strengthen my frontend skills** through dedicated practice
- Using AI was a learning tool, but I need to ensure I truly understand what I'm building

#### My Commitment Going Forward 🎯
- Build more projects with progressively **less AI assistance**
- Practice building complete frontend interfaces from scratch without AI help
- Refactor the frontend code to fully understand every line
- Improve my CSS skills and responsive design capabilities
- Continue strengthening my fullstack capabilities
- Challenge myself to write cleaner, more maintainable code

### 🔧 Areas for Improvement
- **Frontend Discipline:** Building UIs independently without heavy AI reliance
- **Code Quality:** Refactoring for better readability and maintainability
- **CSS Skills:** Writing more elegant and responsive stylesheets
- **Testing:** Adding comprehensive unit and integration tests
- **Error Handling:** Implementing more robust error handling throughout
- **Performance:** Optimizing database queries and page load times
- **Security:** Following security best practices more rigorously
- **Documentation:** Writing clearer inline code comments

*I'm sharing this honestly because I believe the development community benefits from transparency about our learning journeys. Feedback and suggestions are always welcome as I continue improving!*

---

## 🚀 Features

- ✅ User Authentication (JWT-based)
- ✅ Admin & User Role Management
- ✅ Product Management (CRUD operations)
- ✅ Shopping Cart functionality
- ✅ Stripe Payment Integration
- ✅ Order Management
- ✅ Admin Dashboard
- ✅ RESTful API architecture
- ✅ Server-side rendering with EJS

---

## 🛠️ Tech Stack

**Backend (Primarily Self-Coded):**
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Stripe for payments

**Frontend (AI-Assisted):**
- EJS (Embedded JavaScript Templates)
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/) (local or Atlas account)
- [Git](https://git-scm.com/)
- [Stripe Account](https://stripe.com/) (for payment integration)

---

## 📥 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/theju-bot/roadmap.sh-projects.git
```

### 2️⃣ Navigate to the Project Directory
```bash
cd roadmap.sh-projects/Backend\ Projects/15-e-commerce-api
```

### 3️⃣ Install Dependencies
```bash
npm install
```

### 4️⃣ Set Up Environment Variables

Create a `.env` file in the root directory:
```bash
touch .env
```

Add the following environment variables to your `.env` file:
```dotenv
PORT=5000
DATABASE_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_access_token_secret_here
REFRESH_TOKEN_SECRET=your_refresh_token_secret_here
ADMIN_PASSWORD=your_admin_password_here
NODE_ENV=development
STRIPE_SECRET_KEY=your_stripe_secret_key_here
CLIENT_URL=http://localhost:5000
```

#### 🔑 How to Generate Secrets

Run this in Node.js console to generate secure secrets:
```javascript
require('crypto').randomBytes(64).toString('hex')
```

#### 🗄️ MongoDB Setup

**Option 1: Local MongoDB**
```
DATABASE_URI=mongodb://localhost:27017/ecommerce
```

**Option 2: MongoDB Atlas**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Replace `<password>` and `<dbname>` in the connection string
```
DATABASE_URI=mongodb+srv://username:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
```

#### 💳 Stripe Setup

1. Create account at [Stripe](https://stripe.com/)
2. Get your test API keys from Dashboard
3. Add secret key to `.env`:
```
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### 5️⃣ Run the Application

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

---

## 📁 Project Structure
```
15-e-commerce-api/
├── controllers/          # Request handlers (Self-coded)
│   ├── authController.js
│   ├── productController.js
│   ├── cartController.js
│   ├── stripeController.js
│   └── frontEndController.js
├── models/              # MongoDB schemas (Self-coded)
│   ├── User.js
│   ├── Product.js
│   ├── Cart.js
│   └── Order.js
├── routes/              # API routes (Self-coded)
│   ├── auth/
│   │   ├── register.js
│   │   ├── login.js
│   │   └── logout.js
│   ├── api/
│   │   ├── products.js
│   │   └── cart.js
│   ├── users.js
│   └── stripe.js
├── middleware/          # Custom middleware (Self-coded)
│   ├── verifyJWT.js
│   └── verifyAdmin.js
├── config/              # Configuration files
├── public/              # Static files (CSS, JS - AI-assisted)
│   ├── css/
│   └── js/
├── views/               # EJS templates (AI-assisted)
│   ├── login.ejs
│   ├── register.ejs
│   ├── products.ejs
│   ├── cart.ejs
│   └── checkout.ejs
├── .env                 # Environment variables (DO NOT COMMIT)
├── .gitignore          # Git ignore file
├── server.js           # Entry point (Self-coded)
└── package.json        # Dependencies
```

---

## 🔐 API Endpoints

### 🔑 Authentication Routes

#### Register
- **Endpoint:** `POST /auth/register`
- **Access:** Public
- **Description:** Register new user
- **Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login
- **Endpoint:** `POST /auth/login`
- **Access:** Public
- **Description:** Login user and receive JWT tokens
- **Web Route:** `GET /auth/login` - Renders login page (EJS)
- **Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Logout
- **Endpoint:** `GET /auth/logout`
- **Access:** Private (JWT required)
- **Description:** Logout user and clear tokens

#### Register Page
- **Endpoint:** `GET /auth/register`
- **Access:** Public
- **Description:** Renders registration page (EJS)

---

### 👥 User Management Routes

#### Get All Users
- **Endpoint:** `GET /users`
- **Access:** Private (Admin only)
- **Description:** Retrieve all registered users
- **Headers:** 
  - `Authorization: Bearer {accessToken}`

#### Delete User
- **Endpoint:** `DELETE /users/:id`
- **Access:** Private (Admin only)
- **Description:** Delete a specific user by ID
- **Headers:** 
  - `Authorization: Bearer {accessToken}`

---

### 📦 Product Routes

#### Get All Products
- **Endpoint:** `GET /api/products`
- **Access:** Private (JWT required)
- **Description:** Retrieve all products
- **Headers:** 
  - `Authorization: Bearer {accessToken}`

#### Get Product by ID
- **Endpoint:** `GET /api/products/:id`
- **Access:** Private (JWT required)
- **Description:** Retrieve a specific product
- **Headers:** 
  - `Authorization: Bearer {accessToken}`

#### Create Product
- **Endpoint:** `POST /api/products`
- **Access:** Private (Admin only)
- **Description:** Create a new product
- **Headers:** 
  - `Authorization: Bearer {accessToken}`
- **Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 29.99,
  "category": "Electronics",
  "stock": 100,
  "image": "image_url"
}
```

#### Update Product
- **Endpoint:** `PUT /api/products/:id`
- **Access:** Private (Admin only)
- **Description:** Update an existing product
- **Headers:** 
  - `Authorization: Bearer {accessToken}`
- **Request Body:**
```json
{
  "name": "Updated Product Name",
  "price": 39.99,
  "stock": 150
}
```

#### Delete Product
- **Endpoint:** `DELETE /api/products/:id`
- **Access:** Private (Admin only)
- **Description:** Delete a product
- **Headers:** 
  - `Authorization: Bearer {accessToken}`

---

### 🛒 Cart Routes

#### Get User Cart
- **Endpoint:** `GET /api/cart`
- **Access:** Private (JWT required)
- **Description:** Retrieve current user's cart
- **Headers:** 
  - `Authorization: Bearer {accessToken}`

#### Add Product to Cart
- **Endpoint:** `POST /api/cart`
- **Access:** Private (JWT required)
- **Description:** Add a product to cart
- **Headers:** 
  - `Authorization: Bearer {accessToken}`
- **Request Body:**
```json
{
  "productId": "product_id_here",
  "quantity": 2
}
```

#### Remove Product from Cart
- **Endpoint:** `DELETE /api/cart`
- **Access:** Private (JWT required)
- **Description:** Remove a product from cart
- **Headers:** 
  - `Authorization: Bearer {accessToken}`
- **Request Body:**
```json
{
  "productId": "product_id_here"
}
```

---

### 💳 Stripe Payment Routes

#### Create Checkout Session
- **Endpoint:** `POST /stripe/checkout`
- **Access:** Private (JWT required)
- **Description:** Create Stripe checkout session and empty cart
- **Headers:** 
  - `Authorization: Bearer {accessToken}`
- **Request Body:**
```json
{
  "items": [
    {
      "name": "Product Name",
      "price": 29.99,
      "quantity": 2
    }
  ]
}
```
- **Response:**
```json
{
  "success": true,
  "url": "https://checkout.stripe.com/...",
  "alert": "Redirecting to secure checkout..."
}
```

#### Payment Success
- **Endpoint:** `GET /stripe/success?session_id={CHECKOUT_SESSION_ID}`
- **Access:** Public
- **Description:** Handle successful payment
- **Response:**
```json
{
  "success": true,
  "alert": "Payment successful! Your order has been confirmed.",
  "sessionId": "session_id_here"
}
```

#### Payment Cancel
- **Endpoint:** `GET /stripe/cancel`
- **Access:** Public
- **Description:** Handle cancelled payment
- **Response:**
```json
{
  "success": false,
  "alert": "Payment was cancelled. Your cart has been cleared."
}
```

---

## 🧪 Testing the API

### Using cURL

**Register a User:**
```bash
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

**Get Products (with JWT):**
```bash
curl -X GET http://localhost:5000/api/products \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Using Postman

1. Import the collection (if provided)
2. Set environment variable for `accessToken`
3. Test each endpoint sequentially

### Test Stripe Payments

Use Stripe test card numbers:
- **Success:** `4242 4242 4242 4242`
- **Declined:** `4000 0000 0000 0002`
- Use any future date for expiry
- Use any 3-digit CVC

---

## ⚠️ Important Security Notes

### 🚨 NEVER commit your `.env` file to version control!

**Always ensure `.env` is in your `.gitignore`:**
```gitignore
# Environment variables
.env
.env.local
.env.production

# Dependencies
node_modules/

# Logs
logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db
```

### 🔒 Security Best Practices

1. **Keep secrets secret** - Never share or commit API keys
2. **Use strong passwords** - Generate complex passwords for admin accounts
3. **Rotate secrets regularly** - Change tokens and keys periodically
4. **Use HTTPS in production** - Never send credentials over HTTP
5. **Validate all inputs** - Sanitize user inputs to prevent injection attacks
6. **Keep dependencies updated** - Run `npm audit fix` regularly

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 5000 (Mac/Linux)
lsof -ti:5000 | xargs kill -9
```

### MongoDB Connection Issues
- Ensure MongoDB is running locally, or
- Check MongoDB Atlas connection string
- Verify network access in Atlas (whitelist your IP)

### Stripe Payment Failures
- Verify `STRIPE_SECRET_KEY` is correct
- Ensure you're using test mode keys for development
- Check Stripe dashboard for webhook events

### JWT Authentication Issues
- Ensure `ACCESS_TOKEN_SECRET` is set correctly
- Check token expiration time
- Verify token is being sent in Authorization header

### EJS Template Errors
- Check that all views are in the `/views` directory
- Verify EJS syntax (proper opening/closing tags)
- Ensure data is being passed correctly from controllers

---

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `DATABASE_URI` | MongoDB connection string | `mongodb://localhost:27017/ecommerce` |
| `ACCESS_TOKEN_SECRET` | JWT access token secret | Generated 64-char hex |
| `REFRESH_TOKEN_SECRET` | JWT refresh token secret | Generated 64-char hex |
| `ADMIN_PASSWORD` | Admin account password | Strong password |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `STRIPE_SECRET_KEY` | Stripe API secret key | `sk_test_...` |
| `CLIENT_URL` | Frontend URL | `http://localhost:5000` |

---

## 🤝 Contributing

This is a learning project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📞 Contact

**Thesigan Yogarasa**
- Email: [thesigany@gmail.com](mailto:thesigany@gmail.com)
- GitHub: [@theju-bot](https://github.com/theju-bot)
- Project Link: [https://github.com/theju-bot/roadmap.sh-projects](https://github.com/theju-bot/roadmap.sh-projects)

---

## 🙏 Acknowledgments

- [roadmap.sh](https://roadmap.sh) for the project idea
- Stripe documentation and examples
- MongoDB University courses
- The Node.js and Express.js communities
- EJS documentation
- AI tools that assisted in learning and development (primarily for frontend)

---

## 📚 Learning Resources

Resources that helped me build this project:

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/)
- [EJS Documentation](https://ejs.co/)
- [Stripe API Documentation](https://stripe.com/docs/api)
- [JWT Introduction](https://jwt.io/introduction)
- [roadmap.sh Backend Path](https://roadmap.sh/backend)

---

**⭐ If this project helped you learn, please consider giving it a star!**

**💬 Honest feedback appreciated** - especially on code quality and areas where I can improve!