# SIC Maternal AI

An academic AI project for maternal health risk prediction and educational chatbot assistance.

## Project Structure

```text
SIC-MATERNAL-AI/
├── frontend/
├── backend/
└── ml/
```

## Requirements

Make sure you have installed:

* Python 3.9+
* Node.js 18+
* npm

---

## 1. Run the Backend

Open a terminal and navigate to the backend:

```bash
cd backend
```

### Create and activate a virtual environment

Linux/macOS:

```bash
python3 -m venv venv
source venv/bin/activate
```

Windows:

```bash
python -m venv venv
venv\Scripts\activate
```
or using WSL

```bash
wsl
python3 -m venv venv
source venv/bin/activate
```

### Install dependencies

```bash
pip install -r requirements.txt
```

### Configure environment variables

Create a `.env` file inside the `backend` folder:

```env
GEMINI_API_KEY=your_api_key_here
```

Do not commit the `.env` file to GitHub.

### Start the backend

```bash
uvicorn app.main:app --reload
```

The backend will run at:

```text
http://localhost:8000
```

API documentation is available at:

```text
http://localhost:8000/docs
```

---

## 2. Run the Frontend

Open another terminal and navigate to the frontend:

```bash
cd frontend
```

### Install dependencies

```bash
npm install
```

### Configure the API URL

Create a `.env` file inside the `frontend` folder:

```env
VITE_API_URL=http://localhost:8000
```

### Start the frontend

```bash
npm run dev
```

The frontend will usually run at:

```text
http://localhost:5173
```

Open this URL in your browser.

---

## 3. Running the Full Application

You need **two terminals** running at the same time.

### Terminal 1 — Backend

```bash
cd backend
source venv/bin/activate
uvicorn app.main:app --reload
```

### Terminal 2 — Frontend

```bash
cd frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

The frontend communicates with the backend through:

```text
http://localhost:8000/api
```

## Important

Make sure the backend is running before using the prediction or chatbot features.

The application is intended for **academic and educational purposes**. Predictions should not be used as a medical diagnosis or as a substitute for professional medical advice.
