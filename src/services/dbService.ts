import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const getDBconnection = async () => {
  return SQLite.openDatabase({name: 'social.db', location: 'default'});
};

export const createTables = async (db: SQLite.SQLiteDatabase) => {
  const postTableQuery = `CREATE TABLE IF NOT EXISTS posts (
    id TEXT PRIMARY KEY,
    content TEXT,
    synced INTEGER,
    updated INTEGER DEFAULT 0,
    deleted INTEGER DEFAULT 0,
    timestamp TEXT,
    userId INTEGER
  )`;

  const userTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
  )`;

  await db.executeSql(postTableQuery);
  await db.executeSql(userTableQuery);
};

export const registerUser = async (db: SQLite.SQLiteDatabase, username: string, password: string) => {
  const insertQuery = `INSERT INTO users (username, password) VALUES (?, ?)`;
  await db.executeSql(insertQuery, [username, password]);
};

export const validateUser = async (db: SQLite.SQLiteDatabase, username: string, password: string) => {
  const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
  const results = await db.executeSql(query, [username, password]);
 if (results[0].rows.length > 0) {
    return results[0].rows.item(0);
  } else {
    return null;
  }
};

export const userExists = async (db: SQLite.SQLiteDatabase, username: string) => {
  const query = `SELECT * FROM users WHERE username = ?`;
  const results = await db.executeSql(query, [username]);
  return results[0].rows.length > 0;
};

export const insertPost = async (
  db: SQLite.SQLiteDatabase,
  post: { id: string; content: string; synced: boolean; userId: number; timestamp: string }
) => {
  const query = `INSERT INTO posts (id, content, synced, timestamp, userId) VALUES (?, ?, ?, ?, ?)`;
  await db.executeSql(query, [post.id, post.content, post.synced ? 1 : 0, post.timestamp, post.userId]);
};

export const fetchPosts = async (db: SQLite.SQLiteDatabase) => {
  const posts: any[] = [];
  const query = `
    SELECT posts.*, users.username 
    FROM posts 
    LEFT JOIN users ON posts.userId = users.id
    ORDER BY datetime(timestamp) DESC
  `;
  const results = await db.executeSql(query);
  results.forEach((result:any) => {
    for (let i = 0; i < result.rows.length; i++) {
      const row = result.rows.item(i);
      posts.push({
        id: row.id,
        content: row.content,
        synced: row.synced === 1,
        deleted: row.deleted === 1,
        updated: row.updated === 1,
        timestamp: row.timestamp,
        username: row.username || 'Unknown',
        userId: row.userId
      });
    }
  });
  return posts;
};

export const markPostAsSynced = async (db: SQLite.SQLiteDatabase, id: string) => {
  await db.executeSql(`UPDATE posts SET synced = 1 WHERE id = ?`, [id]);
};

export const updatePostContent = async (db: SQLite.SQLiteDatabase, id: string, content: string) => {
  const query = `UPDATE posts SET content = ?, synced = 0, updated = 1 WHERE id = ?`;
  await db.executeSql(query, [content, id]);
};

export const softDeletePost = async (db: SQLite.SQLiteDatabase, id: string) => {
  await db.executeSql(`UPDATE posts SET deleted = 1, synced = 0 WHERE id = ?`, [id]);
};

export const hardDeletePost = async (db: SQLite.SQLiteDatabase, id: string) => {
  await db.executeSql(`DELETE FROM posts WHERE id = ?`, [id]);
};
