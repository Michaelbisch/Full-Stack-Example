INSERT INTO users (username,password, balance, user_img)
VALUES (${username},${password},0,'https://i.pinimg.com/originals/d9/bb/33/d9bb33ae4df49ed4e1c481e74bf5c4eb.jpg')
returning username, balance, user_img, id

/*we don't want to return * because we don't want the password to be displayed*/
/*the number requires us to put things in a specific order*/

