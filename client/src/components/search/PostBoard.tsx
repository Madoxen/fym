import React from 'react'
import { IPost, ITags,IUser } from '../props/Interfaces'
import Post from './Post'
import TagPanel from '../tags/TagPanel'

interface Props{
    users: IUser[];
    tags: ITags[];
    posts: IPost[];
    filtr: ITags[];
}

const PostBoard: React.FC<Props> = ({users,tags,posts,filtr}) => {

    const listPosts: Function = (): JSX.Element[] => 
    {
        let postArr: IPost[] = []
        let postJSX: JSX.Element[] = []
        if(filtr.length !== 0) 
        {
            posts.forEach(post => haveTag(post,filtr) ? postArr.push(post) : null);
            postArr.sort((a,b) => countUserTags(b) - countUserTags(a));
        }
        else
        {
            posts.forEach(post => postArr.push(post));
        }
        postArr.forEach(post => postJSX.push(<Post tags={tags} post={post} users={users}/>));
        return postJSX;
    }

    const haveTag: Function = (post:IPost,tags:ITags[]): boolean => 
    {
        let have = false;
        post.tagids.forEach(tagId => 
            tags.forEach(tag => 
                tag.tagid === tagId ? have = true : null)
            );
        return have;
    }

    const countUserTags: Function = (post: IPost): number =>
    {
        let counter = 0;
        filtr.forEach(tag => post.tagids.includes(tag.tagid) ? counter++ : null)
        return counter;
    }

    return(<div>{listPosts()}</div>)
    //How call edit function 
    //<Post post={posts[0]} tags={tags} users={users} edit={() => console.log("Edit")}/>
};
export default PostBoard