import { useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import './App.css'
import Layout from './layout/Layout'
import Login from './pages/Login/Login'
import Signup from './pages/SignUp/SignUp'
import Home from './pages/Home/Home'
import Bookmarks from './pages/Bookmarks/Bookmarks'
import Profile from './pages/Profile/Profile'
import Explore from './pages/Explore/Explore'
import Redirect from './pages/Redirect/Redirect'
import Page404 from './pages/404/Page404'
import ComposeExtended from './pages/Compose/Compose'
import TweetExtended from './pages/Tweet/Tweet'
import Following from './pages/Following/Following'
import Followers from './pages/Followers/Followers'
import { GetUserInfo } from './api/api'

function App() {
  const jwt = localStorage.getItem('jwt')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  })

  useEffect(() => {
    async function fetch() {
      const res = await GetUserInfo()
      if (res.status !== 200) return navigate('/login')
      const retweets = []
      for (const i of res.data.retweets) {
        retweets.push(i.retweetData)
      }
      dispatch({
        type: 'setUser',
        payload: {
          username: res.data.username,
          displayName: res.data.displayName,
          likedTweets: res.data.likes,
          retweets: retweets,
          followings: res.data.followings,
          bookmarks: res.data.bookmarks,
        },
      })
      dispatch({
        type: 'updateLoginStatus',
      })
    }
    if (!jwt) fetch()
  }, [])

  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/compose' element={<ComposeExtended />} />
        <Route element={<Layout />}>
          <Route path='/home' element={<Home />} />
          <Route path='/bookmarks' element={<Bookmarks />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/tweet/:tweetID' element={<TweetExtended />} />
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/following/:username' element={<Following />} />
          <Route path='/followers/:username' element={<Followers />} />
        </Route>
        <Route exact path='/' element={<Redirect />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </div>
  )
}

export default App
