const validator = require('validator');

const signupInputValidator = (firstname, lastname, email, password, phone) => {
  if (!email || !password || !phone || !firstname || !lastname) {
    return 'All fields must be filled'
    // throw new Error('All fields must be filled');
    
  }
  if (!validator.isAlpha(firstname) || !validator.isAlpha(lastname)) {
    throw new Error('Name must be in letters');
  }
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email');
  }
  if (!validator.isLength(password, { min: 6 })) {
    throw new Error('Weak password');
  }

};

const loginInputValidator=(email,password)=>{
  if (!email || !password ) {
    throw new Error('All fields must be filled');
  }
}


 module.exports = {signupInputValidator,loginInputValidator}
