import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Register } from './pages/Register'
import { AddPost } from './pages/AddPost'
import { Login } from './pages/Login'
import { EditPost } from './pages/EditPost'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/profile" component={Profile} />
          <Route path="/addPost" component={AddPost} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/editPost" component={EditPost} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
