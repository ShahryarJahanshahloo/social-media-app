import { useEffect, useState } from "react"
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'

import './App.css';

import Login from "./components/login-page/login"
import Signup from "./components/signup-page/signup"
import Home from "./components/main-app/home"

function App() {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch("/api/ping")
      .then((res) => res.json())
      .catch((e) => console.log(e))
      .then((data) => {
        setData(data.ping)
      })
      .catch((e) => console.log(e))
  }, [])

  return (
    <BrowserRouter>
      <div className="App">

        <p>{!data ? "Loading" : data}</p>

        <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/home" component={Home}/>
          <Redirect from="/" to="/login"/>
        </Switch>

      </div>
    </BrowserRouter>
  )
}

export default App;
