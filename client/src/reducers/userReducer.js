const initialStatus ={
  token:"",
  id: "",
  username: '',
  email: ''
}

// the action.id here is set by the actions.js
const user = (state = initialStatus, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        token: action.user.token,
        id: action.user.id,
        username: action.user.username,
        email: action.user.email
      };

    case "REGISTER":
      return {
        token: action.user.token,
        id: action.user.id,
        username: action.user.username,
        email: action.user.email
      };
      
    case "SIGN_OUT":
      return initialStatus

    default:
      return state
  }
}

export default user
