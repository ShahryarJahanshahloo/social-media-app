const initialState = {
    username: "",
    displayName: "",
    likedTweets: [],
    retweets: [],
    // add profile pic later
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "setUser": {
            return {
                ...state,
                username: action.payload.username,
                displayName: action.payload.displayName,
                likedTweets: action.payload.likedTweets,
                retweets: action.payload.retweets,
            }
        }
        case "addLike" : {
            const likedTweets = [...state.likedTweets]
            likedTweets.push(action.payload.tweetID)
            return {
                ...state,
                likedTweets
            }
        }
        case "removeLike" : {
            return {
                ...state,
                likedTweets: state.likedTweets.filter((i) => {
                    return i != action.payload.tweetID
                })
            }
        }
        case "addRetweet" : {
            const retweets = [...state.retweets]
            retweets.push(action.payload.tweetID)
            return {
                ...state,
                retweets
            }
        }
        case "removeRetweet" : {
            return {
                ...state,
                retweets: state.retweets.filter((i) => {
                    return i != action.payload.tweetID
                })
            }
        }
        default:
            return state
    }
}

export default reducer