CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR,
    lastName VARCHAR,
    email VARCHAR,
    password VARCHAR
);

CREATE TABLE POSTS (
    id SERIAL PRIMARY KEY,
    title VARCHAR,
    content VARCHAR ,-- HTML
    userId INT REFERENCES users(id)
);

-- users HAS MANY posts
-- posts BELONGS TO ONE user
