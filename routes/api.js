const express = require('express');
const router = express.Router();

var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "serverpword",
  database: "test_db"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

//Gets a list from DB - Currently set to get all.
router.get('/testinfo', function(req, res){
  con.query(`SELECT * FROM test_data;`, function (err, result) {
    if (err){
      throw err;
      res.send('Insert Failed');
    }
    else{
      res.send(result);
    }
  });
});

//Add details to DB - New Entry
router.post('/testinfo', function(req, res){
  console.log(req.body);
  con.query(`INSERT INTO test_data (Name, Age) VALUES ("${req.body.name}", ${req.body.age})`, function (err, result) {
    if (err){
      throw err;
      res.send('Insert Failed');
    }
    else{
      res.send('Insert Sucessful');
    }
  });
});

//Update existing detail in DB ':' specifies user will specify.
router.put('/testinfo/:id', function(req, res){
  console.log(req.params.id);
  con.query(`UPDATE test_data SET Name = '${req.body.name}', Age = ${req.body.age} WHERE ID = ${req.params.id};`, function (err, result) {
    if (err){
      throw err;
      res.send('Update Failed');
    }
    else{
      res.send('Update Sucessful');
    }
  });
});

//Deletes existing entry in DB
router.delete('/testinfo/:id', function(req, res){
  con.query(`DELETE FROM test_data WHERE ID = ${req.params.id}`, function (err, result) {
    if (err){
      throw err;
      res.send('Delete Failed');
    }
    else{
      res.send('Delete Sucessful');
    }
  });
});

module.exports = router;
