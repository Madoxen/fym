import React, { Fragment, useEffect, useState } from 'react'
import EditProfile from '../components/Profile/EditProfile'
import { IPost } from '../components/props/Interfaces'
import PostBoard from '../components/search/PostBoard'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getUsername } from '../features/login/loginReducer'
import { getAccessToken } from '../features/auth/selectors'


export const Profile: React.FC = () => {
    let history = useHistory();
    const dispatch = useDispatch();
    const username = useSelector(getUsername);
    const [user, setUser] = useState({
        "username": "",
        "profiledescription": "",
        "phone": "",
        "email": "",
        "tagids": []
    });

    const [userPosts, setUserPosts] = useState([]);


    useEffect(() => {
        //Fetch on mount
        fetch(process.env.REACT_APP_API_URL + '/users/' + username, {
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((r) => r.json())
            .then((r) =>
                setUser(r)
            )

        fetch(process.env.REACT_APP_API_URL + '/posts/' + username, {
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((r) => r.json())
            .then((r) =>
                setUserPosts(r)
            )

        return () => console.log('unmounting...');
    }, [])  // <-- add this empty array here





    const users = [
        user
    ]
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

    const getActivePost: Function = (post: IPost): void => {
        history.push({
            pathname: '/editPost',
            state: { post: post }
        })
    }

    return (
        <Fragment>
            <h1 style={{ textAlign: "center" }}>Edit Your Profile</h1>
            <EditProfile user={user} tags={tags}></EditProfile>
            <h1 style={{ textAlign: "center" }}>Your Post</h1>
            <PostBoard posts={userPosts} tags={tags} edit={getActivePost}></PostBoard>
        </Fragment>
    )
}
