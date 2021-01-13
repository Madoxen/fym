import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { Home } from './pages/Home'
import { Profile } from './pages/Profile'
import { Register } from './pages/Register'
import { AddPost } from './pages/AddPost'
import { Login } from './pages/Login'
import { EditPost } from './pages/EditPost'
import { useDispatch } from 'react-redux'
import { replaceTags } from './features/tags/tagsReducer'

const App: React.FC = () => {

  const dispatch = useDispatch()

  fetch(process.env.REACT_APP_API_URL + "/tags").then(r => {
    console.log(r.status);
    if (r.ok) {
      return r.json()
    }
    else {
      //Fatal error app should not start?
    }
  }).then(r => dispatch(replaceTags(r)));

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
