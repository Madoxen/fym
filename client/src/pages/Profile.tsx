import React, { Fragment, useEffect, useState } from 'react'
import EditProfile from '../components/Profile/EditProfile'
import { IPost } from '../components/props/Interfaces'
import PostBoard from '../components/search/PostBoard'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getUsername } from '../features/login/loginReducer'
import { getAccessToken } from '../features/auth/selectors'


export const Profile: React.FC = () => {
    let history = useHistory();

    const username = useSelector(getUsername);
    const [user, setUser] = useState({
        "username": "",
        "profiledescription": "",
        "phone": "",
        "email": "",
        "tagids": []
    });

    const [userPosts, setUserPosts] = useState<IPost[]>([]);
    const acc = useSelector(getAccessToken);


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


    useEffect(() => {
        setUserPosts(userPosts);
      }, [userPosts]);

    const users = [
        user
    ]

    const getActivePost: Function = (post: IPost): void => {
        history.push({
            pathname: '/editPost',
            state: { post: post }
        })
    }


    const deletePost: Function = (post: IPost): void => {

        fetch(process.env.REACT_APP_API_URL + '/posts/' + username + "/" + post.postid, {
            method: 'DELETE',
            headers: {
                Authorization: "Bearer " + acc,
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((r) => {
                console.log(r.status)
                if (r.ok) {
                    return r.json();
                }
                else {
                    throw r.statusText
                }
            })
            .then((r) =>
                //200 received, body transpiled to object
                { 
                    
                }
            )
            .catch(
                //failure like CORS or other exceptions
                r => { })
    }

    return (
        <Fragment>
            <h1 style={{ textAlign: "center" }}>Edit Your Profile</h1>
            <EditProfile user={user}></EditProfile>
            <h1 style={{ textAlign: "center" }}>Your Post</h1>
            <PostBoard posts={userPosts} edit={getActivePost} del={deletePost}></PostBoard>
        </Fragment>
    )
}
