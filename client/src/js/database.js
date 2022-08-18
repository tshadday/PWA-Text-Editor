import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error('putDb not implemented');

  console.log('PUT to the database');

  // Create connection to db with version 1
  const jateDb = await openDB('jate', 1);

  // Create new transaction with readwrite priviliges
  const tx = jateDb.transaction('jate', 'readwrite');

  // Opens object store
  const store = tx.objectStore('jate');

  // Stores the content under "jate" key
  const request = store.put({ jate: content });

  // Request confirmation
  const result = await request;
  console.log('data saved to the database', result);

};

// method that gets all the content from the database
export const getDb = async () => {
  console.error('getDb not implemented');

  console.log('GET from the database');

  // Create connection to db with version 1
  const jateDb = await openDB('jate', 1);

  // Create new transaction with readonly priviliges
  const tx = jateDb.transaction('jate', 'readonly');

  // Opens object store
  const store = tx.objectStore('jate');

  // Use the .getAll() to get all data in db
  const request = store.getAll();

  // Request confirmation
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
