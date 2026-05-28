CREATE TABLE accounts (
	id int unsigned not null AUTO_INCREMENT PRIMARY KEY,
    user_id int unsigned not null,
    balance bigint unsigned not null DEFAULT(0),
    `date` time DEFAULT CURRENT_TIMESTAMP,
    cvv2 int unsigned not null,
    is_Avtive tinyint not null DEFAULT 1,
    cardnuber char(16) not null,

    CONSTRAINT fk_accounts_table FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE

)