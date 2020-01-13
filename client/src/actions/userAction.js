export const userSignIn = user => ({
  type: 'SIGN_IN',
  user
})

export const userSignOut = user => ({
  type: 'SIGN_OUT',
  user
})

export const userRegister = user => ({
  type: 'REGISTER',
  user
})

export const loadUsers = users => ({
  type: 'LOAD_USERS',
  users
})

export const loadLogs = logs => ({
  type: 'LOAD_LOGS',
  logs
})

export const createLog = log => ({
  type: 'CREATE_LOG',
  log
})

export const editLog = log => ({
  type: 'EDIT_LOG',
  log
})
