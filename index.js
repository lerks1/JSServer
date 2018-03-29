const express = require('express');
const bodyParser = require('body-parser');

//Sets up express app instance
const app = express();

app.use(bodyParser.json());

//Assigns routes from api.js, first parameter adds a section to the route.
//In this example it goes 880/api/whatever. Inserts api into route.
app.use('/api', require('./routes/api'));

//Starts the listening process
app.listen(8080, function(){
    console.log('Listening');
})
