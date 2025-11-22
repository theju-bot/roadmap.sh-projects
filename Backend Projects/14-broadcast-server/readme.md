# Broadcast Server

This project is a simple WebSocket-based broadcast server built using Node.js and the **ws** library. It allows multiple clients to connect, send messages, and receive all messages broadcasted across the server.

This project is implemented as part of the [roadmap.sh Broadcast Server](https://roadmap.sh/projects/broadcast-server).

---

## 🚀 Features

* Real-time messaging between multiple connected clients
* Join and leave notifications for all users
* Heartbeat mechanism to detect dead connections
* Lightweight client implemented using Node.js and `readline`
* JSON-based messaging protocol

---

## 📁 Project Structure

```
.
├── client.js 
├── package-lock.json
├── package.json 
├── server.js 
└── README.md 
```

---

## 📦 Requirements

Ensure you have the following installed:

* **Node.js (v14 or above)**
* **npm**

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/theju-bot/roadmap.sh-projects.git
cd "Backend Projects"
cd 14-broadcast-server
```

### 2️⃣ Install dependencies

```bash
npm install
```

---

## 🖥️ Running the Server

Start the WebSocket server:

```bash
node server.js
```

The server will run at:

```
ws://localhost:8000
```

---

## 👤 Running the Client

Open a new terminal for each client and run:

```
node client.js <yourName>
```

Example:

```
node client.js Thesigan
```

If no name is provided, the client defaults to **Anonymous**.

---

## 💬 Message Types

### 1. **Join Message**

Sent automatically when a client connects:

```json
{
  "type": "join",
  "from": "Username"
}
```

### 2. **Chat Message**

Sent when user types text:

```json
{
  "type": "message",
  "text": "Hello there!",
  "from": "Username"
}
```

### 3. **System Message**

Broadcast when a user leaves:

```json
{
  "type": "system",
  "text": "User left the chat",
  "from": "system"
}
```

---

## 🔒 Connection Health (Heartbeat)

The server uses a simple ping-pong mechanism to:

* Detect inactive or crashed clients
* Maintain clean and stable WebSocket connections

Every 30 seconds, the server:

* Sends `ping`
* Terminates unresponsive connections

---

## 📜 Author

**Thesigan Yogarasa**  
*"MERN Stack Enthusiast & Aspiring Fullstack Developer"*

---