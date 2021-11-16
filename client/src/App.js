import { useEffect } from 'react';
import { useHistory, BrowserRouter, Switch, Route } from 'react-router-dom'
import axios from "axios"
import { useDispatch } from 'react-redux';

import './App.css';
import "./components/home/main-app.css"
import "./components/home/tweetList.css"
import "./components/home/compose.css"
import "./components/home/login&signup.css"
import "./components/home/navbar.css"
import "./components/home/tweetCompact.css"
import "./components/home/tweetExtended.css"
import "./components/home/titleBar.css"

import Login from "./components/home/login"
import Signup from "./components/home/signup"
import Home from "./components/home/home"
import Bookmarks from "./components/home/bookmarks"
import Profile from './components/home/profile';
import Explore from "./components/home/explore"
import Redirect from './components/redirect';
import NoMatch404 from "./components/noMatch404"
import TweetExtended from './components/home/tweetExtended';

function App() {
  const jwt = localStorage.getItem("jwt")
  let history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (jwt !== null) {
      axios({
        method: "get",
        url: "/api/profileInfo",
        headers: {
          "Authorization": `Bearer ${jwt}`,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true
        },
      })
        .then((res) => {
          dispatch({
            type: "setUser",
            payload: {
              username: res.data.username,
              displayName: res.data.displayName,
            }
          })
          dispatch({
            type: "updateLoginStatus"
          })
        })
        .catch((e) => {
          history.push("/login")
        })
    }
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={Home} />
        <Route path="/bookmarks" component={Bookmarks}></Route>
        <Route path="/explore" component={Explore}></Route>
        <Route path="/tweet/:tweetID" component={TweetExtended}></Route>
        <Route path="/profile/:username" component={Profile}></Route>
        <Route exact path="/" component={Redirect} />
        <Route path="*" component={NoMatch404}></Route>
      </Switch>
    </div>
  )
}

export default App;