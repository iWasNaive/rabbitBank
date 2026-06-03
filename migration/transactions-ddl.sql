CREATE TABLE transactions( 
    id int unsigned not null AUTO_INCREMENT PRIMARY KEY,
    sender_id int unsigned not null,
    receiver_id int unsigned not null,
    amount bigint NOT null,
    `status` enum("success", "faile"),
    referencecode int not null,
    created_at datetime not null DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (sender_id) REFERENCES accounts(id),
    FOREIGN KEY (receiver_id) REFERENCES accounts(id)
   
)