DROP TABLE reviews;
DROP TABLE users;
DROP TABLE restaurants;

CREATE TABLE restaurants(
    id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    address VARCHAR(200),
    street VARCHAR(200),
    city VARCHAR(200),
    state VARCHAR(50),
    menu VARCHAR(500)
);

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(200),
    password VARCHAR(500)
);

CREATE TABLE reviews(
    id SERIAL PRIMARY KEY,
    score INT,
    context TEXT,
    restaurant_id INT REFERENCES restaurants(id),
    userid INT REFERENCES users(id)
);
