import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'semantic-ui-css/semantic.min.css'

import Register from './components/auth/register'
import Login from './components/auth/login'
import Reset from './components/auth/reset'

import { BrowserRouter as Router,Switch,Route} from 'react-router-dom'

const Root = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={App}/>
      <Route path = '/register' component={Register}/>
      <Route path = '/login' component={Login}/>
      <Route path = '/reset' component={Reset}/>
    </Switch>
  </Router>
)

ReactDOM.render(<Root/>, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
