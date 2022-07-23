import { combineReducers } from 'redux'

import userReducer from './reducers/userReducer'
import loginStatusReducer from './reducers/loginStatusReducer'

const rootReducer = combineReducers({
  userReducer,
  loginStatusReducer,
})

export default rootReducer
