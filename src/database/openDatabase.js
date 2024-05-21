import * as SQLite from "expo-sqlite";
import { returnFileUri } from "../components/share/SavePost";
export async function openDatabase() {
  try {
    const db = await SQLite.openDatabase("dbName", "6");

    await db.exec([{ sql: "PRAGMA foreign_keys = ON;", args: [] }], false, () =>
      console.log("Foreign keys turned on")
    );

    await createTables(db);

    return db;
  } catch (error) {
    //console.log(error);
  }
}
const createTables = async (db) => {
  await db.transaction((tx) => {
    tx.executeSql(
      "create table if not exists videosTBL (id integer primary key not null, title text, description text, createdAt date, image text, file text, _id text, fileMimetype text, fileEx text, imageMimetype text, imageEx text );"
    );
    tx.executeSql(
      "create table if not exists items (id integer primary key not null, done int, value text);"
    );
    tx.executeSql(
      "create table if not exists voicesTBL (id integer primary key not null, title text, createdAt date, image text, file text, _id text, fileMimetype text, fileEx text, imageMimetype text, imageEx text, playlistTitle text );"
    );
    tx.executeSql(
      "create table if not exists booksTBL (id integer primary key not null, title text, createdAt date, image text, file text, _id text, fileMimetype text, fileEx text, imageMimetype text, imageEx text, author text, audioFile text, audioEx text, hasCustomizedPages integer);"
    );
    tx.executeSql(
      "create table if not exists customizeBooksTBL (id integer primary key not null, pageImage text, pageNumber integer, text text, second integer, _id text, imageMimetype text, imageEx text);"
    );
    tx.executeSql(
      "create table if not exists gamesTBL (id integer primary key not null, title text, createdAt date, image text, file text, _id text, fileMimetype text, fileEx text, imageMimetype text, imageEx text, pakageName text );"
    );
  });
};

export const getAllVideos = async (forceUpdate, onQuery) => {
  const db = await openDatabase();
  new Promise((resolve, reject) => {
    try {
      let videos = [];
      db.transaction(
        (tx) => {
          tx.executeSql(`select * from videosTBL`, [], async (_, { rows }) => {
            videos = rows._array;

            await dataWraper(videos);
            onQuery(videos);
          });
          // tx.executeSql(
          //   `DELETE FROM videosTBL;`,
          //   [],
          //   async (_, { rows }) => {}
          // );
        },
        null,
        forceUpdate
      );
    } catch (error) {
      //console.log(error);
    }
  });
};

export const insertVideo = async (
  title,
  description,
  image,
  file,
  forceUpdate,
  _id,
  fileMimetype,
  fileEx,
  imageMimetype,
  imageEx
) => {
  const db = await openDatabase();
  db.transaction(
    (tx) => {
      tx.executeSql(
        `select * from videosTBL where _id = ?`,
        [_id],
        (_, { rows }) => {
          //console.log(rows);
          let videos = rows._array;
          //console.log(videos);
          if (rows.length == 0) {
            tx.executeSql(
              "insert into videosTBL (title, description, createdAt, image, file, _id, fileMimetype, fileEx, imageMimetype, imageEx) values (?, ?, ? ,? ,? ,? ,? , ?, ?, ?)",
              [
                title,
                description,
                Date.now(),
                image,
                file,
                _id,
                fileMimetype,
                fileEx,
                imageMimetype,
                imageEx,
              ]
            );
          } else {
            //console.log("repeated");
          }
        }
      );
    },
    null,
    forceUpdate
  );

  return true;
};

//voice block
export const getAllVoices = async (forceUpdate, onQuery) => {
  const db = await openDatabase();
  new Promise((resolve, reject) => {
    try {
      let voices = [];
      db.transaction(
        (tx) => {
          tx.executeSql(`select * from voicesTBL`, [], async (_, { rows }) => {
            voices = rows._array;
            await dataWraper(voices);
            //console.log(voices);
            onQuery(voices);
          });
        },
        null,
        forceUpdate
      );
    } catch (error) {
      //console.log(error);
    }
  });
};
export const insertVoice = async (
  title,
  playlistTitle,
  image,
  file,
  _id,
  fileMimetype,
  fileEx,
  imageMimetype,
  imageEx,
  forceUpdate
) => {
  const db = await openDatabase();
  db.transaction(
    (tx) => {
      tx.executeSql(
        `select * from videosTBL where _id = ?`,
        [_id],
        (_, { rows }) => {
          let videos = rows._array;
          //console.log(videos);
          if (rows.length == 0) {
            tx.executeSql(
              "insert into voicesTBL (title, playlistTitle, createdAt, image, file, _id, fileMimetype, fileEx, imageMimetype, imageEx) values (?, ?, ? ,? ,? ,? ,? , ?, ?, ?)",
              [
                title,
                playlistTitle,
                Date.now(),
                image,
                file,
                _id,
                fileMimetype,
                fileEx,
                imageMimetype,
                imageEx,
              ]
            );
          } else {
            //console.log("repeated");
          }
        }
      );
    },
    null,
    forceUpdate
  );

  return true;
};

