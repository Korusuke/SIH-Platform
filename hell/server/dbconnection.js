const db=require('./dbconnection');
const MongoClient = require('mongodb').MongoClient;
const uri = "process.env.MONGODB_URI";
let mongodb;

// connecting to db server
function connectDB(callback){
  MongoClient
  .connect(uri, { useNewUrlParser: true })
  .then((db)=>{
    mongodb = db;
    callback();
})
  .catch(err => { console.log(err); });
}

function get(){
  return mongodb;
}

// the client whose connection we want to close
function terminateConnection(){
  mongodb.close();
}

module.exports = {
  connectDB,
  get,
  terminateConnection
};
