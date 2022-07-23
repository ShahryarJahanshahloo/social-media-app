import { useEffect } from 'react'
import { useHistory, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import './App.css'
import './components/home.css'
import './components/tweetList.css'
import './components/composeCompact.css'
import './components/login&signup.css'
import './components/navbar.css'
import './components/tweetCompact.css'
import './components/tweetExtended.css'
import './components/topBar.css'
import './components/composeExtended.css'
import './components/profile.css'
import './components/explore.css'
import './components/userCompact.css'
import './components/userList.css'
import './components/followSuggestion.css'

import Login from './components/login'
import Signup from './components/signup'
import Home from './components/home'
import Bookmarks from './components/bookmarks'
import Profile from './components/profile'
import Explore from './components/explore'
import Redirect from './components/redirect'
import NoMatch404 from './components/noMatch404'
import ComposeExtended from './components/composeExtended'
import TweetExtended from './components/tweetExtended'
import Following from './components/following'
import Followers from './components/followers'

function App() {
  const jwt = localStorage.getItem('jwt')
  let history = useHistory()
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
          history.push('/login')
        })
    }
  }, [])

  return (
    <div className='App'>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/home' component={Home} />
        <Route path='/bookmarks' component={Bookmarks}></Route>
        <Route path='/explore' component={Explore}></Route>
        <Route path='/compose' component={ComposeExtended}></Route>
        <Route path='/tweet/:tweetID' component={TweetExtended}></Route>
        <Route path='/profile/:username' component={Profile}></Route>
        <Route path='/following/:username' component={Following}></Route>
        <Route path='/followers/:username' component={Followers}></Route>
        <Route exact path='/' component={Redirect} />
        <Route path='*' component={NoMatch404}></Route>
      </Switch>
    </div>
  )
}

export default App
