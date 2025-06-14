import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "12345",
  database: "back",
});

db.getConnection((err) => {
  if (err) {
    return console.log(err, "Error not connected");
  } else {
    console.log("Db connected sucessfully");
  }
});
export default db;
