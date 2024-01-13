import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('example4.db');

const initializeDatabase = {};

// CREATE TABLES
initializeDatabase.createTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Players (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);'
    );
  });

  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS Words (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);'
    );
  });
};

// FOR PLAYERS **************************************************

// INSERT PLAYER
initializeDatabase.insertPlayer = (data) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Players (name) values (?)',
        [data],
        (_, res) => {
          // Handle success if needed
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// GET ALL PLAYERS
initializeDatabase.getAllPlayers = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Players', [], (_, res) => {
        const data = res.rows._array;
        resolve(data);
      }, (_, error) => {
        reject(error);
      });
    });
  });
};

// DELETE PLAYER BY ID
initializeDatabase.deletePlayerById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM Players WHERE id = ?',
        [id],
        (_, res) => {
          const data = res.rowsAffected;
          resolve(data);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};


// FOR KEYWORDS **************************************************

// INSERT WORD
initializeDatabase.insertWord = (data) => {
  try {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO Words (name) values (?)',
        [data],
        (_, res) => {
          // Handle success if needed
        },
        (_, error) => {
          console.log(error);
        }
      );
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// GET ALL KeyWords
initializeDatabase.getAllKeyWords = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM Words', [], (_, res) => {
        const data = res.rows._array;
        resolve(data);
      }, (_, error) => {
        reject(error);
      });
    });
  });
};

// DELETE KEYWORD BY ID
initializeDatabase.deleteKeyWordById = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM Words WHERE id = ?',
        [id],
        (_, res) => {
          const data = res.rowsAffected;
          resolve(data);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

module.exports = initializeDatabase;
