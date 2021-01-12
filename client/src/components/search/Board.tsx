import React, { useState, useEffect } from 'react'
import TagPanel from '../tags/TagPanel';
import PostBoard from './PostBoard'
import UserBoard from './UserBoard'
import { ITags, IPost, IUser } from '../props/Interfaces'
import { Button, ButtonGroup } from 'react-bootstrap';
import { http } from '../api/http';

const Board: React.FC = () => {

    const [searchMode, setSearchMode] = useState<boolean>(true);
    const [activeTags, setActiveTags] = useState<ITags[]>([]);
    const [tags, setTags] = useState<ITags[]>([]);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [postLimiter, setPostLimiter] = useState(0);
    const [userLimiter, setUserLimiter] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {

        fetchFunction('/tags', setTags);
        fetchFunction(`/users?start=${userLimiter}&limit=1`, setUsers);
        fetchFunction(`/posts?start=${postLimiter}&limit=1`, setPosts);
        setPostLimiter(postLimiter+1);
        setUserLimiter(userLimiter+1);
    }

    const fetchFunction = (url:string, setFun:Function) => 
    {
        fetch(process.env.REACT_APP_API_URL + url, {
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((r) => r.json())
            .then((r) => {
                setFun(r)
            })
    }

    const getActiveTags: Function = (tags: ITags[]): void => {
        setActiveTags(tags);
    }

    const addPosts = (r:any) => {
        let arr:IPost[] = [...posts,...r];
        setPosts(arr);
    }
    const addUsers = (r:any) => {
        let arr:IUser[] = [...users,...r];
        setUsers(arr);
    }


    const showMore = () => 
    {
        if(searchMode)
        {
            fetchFunction(`/posts?start=${postLimiter}&limit=1`, addPosts);
            setPostLimiter(postLimiter+1);
        }else{
            fetchFunction(`/users?start=${userLimiter}&limit=1`, addUsers);
            setUserLimiter(userLimiter+1);
        }
    }

    return (
        <div>
            <ButtonGroup aria-label="Basic example" className="d-flex justify-content-center mt-3">
                <Button variant={searchMode ? "secondary" : "primary"} onClick={() => setSearchMode(false)} onMouseDown={(e) => e.preventDefault()}>Users</Button>
                <Button variant={searchMode ? "primary" : "secondary"} onClick={() => setSearchMode(true)} onMouseDown={(e) => e.preventDefault()}>Posts</Button>
            </ButtonGroup>
            <TagPanel tags={tags} updateTags={getActiveTags} active={[1,2]} />
            {
                searchMode
                    ? <PostBoard users={users} tags={tags} posts={posts} filtr={activeTags} edit={(post: IPost) => console.log(`${post.title}`)} />
                    : <UserBoard users={users} tags={tags} filtr={activeTags} />
            }
            <div className="d-flex justify-content-center">
                <Button  onClick={showMore} onMouseDown={(e) => e.preventDefault()}>Show More</Button>
            </div>
            

        </div>
    )
};
export default Board