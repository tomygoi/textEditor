import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.error("Put in database");
  const jateDB = await openDB("jate", 1);
  const transaction = jateDB.transaction("jate", "readwrite");
  const store = transaction.objectStore("jate");
  await store.add(content);
  await transaction.done;
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.error("Get from database");
  const jateDB = await openDB("jate", 1);
  const transaction = jateDB.transaction("jate", "readonly");
  const store = transaction.objectStore("jate");
  const content = await store.getAll();
  await transaction.done;
  return content;
}

initdb();
