# 🏥 Healthcare Management System

A full-stack **Healthcare Management Web Application** that allows hospitals to manage patients, doctors, medical records, appointments, and prescriptions. Built using **React**, **Node.js**, **PostgreSQL**, **Redis**, **Kafka**, and **Docker**.

> ✨ Built to demonstrate scalable backend design, modular architecture, and clean frontend integration.

---

## 🚀 Features

- 🔐 Patient & doctor registration and tracking
- 🩺 Medical records management
- 💊 Prescription management tied to medical records
- 📅 Appointment scheduling
- ⚡ Real-time messaging capability with Kafka (future scope)
- 🧠 Caching layer using Redis
- 🐳 Fully Dockerized — easy to spin up with `docker-compose`

---

## 🛠️ Tech Stack

| Layer        | Tech Used                             |
|--------------|----------------------------------------|
| Frontend     | React (Vite), Axios, CSS               |
| Backend      | Node.js, Express.js                    |
| Database     | PostgreSQL                             |
| Messaging    | Kafka + Zookeeper                      |
| Caching      | Redis                                  |
| Containerization | Docker, Docker Compose             |

---

## 📁 Project Structure

├── backend/
│ ├── models/
│ ├── routes/
│ └── index.js
├── frontend/
│ ├── pages/
│ └── main.jsx
├── db/
│ └── schema.sql
├── docker-compose.yml
└── README.md


---

## ⚙️ Getting Started

### ✅ Prerequisites

- Docker & Docker Compose installed

### 🐳 Run the project

```bash
# Clone the repo
git clone https://github.com/yourusername/healthcare-management-app.git
cd healthcare-management-app

# Run all services
docker compose up --build
