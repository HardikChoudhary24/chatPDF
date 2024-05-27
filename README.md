# Project Name

This project sets up an Express.js application with PostgreSQL and Redis, all running in Docker containers. The application also integrates with the Gemini API. The application is accessible at `http://localhost:8080`.

## Frontend

For the frontend, refer to the [chatPDF-client](https://github.com/HardikChoudhary24/chatPDF-client) repository. Follow the instructions in the frontend repository to set up and run the frontend application.

## Prerequisites

Ensure you have the following installed on your local machine:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Follow these steps to set up and run the project:

### 1. Clone the Repository

```bash
git clone https://github.com/HardikChoudhary24/chatPDF-server.git
cd chatPDF-server
```

### 2. Create and Configure Environment Variables

1. Copy the example environment file to a new file named `.env` and populate it with your actual keys and configuration values:

    ```bash
    cp ..example.env .env
    ```

### 3. Build and Run the Docker Containers

Use Docker Compose to build and start the containers:

```bash
docker-compose up --build
```

This command will:

- Start a PostgreSQL container.
- Start a Redis container.
- Build and start the Express.js application container.

### 4. Access the Application

Once the containers are up and running, you can access the application at:

```
http://localhost:8080
```

## Project Structure

- **src/**: Contains the source code of the Express.js application.
- **docker-compose.yml**: Defines the Docker services (PostgreSQL, Redis, and Express app).
- **Dockerfile**: Instructions to build the Docker image for the Express app.
- **.env.example**: Example environment variables file.
- **init-db/**: Contains database initialization scripts (if any).

## Additional Commands

### Stop the Containers

To stop the running containers:

```bash
docker-compose down
```

### Rebuild the Containers

If you make changes to the Docker configuration or the application code, you may need to rebuild the containers:

```bash
docker-compose up --build
```
