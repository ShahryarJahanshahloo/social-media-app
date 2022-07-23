const initialState = {
  username: '',
  displayName: '',
  likedTweets: [],
  retweets: [],
  followings: [{ username: '' }],
  bookmarks: [],
  // add profile pic later
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setUser': {
      return {
        ...state,
        username: action.payload.username,
        displayName: action.payload.displayName,
        likedTweets: action.payload.likedTweets,
        retweets: action.payload.retweets,
        followings: action.payload.followings,
        bookmarks: action.payload.bookmarks,
      }
    }
    case 'addLike': {
      const likedTweets = [...state.likedTweets]
      likedTweets.push(action.payload.tweetID)
      return {
        ...state,
        likedTweets,
      }
    }
    case 'removeLike': {
      return {
        ...state,
        likedTweets: state.likedTweets.filter(i => {
          return i != action.payload.tweetID
        }),
      }
    }
    case 'addRetweet': {
      const retweets = [...state.retweets]
      retweets.push(action.payload.tweetID)
      return {
        ...state,
        retweets,
      }
    }
    case 'removeRetweet': {
      return {
        ...state,
        retweets: state.retweets.filter(i => {
          return i != action.payload.tweetID
        }),
      }
    }
    case 'addFollowing': {
      const followings = [...state.followings]
      followings.push({ username: action.payload.username })
      return {
        ...state,
        followings,
      }
    }
    case 'removeFollowing': {
      return {
        ...state,
        followings: state.followings.filter(i => {
          return i.username != action.payload.username
        }),
      }
    }
    case 'addBookmark': {
      const bookmarks = [...state.bookmarks]
      bookmarks.push(action.payload.tweetID)
      return {
        ...state,
        bookmarks,
      }
    }
    case 'removeBookmark': {
      return {
        ...state,
        bookmarks: state.bookmarks.filter(i => {
          return i != action.payload.tweetID
        }),
      }
    }
    default:
      return state
  }
}

export default reducer
