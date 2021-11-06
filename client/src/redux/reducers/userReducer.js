const initialState = {
    username: "",
    displayName: "",
    // add profile pic later
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "setUser": {
            return {
                ...state,
                username: action.payload.username,
                displayName: action.payload.displayName,
            }
        }
        default:
            return state
    }
}

export default reducer