// libs
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// components
import { Header } from './components'
import { Login } from './pages'

// others
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Post />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
