import { configureStore } from '@reduxjs/toolkit'
import LoginSlice from './slices/LoginSlice.js'
import UserSlice from './slices/UserSlice.js'

export default configureStore({
  reducer: {
    user: UserSlice,
    login: LoginSlice
  }
})
