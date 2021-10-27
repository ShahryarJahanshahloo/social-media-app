const initialState = {
    username: "mamad",
    displayName: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "setUser":
            return {
                username: action.payload.username,
                displayName: action.payload.displayName,
                ...state
            }
        default:
            return state
    }
}

export default reducer