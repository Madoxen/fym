import React, { Fragment } from 'react'
import LoginModal from '../components/loginModal/LoginModal'
import Board from '../components/search/Board'

export const Home: React.FC = () => {

  return (
    <Fragment>
      <Board />
      <LoginModal />
    </Fragment>
  )
}
