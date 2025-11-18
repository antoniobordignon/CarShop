import { openDatabaseSync } from "expo-sqlite";

export const db = openDatabaseSync("cars.db");

export function createTables() {
  db.execAsync(`
    CREATE TABLE IF NOT EXISTS cars (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      new BOOLEAN NOT NULL,
      brand TEXT NOT NULL,
      model TEXT NOT NULL,
      year INTEGER NOT NULL,
      price REAL NOT NULL,
      color TEXT NOT NULL,
      km INTEGER NOT NULL,
      description TEXT
    );
  `);

  db.execAsync(`
    CREATE TABLE IF NOT EXISTS car_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      url TEXT NOT NULL,
      carId INTEGER NOT NULL,
      car TEXT,
      FOREIGN KEY (carId) REFERENCES cars (id)
    );
  `);
}
