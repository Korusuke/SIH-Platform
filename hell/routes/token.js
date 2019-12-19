async function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if(!token){
      res.json({
        'msg': 'Token not present'
      });
      return;
    }
    blacklistedTokens = await client.lrange('blacklistedTokens',0,-1);
    if(token in blacklistedTokens){
      res.json({
        "msg":"Token invalidated, please sign in again",
      });
      return;
    } 
    jwt.verify(token, privateKey, (err) => {
      if (err) {
        res.json({'msg': 'Token expired'});
      }
      else{
        req.token = token;
        next();
      }
    });
}


