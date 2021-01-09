import React, { Fragment } from 'react'
import Counter from '../components/counter/Counter'
import LoginModal from '../components/loginModal/LoginModal'
import PostBoard from '../components/search/PostBoard'
import UserBoard from '../components/search/UserBoard'

export const Home: React.FC = () => {

  const posts = [
    {
        "postid": 13,
        "userid": 3,
        "content": "1 Yes this is another post like that :D",
        "title": "1 Anotha one",
        "tagids": [
            2
        ]
    },
    {
        "postid": 14,
        "userid": 2,
        "content": "2 Yes this is another post like that :D",
        "title": "2 Anotha one",
        "tagids": [
            2
        ]
    },
    {
        "postid": 15,
        "userid": 2,
        "content": "3 Yes this is another post like that :D",
        "title": "3 Anotha one",
        "tagids": [
            1,
            2
        ]
    }
]
const tags = [
    {
        "tagid": 1,
        "name": "Programista"
    },
    {
        "tagid": 2,
        "name": "Grafik"
    }
]
const users = [
    {
        "userid": 3,
        "accountid": 3,
        "profiledescription": "Bark bark",
        "phone": "111 111 111",
        "email": "Dog@bone.org",
        "tagids": [2]
    },
    {
        "userid": 2,
        "accountid": 2,
        "profiledescription": "Woff woff",
        "phone": "222 553 876",
        "email": "cat@cat.org",
        "tagids": [1,2]
    }
]

  return (
    <Fragment>
      <PostBoard users={users} tags={tags} posts={posts}/>
      <UserBoard users={users} tags={tags} />
      <LoginModal />
    </Fragment>
  )
}
