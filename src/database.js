const mongoose = require('mongoose');

//Mongoose is support UseNewUrlParser 

mongoose.connect('mongodb://localhost/notes-db-app',{
 
    useNewUrlParser: true
   
})

.then (db => console.log('DB is Connected'))
.catch(err => console.error(err));