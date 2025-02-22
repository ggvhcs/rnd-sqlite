PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE table_test(timestamp TEXT, description TEXT);
INSERT INTO table_test VALUES('2025-02-18 17:58:33','First test data. Foo');
INSERT INTO table_test VALUES('2025-02-18 17:58:39','Second test data. Bar');
COMMIT;
