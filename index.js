const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
const port = 3000;

app.use(express.json()); //json->object
app.use(express.urlencoded({ extended: true })); //html form ->object

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "wlq23128371@",
  database: "bbs",
});
db.connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/list", (req, res) => {
  const sqlQuery =
    "SELECT id, title, content, writer, DATE_FORMAT(date, '%Y-%m-%d') AS date FROM board;";
  db.query(sqlQuery, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/write", (req, res) => {
  const { title, name, content } = req.body;
  const sqlQuery = "INSERT INTO board (title, content, writer) VALUES (?, ?, ?)";

  db.query(sqlQuery, [title, content, name], (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
