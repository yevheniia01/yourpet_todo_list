const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
var logger = require("morgan");
//const path = require('path')
//const dir = path.join(__dirname, 'public');
var PetTodo = require("./PetTodoModel");

var PORT = process.env.PORT || 8082;
const app = express();


app.use(express.static(__dirname + "/public"))
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));
// mongoose.connect('mongodb://localhost/pet_todo_db', {useNewUrlParser: true});

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/pet_todo_db";

mongoose.connect(MONGODB_URI);

mongoose.set('useFindAndModify', false);

app.post('/todo', (req, res)=>{
    PetTodo.create(req.body)
    .then(function(dbPetTodo){
        res.json(dbPetTodo)
    })
})
app.get('/todo', (req,res)=>{
    PetTodo.find({})
    .then(function(dbPetTodo){
        res.json(dbPetTodo)
        console.log(dbPetTodo)
    })
})
app.get('/delete/:id', (req, res)=>{
    let id =req.params.id;
    PetTodo.findOneAndRemove({_id: id}, function(err){
        if(err){
            console.log(err);
            return res.status(500).send();
        }else{
            return res.status(200).send()
        }
    })
})

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });