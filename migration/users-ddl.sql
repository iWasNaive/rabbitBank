CREATE TABLE users (
	id int  unsigned not null AUTO_INCREMENT,
    name varchar(50) not null,
    username varchar(255) not null,
    `password` varchar(255) not null,
    
    PRIMARY KEY (id),
    UNIQUE KEY (username)
)