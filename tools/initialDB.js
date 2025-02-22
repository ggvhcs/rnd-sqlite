import * as Sqlite from "expo-sqlite";

export async function initialDB(db) {
  try {
    await db.execAsync(`
        PRAGMA journal_mode = WAL;

        CREATE TABLE IF NOT EXISTS jusers (
        juid varchar(50) NOT NULL,
        username VARCHAR(15) NOT NULL,
        phone VARCHAR(15) NOT NULL,
        email varchar(50) not null default 'UNKNOWN',
        created_at DATE default CURRENT_TIMESTAMP,
        updated_at DATE default CURRENT_TIMESTAMP,
        unique (juid,username,phone),
        PRIMARY KEY(juid));
  
        DROP TABLE IF EXISTS jprofiles;
        CREATE TABLE IF NOT EXISTS jprofiles (
        jpid varchar(50) NOT NULL,
        juid varchar(50) NOT NULL unique,
        _lastname VARCHAR(15) NOT NULL,
        _address VARCHAR(15) NOT NULL default 'UNKNOWN',
        created_at DATE default CURRENT_TIMESTAMP,
        updated_at DATE default CURRENT_TIMESTAMP,
        unique (jpid,juid),
        PRIMARY KEY(jpid,juid));

        
        CREATE TABLE IF NOT EXISTS  Passengers (
        pid int NOT NULL UNIQUE,
        fname varchar(15) NOT NULL default 'UNKNOWN',
        lname varchar(15) NOT NULL default 'UNKNOWN',
        ppicture varchar(255) NOT NULL,
        puname varchar(15) UNIQUE,
        isRegistered boolean,
        created_at DATE default CURRENT_TIMESTAMP,
        updated_at DATE default CURRENT_TIMESTAMP,
        credit int default 0,
        PRIMARY KEY (pid));

        DROP TABLE IF EXISTS PassengersLogs;
        CREATE TABLE IF NOT EXISTS  PassengersLogs (
        plid int NOT NULL,
        fname varchar(15) NOT NULL default 'UNKNOWN',
        lname varchar(15) NOT NULL default 'UNKNOWN',
        ppicture varchar(255) NOT NULL,
        puname varchar(15) UNIQUE,
        isRegistered boolean,
        credit int default 0,
        created_at DATE default CURRENT_TIMESTAMP,
        updated_at DATE default CURRENT_TIMESTAMP,
        PRIMARY KEY (plid));
        `);

    console.log("Data Base Initialized.");
    // *** !this insert work. *** //
    /*await db.execAsync(`
          INSERT INTO jusers(juid,username,phone) VALUES(15,'MVR','MVR555')
        `);
        console.log("INSERT executed.");
        //
        const result = await db.getAllSync(`SELECT * FROM jusers;`);
        console.log(result);*/
  } catch (e) {
    console.log("error: ", e);
  }
}
