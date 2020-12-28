import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { Navigation } from './components/Navigation'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
<<<<<<< HEAD
import { Profile } from './pages/Profie'
=======
>>>>>>> 26af0e751f9663eb7fd5fc2966f4c6e312fec657

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="container">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/about" component={About} />
          <Route path="/register" component={Register} />
<<<<<<< HEAD
          <Route path="/profile" component={Profile} />
=======
>>>>>>> 26af0e751f9663eb7fd5fc2966f4c6e312fec657
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App
