import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Register } from './pages/Register'
import { AddPost } from './pages/AddPost'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/addPost" component={AddPost} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
