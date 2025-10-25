# 💰 Expense Tracker API (ETAPI)

A secure **RESTful API** built with **Node.js, Express, MongoDB, and Mongoose** to manage user authentication and personal expenses.  
This project is built as part of the [roadmap.sh Expense Tracker API Project](https://roadmap.sh/projects/expense-tracker-api).

---

## 🚀 Features

### 🔐 Authentication
- Register and log in users securely.  
- Passwords are hashed using **bcrypt** before saving to the database.  
- JWT-based authentication with token expiration and verification middleware.  
- Access tokens are required for all expense routes.

### 💸 Expense Management
- Create, read, update, and delete expense entries per user.  
- Each expense includes:
  - `title`, `description`, `amount`, `category`, and `date`.  
- Expense categories (validated via Mongoose enum):
  - `Groceries`, `Leisure`, `Electronics`, `Utilities`, `Clothing`, `Health`, `Others`
- Filter expenses by time period:
  - `past_week`, `past_month`, `last_3_months`, or `custom` (`startDate` & `endDate`)
- Paginated listing using `page` and `limit` query parameters.

---

## 🧠 Technologies Used

- **Node.js** – JavaScript runtime  
- **Express.js** – Backend framework  
- **MongoDB** – NoSQL database  
- **Mongoose** – ODM for MongoDB  
- **JWT (jsonwebtoken)** – Token-based authentication  
- **bcrypt** – Secure password hashing  
- **dotenv** – Environment configuration  
- **dayjs** – Date handling and formatting  

---

## ⚙️ Project Structure
.\
├── config/\
│ └── dbConn.js\
├── controllers/\
│ ├── authController.js\
│ └── expenseController.js\
├── middleware/\
│ ├── verifyJWT.js\
│ ├── errorHandler.js\
│ └── logEvents.js\
├── model/\
│ ├── UserETAPI.js\
│ └── ExpenseETAPI.js\
├── routes/\
│ ├── register.js\
│ ├── login.js\
│ └── api/\
│ └── expense.js\
├── server.js\
└── .env\


---

## 🔧 Environment Variables
```bash
Create a `.env` file in the project root and include:

PORT=5000
DATABASE_URI=mongodb+srv://<your-cluster>/<db-name>
ACCESSS_TOKEN_SECRET=<your-secret-key>
```

---

## 🧩 API Endpoints

### 🧍‍♂️ Auth Routes

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `POST` | `/register` | Register a new user |
| `GET` | `/login` | Log in existing user |

---

### 💰 Expense Routes (Protected)

All expense routes require a **valid JWT token** in the `Authorization` header:  
`Authorization: Bearer <token>`

| Method | Endpoint | Description |
|--------|-----------|-------------|
| `GET` | `/expense` | List user expenses (supports pagination & filters) |
| `POST` | `/expense` | Add a new expense |
| `PUT` | `/expense/:id` | Update an existing expense |
| `DELETE` | `/expense/:id` | Delete an expense |

---

## 🧭 Query Parameters (for GET /expense)

| Parameter | Example | Description |
|------------|----------|-------------|
| `page` | `?page=2` | Page number |
| `limit` | `?limit=10` | Number of records per page |
| `filter` | `?filter=past_week` | Filter by date (`past_week`, `past_month`, `last_3_months`, `custom`) |
| `startDate` | `?startDate=2025-01-01` | Used with `filter=custom` |
| `endDate` | `?endDate=2025-03-01` | Used with `filter=custom` |

---

## 🧪 Example API Usage

### Register User
```bash
POST /register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "mypassword"
}
```

### Login User
```bash
GET /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "mypassword"
}
```

### Add Expense
```bash
POST /expense
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Netflix Subscription",
  "description": "Monthly payment",
  "amount": 1200,
  "category": "Leisure"
}
```

### Get Expenses (Past Month)
```bash
GET /expense?filter=past_month&page=1&limit=5
Authorization: Bearer <token>
```

## 🧰 Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/<your-username>/expense-tracker-api.git
cd expense-tracker-api
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Add environment variables
```bash
Create a .env file (see section above).
```

### 4️⃣ Run the server
```bash
npm run dev
```

```bash
Server will be running at:
👉 http://localhost:5000
```

### 🛠️ Error Handling

- Returns descriptive error messages for validation and authentication failures.  
- Invalid JWT tokens return **401 Unauthorized**.  
- Invalid category values trigger **400 Bad Request**.


### 📄 License

- This project is open-source and available under the MIT License

### 👨‍💻 Author

Thesigan Yogarasa\
Aspiring Fullstack Developer — React, Node.js, Express & MongoDB
Built as part of [roadmap.sh backend projects](https://roadmap.sh/projects/expense-tracker-api)