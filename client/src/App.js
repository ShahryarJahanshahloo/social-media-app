import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './App.css';

import Login from "./components/login/login"
import Signup from "./components/signup/signup"
import Home from "./components/home/home"
import Bookmarks from "./components/home/bookmarks"
import Explore from "./components/home/explore"
import Redirect from './components/redirect';

function App() {

  return (
    <BrowserRouter>
      <div className="App">

        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/home" component={Home} />
          <Route path="/bookmarks" component={Bookmarks}></Route>
          <Route path="/profile"></Route>
          <Route path="/explore" component={Explore}></Route>
          <Route path="/tweet"></Route>
          <Route exact path="/" component={Redirect} />
          {/* add 404 here! */}
        </Switch>

      </div>
    </BrowserRouter>
  )
}



export default App;
