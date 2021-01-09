import React from 'react'
import Post from './Post'

const PostBoard: React.FC = () => {

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
            "email": "Dog@bone.org"
        },
        {
            "userid": 2,
            "accountid": 2,
            "profiledescription": "Woff woff",
            "phone": "222 553 876",
            "email": "cat@cat.org"
        }
    ]
    
    return(
        <div>
            <Post post={posts[0]} tags={tags} users={users}/>
            <Post post={posts[1]} tags={tags} users={users}/>
            <Post post={posts[2]} tags={tags} users={users}/>
        </div>
    )
};
export default PostBoard