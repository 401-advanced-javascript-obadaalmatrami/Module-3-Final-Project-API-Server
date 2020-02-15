
const User = require('./users-model.js');

module.exports = (req, res, next) => {
  
  try {
    let [authType, authString] = req.headers.authorization.split(/\s+/);

    switch( authType.toLowerCase() ) {
    case 'basic': 
      return _authBasic(authString);
    case 'bearer':
      return _authBearer(authString);
    default: 
      return _authError();
    }
  }
  catch(e) {
    _authError();
  }
  
  
  function _authBasic(str) {
    let base64Buffer = Buffer.from(str, 'base-64'); 
    let bufferString = base64Buffer.toString();    
    let [username, password] = bufferString.split(':'); 
    let auth = {username,password}; 
    
    return User.authenticateBasic(auth)
      .then(user => _authenticate(user) )
      .catch(next);
  }

  function _authBearer(authString) {
    console.log('first log', authString);
    return User.authenticateToken(authString)
      .then( user => _authenticate(user) )
      .catch((e) => {
        console.log(e);
        next(e);
      });
  }

  function _authenticate(user) {
    if(user) {
      req.user = user;
      req.token = user.generateToken();
      next();
    }
    else {
      _authError();
    }
  }
  
  function _authError() {
    return 'Invalid User ID/Password';
  }
  
};