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


    const getActiveTags: Function = (tags: ITags[]): void=> {

        console.log(tags);
    }

    return(
        <div>
            <TagPanel tags={tags} updateTags={getActiveTags}/>
            <Post post={posts[0]} tags={tags} users={users}/>
            <Post post={posts[1]} tags={tags} users={users}/>
            <Post post={posts[2]} tags={tags} users={users}/>
        </div>
    )
};
export default PostBoard