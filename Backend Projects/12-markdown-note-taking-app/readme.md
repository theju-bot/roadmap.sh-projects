# 📘 Markdown Note-Taking App (Node.js + Express)

A simple RESTful note-taking application that allows users to **upload Markdown files**, **check grammar**, **convert Markdown to HTML**, **save notes**, and **view rendered notes**.  
This project is built as part of the [roadmap.sh Markdown Note-taking App](https://roadmap.sh/projects/markdown-note-taking-app).

---

## 🚀 Features

### ✅ 1. Upload Markdown Notes
- Upload `.md` files using `multipart/form-data`
- Files are stored in `/uploads`
- Metadata saved in `model/Files.json`

### ✅ 2. Grammar Checking
- Grammar is automatically checked using **LanguageTool API**
- Grammar issues include:
  - message  
  - offset  
  - length  
  - replacement suggestions  
  - rule ID

Endpoint also allows querying grammar issues later:

```
GET /notes/checkGrammer
GET /notes/checkGrammer?id=1
```

### ✅ 3. Markdown → HTML Rendering
- Markdown content is converted using the **marked** library
- HTML is stored in the JSON record
- You can view a note in browser:

```
GET /notes/:id
```

### ✅ 4. List All Notes (with Pagination)

```
GET /notes?page=1&limit=10
```

Returns:
- name  
- size  
- grammar issue count  
- HTML preview snippet  

### ✅ 5. HTML Viewer
Rendered HTML is displayed using EJS template:
```
views/htmlViewer.ejs
```

---

## 📂 Project Structure

```

├── controllers
│   └── notesController.js
├── routes
│   └── api
│       └── notesRoute.js
├── config
│   └── mutlerCon.js
├── middleware
│   ├── logEvents.js
│   └── errorHandler.js
├── model
│   └── Files.json
├── uploads/
├── views/
│   └── htmlViewer.ejs
├── server.js
└── README.md

```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/notes` | List saved notes (with pagination) |
| `POST` | `/notes` | Upload Markdown file + grammar check |
| `GET` | `/notes/checkGrammer` | Get grammar issues for all notes |
| `GET` | `/notes/checkGrammer?id=1` | Grammar check for a specific note |
| `GET` | `/notes/:id` | Render HTML version of note |

---

## 🛠️ Technologies Used

- **Node.js**
- **Express.js**
- **Multer** (file uploads)
- **marked** (Markdown → HTML)
- **LanguageTool API** (Grammar checking)
- **EJS** (HTML rendering)
- **Filesystem Storage** (`Files.json`)

---

## ▶️ Running the Project

### 1. Install dependencies
```bash
npm install
````

### 2. Start the server

```bash
node server.js
```

Server runs on:

```
http://localhost:5000
```

---

## 📤 Uploading a Note (Example with Postman)

**POST** → `http://localhost:5000/notes`
Body → `form-data`
Field name: `file` → choose a `.md` file.

---

## 👀 Viewing a Note

Navigate to:

```
http://localhost:5000/notes/1
```

---

## 📑 File Storage Format (Files.json)

```json
{
  "id": 1,
  "originalName": "note.md",
  "savedAs": "1710762829911.md",
  "path": "uploads/1710762829911.md",
  "size": 1450,
  "html": "<h1>Hello</h1>",
  "grammerIssues": []
}
```

---

## 📌 Notes

* Only `.md` files are allowed.
* Grammar checking uses the free LanguageTool public API.
* JSON file acts as a simple database.

---

## 🧑‍💻 Author

Thesigan Yogarasa\
MERN Stack Enthusiast & Aspiring Fullstack Developer\
Built as part of [roadmap.sh Markdown Note-taking App](https://roadmap.sh/projects/markdown-note-taking-app)\
Made for learning **file uploads**, **Markdown parsing**, **grammar checking**.

---
