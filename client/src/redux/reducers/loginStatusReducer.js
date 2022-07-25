const initialState = {
  loggedIn: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'updateLoginStatus':
      return {
        loggedIn: true
      }
    default:
      return state
  }
}

export default reducer
