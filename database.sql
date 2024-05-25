CREATE DATABASE chatPDF_DB;

CREATE TABLE USERS(
    user_id SERIAL PRIMARY KEY, 
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password TEXT
);
CREATE TABLE PROJECT(
    project_id SERIAL PRIMARY KEY, 
    project_name VARCHAR(255),
    pdfURL TEXT,
    user_id INT REFERENCES USERS(user_id)
);
CREATE TABLE EMBEDDINGS(
    id SERIAL PRIMARY,
    project_id INT REFERENCES PROJECT(project_id), 
    text_embedding vector(1536),
    text_content TEXT
);

