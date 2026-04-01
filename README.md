# ⚡ Node.js REST API (TypeScript + Redis)

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

A robust, TypeScript-based REST API containerized with Docker. This setup runs both the Node.js application and a Redis instance within a single unified container environment, streamlining local development and deployment.

## 🚀 Quick Start with Docker

Get the API and Redis cache up and running in just a few commands.

### 1. Configure Environment
Create a `.env` file in the root directory. You can copy the structure below:

```env
# Application
PORT=3000
NODE_ENV=development

# Database (Using host.docker.internal to connect to your local MongoDB)
MONGO_URI=mongodb://host.docker.internal:27017/
DATABASE_NAME=rest_api_ts

# Security
JWT_SECRET=your_jwt_secret_key
```
> **Note:** `host.docker.internal` allows the Docker container to communicate with the MongoDB instance running directly on your host machine.

### 2. Build the Image
Compile the TypeScript code and bundle the Docker image containing Node and Redis:

```bash
docker build -t node-rest-redis .
```

### 3. Spin Up the Container
Run the container in detached mode (`-d`), mapping the necessary ports for the API and Redis:

```bash
docker run -d \
  --name node-rest-redis \
  --env-file .env \
  -p 3000:3000 \
  -p 6379:6379 \
  --rm \
  node-rest-redis
```

---

## 📡 Services & Access

Once the container is running, your services are accessible at:

| Service | Address | Description |
| :--- | :--- | :--- |
| **REST API** | `http://localhost:3000` | Main application endpoint |
| **Redis** | `127.0.0.1:6379` | Cache access (useful for local debugging using `redis-cli`) |

---

## 🛠️ Environment Variables Reference

| Variable | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `PORT` | Number | `3000` | The port the Express server listens on. |
| `NODE_ENV` | String | `development` | Defines the environment (`development`, `production`). |
| `MONGO_URI` | String | - | Connection string for MongoDB. |
| `DATABASE_NAME`| String | `rest_api_ts` | The specific MongoDB database to use. |
| `JWT_SECRET` | String | - | Secret key used for signing JSON Web Tokens. |