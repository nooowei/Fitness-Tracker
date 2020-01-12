// import DatePicker from 'react-datepicker';
// initial state for userID should be an empty string
// the action.id here is set by the actions.js
let initialLog = []
const log = (state = initialLog, action) => {
  switch (action.type) {
    case "CREATE_LOG":
      return {
        [...state,
        username: action.log.username,
        description: action.log.description,
        duration: action.log.duration,
        date: action.log.date
        ]
      }

    case "EDIT_LOG":
      return {
        [...state,
        username: action.log.username,
        description: action.log.description,
        duration: action.log.duration,
        date: action.log.date
        ]
      }

    case "LOAD_LOGS":
      return {
        action.logs;
      }

    default:
      return state
  }
}

export default log
