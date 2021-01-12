import React, { Fragment, useEffect, useState } from 'react'
import EditProfile from '../components/Profile/EditProfile'
import { IPost, ITags } from '../components/props/Interfaces'
import PostBoard from '../components/search/PostBoard'
import { useHistory } from 'react-router-dom'
import { http } from '../components/api/http'


export const Profile: React.FC = () => {
    let history = useHistory();
    //need current user 
    //user
    const user = {
        "userid": 2,
        "accountid": 3,
        "profiledescription": "Hej im derek and i taste like serek",
        "phone": "111 222 111",
        "email": "derek@serek.com",
        "tagids": [1, 2]
    }
    const users = [
        {
            "userid": 2,
            "accountid": 3,
            "profiledescription": "Hej im derek and i taste like serek",
            "phone": "111 222 111",
            "email": "derek@serek.com",
            "tagids": [1, 2]
        }
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
            <PostBoard posts={UserPosts} users={users} tags={tags} edit={getActivePost}></PostBoard>
        </Fragment>
    )
}
