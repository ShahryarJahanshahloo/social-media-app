import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedIn: false
}

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    login: (state, action) => {
      state.loggedIn = true
    }
  }
})

export const { login } = LoginSlice.actions
export default LoginSlice.reducer
