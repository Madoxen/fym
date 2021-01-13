import React, { useState, useEffect } from 'react'
import TagPanel from '../tags/TagPanel';
import PostBoard from './PostBoard'
import UserBoard from './UserBoard'
import { ITags, IPost, IUser } from '../props/Interfaces'
import { Button, ButtonGroup } from 'react-bootstrap';
import { fetchFunction } from '../api/FetchFunction';

const Board: React.FC = () => {

    const [searchMode, setSearchMode] = useState<boolean>(true);
    const [activeTags, setActiveTags] = useState<ITags[]>([]);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [users, setUsers] = useState<IUser[]>([]);
    const [postOffset, setPostOffset] = useState(0);
    const [userOffset, setUserOffset] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        fetchFunction(`/users?start=${userOffset}&limit=1`, setUsers);
        fetchFunction(`/posts?start=${postOffset}&limit=1`, setPosts);
        setPostOffset(postOffset + 1);
        setUserOffset(userOffset + 1);
    }

    const getActiveTags: Function = (tags: ITags[]): void => {
        setActiveTags(tags);
    }

    const addPosts = (r: any) => {
        let arr: IPost[] = [...posts, ...r];
        setPosts(arr);
    }
    const addUsers = (r: any) => {
        let arr: IUser[] = [...users, ...r];
        setUsers(arr);
    }


    const showMore = () => {
        if (searchMode) {
            fetchFunction(`/posts?start=${postOffset}&limit=1`, addPosts);
            setPostOffset(postOffset + 1);
        } else {
            fetchFunction(`/users?start=${userOffset}&limit=1`, addUsers);
            setUserOffset(userOffset + 1);
        }
    }

    return (
        <div>
            <ButtonGroup aria-label="Basic example" className="d-flex justify-content-center mt-3">
                <Button variant={searchMode ? "secondary" : "primary"} onClick={() => setSearchMode(false)} onMouseDown={(e) => e.preventDefault()}>Users</Button>
                <Button variant={searchMode ? "primary" : "secondary"} onClick={() => setSearchMode(true)} onMouseDown={(e) => e.preventDefault()}>Posts</Button>
            </ButtonGroup>
            <TagPanel updateTags={getActiveTags} />
            {
                searchMode
                    ? <PostBoard posts={posts} filtr={activeTags} />
                    : <UserBoard users={users} filtr={activeTags} />
            }
            <div className="d-flex justify-content-center">
                <Button onClick={showMore} onMouseDown={(e) => e.preventDefault()}>Show More</Button>
            </div>


        </div>
    )
};
export default Board