// import DatePicker from 'react-datepicker';
// initial state for userID should be an empty string
// the action.id here is set by the actions.js
let initialLog = [];
const logs = (state = initialLog, action) => {
  // console.log("logRed, line 6");
  // console.log("log action received: " + action.type); //working
  // console.log("action.logs received in reducer is: ");
  // console.log(action.logs); //working
  switch (action.type) {
    case "CREATE_LOG":
      return [...state,
          {
            username: action.log.username,
            description: action.log.description,
            duration: action.log.duration,
            date: action.log.date
          }
      ]
      

    case "EDIT_LOG":
      return [...state,
          {
            username: action.log.username,
            description: action.log.description,
            duration: action.log.duration,
            date: action.log.date
          }
      ]
      
    case "DELETE_LOG":
      let newState = state.filter(log => log.description !== action.description);
      return newState;

    case "LOAD_LOGS":
      return action.logs;
      

    default:
      return state
  }
}

export default logs
