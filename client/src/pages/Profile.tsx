import React, { Fragment } from 'react'
import EditProfile from '../components/Profile/EditProfile'
import PostBoard from '../components/search/PostBoard'

export const Profile: React.FC = () => {
    //need current user 
    const user = {
        "userid": 2,
        "accountid": 3,
        "profiledescription": "Hej im derek and i taste like serek",
        "phone": "111 222 111",
        "email": "derek@serek.com",
        "tagIDs": [1, 2]
    }

    //TAGS
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

    const UserPosts = [
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
    return (
        <Fragment>
            <h1 style={{ textAlign: "center" }}>Edit Your Profile</h1>
            <EditProfile user={user} tags={tags}></EditProfile>
            <h1 style={{ textAlign: "center" }}>Your Post</h1>
            <PostBoard></PostBoard>
        </Fragment>
    )
}
