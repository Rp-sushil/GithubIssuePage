const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

const dbService = require("./dbService");
const { request, response } = require("express");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// default
app.get("/", (request, response) => {
  response.send("Listening at post 3000");
});

// List isssues
app.get("/list-issues", (request, response) => {
  const db = dbService.getDbServiceInstance();
  var result;
  if (request.query.page) result = db.listIssueBypage(request.query.page);
  else result = db.listIssueById(request.query.id);
  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// Add Issue
app.post("/add-issue", (request, response) => {
  const { name } = request.body;
  const db = dbService.getDbServiceInstance();

  const result = db.addIssue(name);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// delete
app.delete("/delete/:id", (request, response) => {
  const { id } = request.params;
  console.log(id);
  const db = dbService.getDbServiceInstance();

  const result = db.deleteById(id);

  result
    .then((data) => response.json({ success: data }))
    .catch((err) => console.log(err));
});

// UpdateIssue
app.patch("/update/:id", (request, response) => {
  const { id } = request.params;
  const { name, status } = request.body;
  const db = dbService.getDbServiceInstance();
  console.log(id, name, status);
  const result = db.updateById(id, name, status);

  result
    .then((data) => response.json({ data: data }))
    .catch((err) => console.log(err));
});

// Listening
app.listen(5000, () => console.log("app is running"));
