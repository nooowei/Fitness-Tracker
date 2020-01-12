import { combineReducers } from 'redux'
import user from './userReducer'
import log from './logReducer'
import userArr from './userArrReducer'

//ES6 syntax, by naming the reducer the same as the content it is managing
// let user from ./userReducer manage state.user
// let log from logReducer manage state.log
export default combineReducers({
  userArr,
  user,
  log
});
