PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE _jusers (
_jusersid varchar(16)     not null unique,
username VARCHAR(15) NOT NULL,
phone VARCHAR(15) NOT NULL,
email      varchar(50)     not null,
created_at DATE NOT NULL,
updated_at DATE NOT NULL,
PRIMARY KEY(_jusersid));
COMMIT;
