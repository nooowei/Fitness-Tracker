export const userSignIn = user => ({
  type: 'SIGN_IN',
  user
})

export const userSignOut = () => ({
  type: 'SIGN_OUT'
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

export const deleteLog = log => ({
  type: 'DELETE_LOG',
  log
})
