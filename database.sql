CREATE EXTENSION vector;

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
    user_id INT REFERENCES USERS(user_id),
    status VARCHAR(100)
);

CREATE TABLE EMBEDDINGS(
    id SERIAL PRIMARY KEY,
    project_id INT REFERENCES PROJECT(project_id), 
    text_embedding vector(768),
    text_content VARCHAR(1500)
);

