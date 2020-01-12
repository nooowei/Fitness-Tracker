// import DatePicker from 'react-datepicker';
// initial state for userID should be an empty string
// the action.id here is set by the actions.js
let initialLog = {
  username: '',
  description: '',
  duration: 0,
  date: '',
}
const log = (state = initialLog, action) => {
  switch (action.type) {
    case "CREATE_LOG":
      return {
        username: action.log.username,
        description: action.log.description,
        duration: action.log.duration,
        date: action.log.date,
      }

    case "EDIT_LOG":
      return {
        username: action.log.username,
        description: action.log.description,
        duration: action.log.duration,
        date: action.log.date,
      }

    default:
      return state
  }
}

export default log
