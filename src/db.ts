import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb () {
  return open({
    filename: './database.db',
    driver: sqlite3.Database,
  })
}

export async function createTable() {
  try {
    const db = await openDb();

    db.exec('CREATE TABLE IF NOT EXISTS Links (id INTEGER PRIMARY KEY, url TEXT, hash TEXT)');
  } catch (error) {
    console.log(error) 
  }
}

export async function insertLink(data: { url: string; hash: string}) {
  try {
    const db = await openDb();

    db.run('INSERT INTO Links (url, hash) VALUES (?,?)', [data.url, data.hash]);
  } catch (error) {
    console.log(error) 

    throw error;
  }
}

export async function selectLink(hash: string) {
  try {
    const db = await openDb();

    const result = await db.get('SELECT * FROM Links WHERE hash = ?', [hash]);

    return result;
  } catch (error) {
    console.log(error) 

    throw error;
  }
}