export const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  
  export const validateName = (name) => {
    return name.match(
      /^([a-z]|[A-Z])+$/
    );
  };

  export const validatePhone = (phone) => {
    return phone.match(
      /^\(\d{3}\)\s\d{3}\-\d{4}$/
    );
  };