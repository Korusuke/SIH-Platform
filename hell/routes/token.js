const redis = require('redis');
const jwt = require('jsonwebtoken');

const client = redis.createClient({
  host: process.env.REDIS_KEY,
  port: 6379
});
client.on('error', (err) => {
  console.log('Something went wrong ', err);
});


function verifyToken(req, res, next) {
  const token = req.cookies.token;
    if(!token){
      res.json({
        'msg': 'Token not present'
      });
      return;
    }
    client.lrange('blacklistedTokens',0,-1, (err, data)=>{
      if(err){
        console.log(err);
        return;
      }
      if(token in data){
        res.json({
          "msg":"Token invalidated, please sign in again",
        });
        return;
      }
      jwt.verify(token, process.env.KEY, (err) => {
        if (err) {
          res.json({'msg': 'Token expired'});
        }
        else{
          req.token = token;
          next();
        }
      });
    });
}

module.exports = {
  verifyToken
}