CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    balance INT,
    user_img VARCHAR(255)
)

INSERT INTO users (username,password, balance, user_img)
VALUES ('Kevin','hello',0,'https://i.pinimg.com/originals/d9/bb/33/d9bb33ae4df49ed4e1c481e74bf5c4eb.jpg');