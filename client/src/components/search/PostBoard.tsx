import React from 'react'
import { IPost, ITags, IUser } from '../props/Interfaces'
import Post from './Post'

interface Props {
    users: IUser[];
    tags: ITags[];
    posts: IPost[];
    filtr?: ITags[];
    edit?: Function;
}

const PostBoard: React.FC<Props> = ({ users, tags, posts, filtr, edit }) => {

    const listPosts: Function = (): JSX.Element[] => {
        let postArr: IPost[] = []
        let postJSX: JSX.Element[] = []
        if (filtr !== undefined) {
            if (filtr.length !== 0) {
                posts.forEach(post => haveTag(post, filtr) ? postArr.push(post) : null);
                postArr.sort((a, b) => countUserTags(b) - countUserTags(a));
            } else {
                posts.forEach(post => postArr.push(post));
            }
        }
        else {
            posts.forEach(post => postArr.push(post));
        }
        postArr.forEach(post => edit === undefined
            ? postJSX.push(<Post key={post.postid} tags={tags} post={post} users={users} />)
            : postJSX.push(<Post key={post.postid} tags={tags} post={post} users={users} edit={edit} />)
        );
        return postJSX;
    }

    const haveTag: Function = (post: IPost, tags: ITags[]): boolean => {
        let have = false;
        post.tagids.forEach(tagId =>
            tags.forEach(tag =>
                tag.tagid === tagId ? have = true : null)
        );
        return have;
    }

    const countUserTags: Function = (post: IPost): number => {
        let counter = 0;
        if (filtr === undefined) return 0;
        filtr.forEach(tag => post.tagids.includes(tag.tagid) ? counter++ : null)
        return counter;
    }

    return (<div>{listPosts()}</div>)
};
export default PostBoard