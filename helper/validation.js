const isValidEmail = (email)=> {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  };
  const isValidPassword = (password)=> {
    var strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,15}$"
    );
    /*at least 1 lowercase, at least 1 uppercase,contain at least1 numeric character,
      at least one special character, range between 8-12*/
    return strongRegex.test(password);
  };
  const isValidName = (name) =>{
    const nameRegex = /^[a-zA-Z_ ]+$/;
    return nameRegex.test(name);
  };

  const isValidNo = (number)=> {
    
    const validnumber = /^[6-9]\d{9}$/;
    return validnumber.test(number);
  };


  module.exports = {isValidName, isValidEmail, isValidPassword, isValidNo }