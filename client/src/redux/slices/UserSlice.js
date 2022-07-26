import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  username: '',
  displayName: '',
  likedTweets: [],
  retweets: [],
  followings: [{ username: '' }],
  bookmarks: []
  // add profile pic later
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.username = action.payload.username
      state.displayName = action.payload.displayName
      state.likedTweets = action.payload.likedTweets
      state.retweets = action.payload.retweets
      state.followings = action.payload.followings
      state.bookmarks = action.payload.bookmarks
    },
    addLike: (state, action) => {
      state.likedTweets.push(action.payload.tweetID)
    },
    removeLike: (state, action) => {
      state.likedTweets = state.likedTweets.filter(i => {
        return i !== action.payload.tweetID
      })
    },
    addRetweet: (state, action) => {
      state.retweets.push(action.payload.tweetID)
    },
    removeRetweet: (state, action) => {
      state.retweets = state.retweets.filter(i => {
        return i !== action.payload.tweetID
      })
    },
    addFollowing: (state, action) => {
      state.followings.push({ username: action.payload.username })
    },
    removeFollowing: (state, action) => {
      state.followings = state.followings.filter(i => {
        return i.username !== action.payload.username
      })
    },
    addBookmark: (state, action) => {
      state.bookmarks.push(action.payload.tweetID)
    },
    removeBookmark: (state, action) => {
      state.bookmarks = state.bookmarks.filter(i => {
        return i !== action.payload.tweetID
      })
    }
  }
})

export const {
  addBookmark,
  addFollowing,
  addLike,
  addRetweet,
  removeBookmark,
  removeFollowing,
  removeLike,
  removeRetweet,
  setUser
} = UserSlice.actions
export default UserSlice.reducer
