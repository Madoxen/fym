import React from 'react'
import { IPost, ITags,IUser } from '../props/Interfaces'
import Post from './Post'
import TagPanel from '../tags/TagPanel'

interface Props{
    users: IUser[];
    tags: ITags[];
    posts: IPost[];
}

const PostBoard: React.FC<Props> = ({users,tags,posts}) => {

    return(
        <div>
            <Post post={posts[0]} tags={tags} users={users} edit={() => console.log("Edit")}/>
            <Post post={posts[1]} tags={tags} users={users}/>
            <Post post={posts[2]} tags={tags} users={users}/>
        </div>
    )
};
export default PostBoard