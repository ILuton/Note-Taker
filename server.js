const express = require('express');
const fs = require('fs');
const path = require('path');
const dataBase = require("./db/db.json");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended: true}))

// get Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//get route for notes page 
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
})

// get stored out of database

app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, '/db/db.json'));
})

// post note
app.post("/api/notes", (req,res) => {

  let uuid = Math.floor(Math.random()* 10000);

  let noteToAdd = {
    id: uuid,
    title: req.body.title,
    text: req.body.text
  }

  fs.writeFile(dataBase, JSON.stringify(noteToAdd), (err) => {
    if (err) console.log(err);
    console.log("note added")
  }
  )
});


app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
