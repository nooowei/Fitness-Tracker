// loading the user Array once retrieved from DB
const userArr = (state = [], action) => {
  switch (action.type) {
    case "LOAD":
      return action.userArr;
    default:
      return state
  }
}

export default userArr
