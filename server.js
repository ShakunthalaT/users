const express = require("express");
const path = require("path");
const bp = require("body-parser");
const cors = require("cors");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");


const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
const dbPath = path.join(__dirname, "userDetails.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};
initializeDBAndServer(); 

app.post("/users/", async (request, response) => {
    const { id, first_name, last_name, email, department } = request.body;
    const getUsers = `
    INSERT INTO
      user (id, first_name, last_name, email, department)
    VALUES
      ('${id}', '${first_name}', '${last_name}','${email}','${department}');`;
    await db.run(getUsers);
    response.send("Newuser Successfully Added");
  });
  
app.delete("/users/:id/", async (request, response) => {
    const { id } = request.params;
    const deleteId = `
    DELETE FROM
      user
    WHERE
      id = ${id} 
    `;
    await db.run(deleteId);
    response.send("User Removed");
  });
  
  app.get("/users/", async (request, response) => {
    const getAllUsers = `
      SELECT
        *
      FROM
        user;`;
    const usersArray = await db.all(getAllUsers);
    response.send(usersArray);
  });
  
  app.put("/users/:id/", async (request, response) => {
    const { id } = request.params;
    const {first_name, last_name, email, department} = request.body;
    const updateUser = `
      UPDATE
        user
      SET 
        
        first_name ='${first_name}',
        last_name ='${last_name}',
        email ='${email}',
        department ='${department}'
      WHERE
      id='${id}';`;
    await db.run(updateUser);
    response.send("User updated successfully");
  });
  
  module.exports = app;