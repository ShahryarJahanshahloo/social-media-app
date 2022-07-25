import { useEffect } from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import axios from 'axios'
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

function App() {
  const jwt = localStorage.getItem('jwt')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const appHeight = () =>
    document.documentElement.style.setProperty(
      '--app-height',
      `${window.innerHeight}px`
    )
  window.addEventListener('resize', appHeight)
  appHeight()

  useEffect(() => {
    if (jwt !== null) {
      axios({
        method: 'get',
        url: '/api/userInfo',
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then(res => {
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
        })
        .catch(e => {
          navigate('/login')
        })
    }
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
