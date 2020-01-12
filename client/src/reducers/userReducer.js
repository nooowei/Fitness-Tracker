const initialStatus ={
  username: '',
  password: '',
  email: '',
  msg: ''
}

// the action.id here is set by the actions.js
const user = (state = initialStatus, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        username: action.user.username,
        password: action.user.password,
        email: action.user.email,
        msg: ''
      };

    case "REGISTER":
      return {
        username: action.user.username,
        password: action.user.password,
        email: action.user.email,
        msg: ''
      };
      
    case "SIGN_OUT":
      return initialStatus

    default:
      return state
  }
}

export default user
