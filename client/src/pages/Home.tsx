import React, { Fragment } from 'react'
import Counter from '../components/counter/Counter'
import LoginModal from '../components/loginModal/LoginModal'
import PostBoard from '../components/search/PostBoard'

export const Home: React.FC = () => {
  return (
    <Fragment>
      <PostBoard/>
      <LoginModal />
    </Fragment>
  )
}
