const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./conf");
const port = 5000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

connection.connect((err) => {
  if (err) {
    console.error(
      `Error trying to connect to your DB! :(. The error is: ${err.stack}`
    );
    return;
  }
  console.log("Congrats! You've successfully connected to the DB!");
});

const classroom = [
  "Billy",
  "Julia",
  "Moran",
  "Oerd",
  "Bryan",
  "Arne",
  "Kenneth",
  "Jessica",
];

app.get("/", (req, res) => {
  res.send("IT WORKS!");
});

// Path to get some info from the backend
app.get("/students", (req, res) => {
  connection.query("SELECT * FROM student", (err, results) => {
    if (err) {
      res.status(500).send("Server error, could not fetch all students");
    } else {
      res.json(results);
    }
  });
});

// Path to post some info at the backend
app.post("/students", (req, res) => {
  console.log("hello from the backend!! :D :D", req.body.user);
  let newStudent = req.body.user;

  // let newStudent = {
  //   name: req.body.user,
  // };
  // connection.query(`INSERT INTO student SET ?`, newStudent,

  connection.query(
    `INSERT INTO student (name) VALUES ('${newStudent}') `,
    newStudent,
    (err) => {
      if (err) {
        console.log(err);
        res.status(500).send("Server error, could not post that student");
      } else {
        res.sendStatus(201);
      }
    }
  );
});

app.listen(port, () =>
  console.log(`Backend server is running at port: ${port}`)
);
