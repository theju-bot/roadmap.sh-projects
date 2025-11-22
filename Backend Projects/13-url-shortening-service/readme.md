
---

# 📘 URL Shortening Service

A simple and efficient URL Shortening API built using **Node.js**, **Express**, and **MongoDB**.
This project is implemented as part of the [roadmap.sh URL Shortening Service](https://roadmap.sh/projects/url-shortening-service).

---

## 🚀 Features

* Shorten any valid URL
* Retrieve full/original URL
* Update existing shortened URLs
* Delete shortened URLs
* Track URL statistics (access count, createdAt, updatedAt)
* Auto-incrementing numeric ID using **mongoose-sequence**
* Custom shortCode generated automatically
* Organized MVC folder structure
* Includes request logging and centralized error handling

---

## 📁 Project Structure

```
├── config/
│   └── dbConn.js
├── controllers/
│   └── urlShorternerController.js
├── middleware/
│   ├── logEvents.js
│   └── errorHandler.js
├── model/
│   └── URL.js
├── routes/
│   └── api/
│       └── shorten.js
├── server.js
├── package.json
└── README.md
```

---

## 🛠️ Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **dotenv**
* **mongoose-sequence** (auto-increment plugin)

---

 ##⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/theju-bot/roadmap.sh-projects.git
cd "Backend Projects"
cd 13-url-shortening-service
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create `.env` file in the root

```env
PORT=5000
DATABASE_URI=mongodb://127.0.0.1:27017/urlShortenerDB
```

### 4️⃣ Start the server

```bash
npm start
```

Server runs at:

```
http://localhost:5000
```

---

## 📌 API Endpoints

### ➤ **Create a Short URL**

**POST** `/shorten`

**Body:**

```json
{
  "url": "https://example.com"
}
```

**Response:**

```json
{
  "id": 1,
  "url": "https://example.com",
  "shortCode": "lqe8ajg0df",
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

### ➤ **Get Full URL**

**GET** `/shorten/:shortCode`

Returns the original URL & increments `accessCount`.

---

### ➤ **Update a URL**

**PUT** `/shorten/:shortCode`

**Body:**

```json
{
  "url": "https://new-url.com"
}
```

---

### ➤ **Delete a URL**

**DELETE** `/shorten/:shortCode`

---

### ➤ **View URL Stats**

**GET** `/shorten/:shortCode/stats`

**Response:**

```json
{
  "id": 1,
  "url": "https://example.com",
  "shortCode": "lqe8ajg0df",
  "accessCount": 12,
  "createdAt": "...",
  "updatedAt": "..."
}
```

---

## 🧩 How It Works

### ⭐ Short Code Generation

Short codes are created by combining:

```js
Date.now().toString(36) + Math.random().toString(36).substring(2)
```

This ensures high uniqueness without external libraries.

### ⭐ Auto-Incrementing ID

Using:

```js
mongoose-sequence
```

for incremental numeric IDs stored in `id` field.

### ⭐ Access Count

* Incremented automatically on:

  * GET `/shorten/:shortCode`
  * GET `/shorten/:shortCode/stats`

---

## 🧑‍💻 Author

**Thesigan Yogarasa**\
MERN Stack Enthusiast & Aspiring Fullstack Developer

---
