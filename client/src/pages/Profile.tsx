import React, { Fragment, useEffect, useState } from 'react'
import EditProfile from '../components/Profile/EditProfile'
import { IPost, ITags } from '../components/props/Interfaces'
import PostBoard from '../components/search/PostBoard'
import { useHistory } from 'react-router-dom'
import { http } from '../components/api/http'
import { useDispatch, useSelector } from 'react-redux'
import { getUsername } from '../features/login/loginReducer'


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
    const [tags, setTags] = useState<ITags[]>([])
    //TAGS
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let tab: ITags[] = await http<ITags[]>("https://api.fymate.co/tags");
        setTags(tab);
        console.log(tags);
    }

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
            <PostBoard posts={userPosts} users={users} tags={tags} edit={getActivePost}></PostBoard>
        </Fragment>
    )
}
