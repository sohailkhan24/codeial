const mongoose = require ('mongoose');
mongoose.connect('mongodb://localhost/codeial_development');


const db = mongoose.connection;
db.on('error',console.error.bind(console,"Erorr in connecting to db"));

db.once('open',function(){
    console.log('connected to Database::MongoDb');

});

module.exports = db;