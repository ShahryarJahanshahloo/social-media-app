import request from './axios'

export const PostCompose = data => {
  return request.post('/api/compose', data)
}

export const PostReply = data => {
  return request.post('/api/reply', data)
}

export const PatchLike = data => {
  return request.patch('/api/like', data)
}

export const PatchFollow = data => {
  return request.patch('/api/follow', data)
}

export const PostRetweet = data => {
  return request.post('/api/retweet', data)
}

export const GetSearch = (skip, query) => {
  return request.get('/api/search', {
    params: {
      skip,
      query
    }
  })
}

export const GetProfileInfo = username => {
  return request.get('/api/profileInfo', {
    params: {
      username
    }
  })
}

export const PostSignIn = data => {
  return request.post('/api/signin', data)
}

export const PostAuthenticate = data => {
  return request.post('/api/authenticate', data)
}

export const PostSignUp = data => {
  return request.post('/api/signup', data)
}

export const GetTweetInfo = tweetID => {
  return request.get('/api/tweetInfo', {
    params: {
      tweetID
    }
  })
}

export const GetUserInfo = () => {
  return request.get('/api/profileInfo')
}
