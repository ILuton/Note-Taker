const express = require('express');
const fs = require('fs');
const path = require('path');
const pathone = require('./db/db.json');

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
// 
app.post('/api/notes', (req, res) => {


  let uuid = Math.floor(Math.random() * 10000);

  const {title, text } = req.body;

  if (title && text) {

    const newNote = {
      id: uuid,
      title: title,
      text: text
    };

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
      if (err) {
        console.error(err);
      } else {
        
        const currentNotes = JSON.parse(data);

        currentNotes.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(currentNotes), (err) => {
      err
        ? console.error(newNote)
        : console.log(
            `Note Added`
          )
        });
      }
      });

    const response = {
      status: 'success',
      body: newNote,
    };

    console.log(response);
    res.status(201).json(response);
  } else {
    res.status(500).json('Error in posting note');
  }
});



app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
