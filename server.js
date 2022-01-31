const PORT = process.env.PORT || 3001;
const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const allNotes = require("./db/db.json");
const uuid = require("./public/assets/js/uuid.js");
app.use(express.json());
app.use(express.static("public"));
app.get("/api/notes", (req, res) => {
  res.json(allNotes.slice(1));
});
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
app.post("/api/notes", function (req, res) {
  const newNote = req.body;
  req.body.id = allNotes[0];
  allNotes[0] = uuid();
  allNotes.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(allNotes), (err) =>
  err ?
  console.error(err) :
  res);
  res.send("saved");
});
app.delete("/api/notes/:id", function (req, res) {
  for (let i = 0; i < allNotes.length; i++) {
    if (allNotes[i].id == req.params.id) {
      allNotes.splice(i, 1);
      fs.writeFile("./db/db.json", JSON.stringify(allNotes), (err) =>
      err ?
      console.error(err) :
      res);
    }
  }
 res.send("deleted");
});
app.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