//book blocks
export const getAllBooks = async (forceUpdate, onQuery) => {
  const db = await openDatabase();
  new Promise((resolve, reject) => {
    try {
      let books = [];
      db.transaction(
        (tx) => {
          tx.executeSql(`select * from booksTBL`, [], async (_, { rows }) => {
            books = rows._array;
            for (let i = 0; i < books.length; i++) {
              books[i].image = await returnFileUri(books[i].image);
              books[i].file = await returnFileUri(
                books[i].file + "." + books[i].fileEx
              );
              books[i].createdAt = new Date(books[i].createdAt);
              if (books[i].audioFile)
                books[i].audioFile = await returnFileUri(
                  books[i].audioFile + "." + books[i].audioEx
                );
            }
            //console.log(books);
            onQuery(books);
          });
        },
        null,
        forceUpdate
      );
    } catch (error) {
      //console.log(error);
    }
  });
};
export const insertBook = async (
  title,
  author,
  image,
  file,
  _id,
  fileMimetype,
  fileEx,
  imageMimetype,
  imageEx,
  audioFile,
  audioEx,
  hasCustomizedPages = 0,
  forceUpdate
) => {
  const db = await openDatabase();
  db.transaction(
    (tx) => {
      tx.executeSql(
        `select * from booksTBL where _id = ?`,
        [_id],
        (_, { rows }) => {
          let books = rows._array;
          //console.log(books);
          if (rows.length == 0) {
            tx.executeSql(
              "insert into booksTBL (title, author, createdAt, image, file, _id, fileMimetype, fileEx, imageMimetype, imageEx, audioFile, audioEx, hasCustomizedPages) values (?, ?, ? ,? ,? ,? ,? , ?, ?, ?,? ,? , ?)",
              [
                title,
                author,
                Date.now(),
                image,
                file,
                _id,
                fileMimetype,
                fileEx,
                imageMimetype,
                imageEx,
                audioFile,
                audioEx,
                hasCustomizedPages,
              ]
            );
          } else {
            //console.log("repeated");
          }
        }
      );
    },
    null,
    forceUpdate
  );

  return true;
};
export const singleBook = async (forceUpdate, _id, callBack) => {
  const db = await openDatabase();
  db.transaction(
    (tx) => {
      tx.executeSql(
        `select * from booksTBL where _id = ?`,
        [_id],
        async (_, { rows }) => {
          let books = rows._array;
          //console.log(books);
          if (rows.length == 0) {
            callBack(false, {});
            return false;
          } else {
            books[0].image = await returnFileUri(books[0].image);
            books[0].file = await returnFileUri(
              books[0].file + "." + books[0].fileEx
            );
            books[0].createdAt = new Date(books[0].createdAt);
            if (books[0].audioFile)
              books[0].audioFile = await returnFileUri(
                books[0].audioFile + "." + books[0].audioEx
              );
            callBack(true, books[0]);
            return true;
          }
        }
      );
    },
    null,
    forceUpdate
  );

  return true;
};

//customize book
export const insertCustomizeBooks = async (
  customizePages,
  bookId,
  forceUpdate
) => {
  const db = await openDatabase();
  db.transaction(
    (tx) => {
      for (let i = 0; i < customizePages.length; i++) {
        const element = customizePages[i];
        tx.executeSql(
          `select * from customizeBooksTBL where _id = ?`,
          [element._id],
          (_, { rows }) => {
            let customizeBooks = rows._array;
            //console.log(customizeBooks);
            if (rows.length == 0) {
              tx.executeSql(
                "insert into customizeBooksTBL (pageImage , pageNumber, text , second , _id , imageMimetype , imageEx, bookId) values (?, ?, ? ,? ,? ,? ,? , ?)",
                [
                  element.pageImage,
                  element.pageNumber,
                  element.text,
                  element.second,
                  element._id,
                  element.imageMimetype,
                  element.imageEx,
                  bookId,
                ]
              );
            } else {
              //console.log("repeated");
            }
          }
        );
      }
    },
    null,
    forceUpdate
  );

  return true;
};
const dataWraper = async (posts) => {
  for (let i = 0; i < posts.length; i++) {
    posts[i].image = await returnFileUri(posts[i].image);
    posts[i].file = await returnFileUri(posts[i].file + "." + posts[i].fileEx);
    posts[i].createdAt = new Date(posts[i].createdAt);
  }
};

//game block

export const getAllGames = async (forceUpdate, onQuery) => {
  const db = await openDatabase();
  new Promise((resolve, reject) => {
    try {
      let games = [];
      db.transaction(
        (tx) => {
          tx.executeSql(`select * from gamesTBL`, [], async (_, { rows }) => {
            games = rows._array;

            await dataWraper(games);
            onQuery(games);
          });
          // tx.executeSql(
          //   `DELETE FROM videosTBL;`,
          //   [],
          //   async (_, { rows }) => {}
          // );
        },
        null,
        forceUpdate
      );
    } catch (error) {
      //console.log(error);
    }
  });
};

export const insertGame = async (
  title,
  image,
  file,
  forceUpdate,
  _id,
  fileMimetype,
  fileEx,
  imageMimetype,
  imageEx,
  pakageName
) => {
  const db = await openDatabase();
  db.transaction(
    (tx) => {
      tx.executeSql(
        `select * from gamesTBL where _id = ?`,
        [_id],
        (_, { rows }) => {
          //console.log(rows);
          let games = rows._array;
          //console.log(games);
          if (rows.length == 0) {
            tx.executeSql(
              "insert into gamesTBL (title, createdAt, image, file, _id, fileMimetype, fileEx, imageMimetype, imageEx, pakageName) values (?, ?, ? ,? ,? ,? ,? , ?, ?, ?)",
              [
                title,
                Date.now(),
                image,
                file,
                _id,
                fileMimetype,
                fileEx,
                imageMimetype,
                imageEx,
                pakageName,
              ]
            );
          } else {
            console.log("repeated");
          }
        }
      );
    },
    null,
    forceUpdate
  );

  return true;
};
