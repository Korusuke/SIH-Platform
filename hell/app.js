const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Middleware functions
app.use(cookieParser());
app.use(cors(
  //required for using withcredentials on front end
    {
    
      origin: 'http://localhost:3000',
      credentials: true,
    
    }
  
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

app.use('/delete', require('./routes/delete'));
app.use('/ps', require('./routes/problemStatement'));
app.use('/export', require('./routes/export.js'));
app.use('/team', require('./routes/team'));
app.use('/user', require('./routes/user'));
app.use('/', require('./routes/login'));

const port = 8080;
app.listen(port, () => {
	console.log('Hey, listening on port %s', port);
});