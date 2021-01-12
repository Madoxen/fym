import React, { useState, useEffect } from 'react'
import TagPanel from '../tags/TagPanel';
import PostBoard from './PostBoard'
import UserBoard from './UserBoard'
import { ITags, IPost } from '../props/Interfaces'
import { Button, ButtonGroup } from 'react-bootstrap';
import { http } from '../api/http';

const Board: React.FC = () => {

    const [searchMode, setSearchMode] = useState<boolean>(true);
    const [activeTags, setActiveTags] = useState<ITags[]>([]);
    const [tags, setTags] = useState<ITags[]>([]);
    const [posts, setPosts] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        let tab: ITags[] = await http<ITags[]>("https://api.fymate.co/tags");
        setTags(tab);
        console.log(tags);

        //fetch some posts and users
        fetch(process.env.REACT_APP_API_URL + '/users', {
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((r) => r.json())
            .then((r) => {
                setUsers(r)
            })


        //fetch some posts and users
        fetch(process.env.REACT_APP_API_URL + '/posts', {
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((r) => r.json())
            .then((r) => {
                setPosts(r)
            })
    }

    const getActiveTags: Function = (tags: ITags[]): void => {
        setActiveTags(tags);
    }

    return (
        <div>
            <ButtonGroup aria-label="Basic example" className="d-flex justify-content-center mt-3">
                <Button variant={searchMode ? "secondary" : "primary"} onClick={() => setSearchMode(false)} onMouseDown={(e) => e.preventDefault()}>Users</Button>
                <Button variant={searchMode ? "primary" : "secondary"} onClick={() => setSearchMode(true)} onMouseDown={(e) => e.preventDefault()}>Posts</Button>
            </ButtonGroup>
            <TagPanel tags={tags} updateTags={getActiveTags} active={activeTags} />
            {
                searchMode
                    ? <PostBoard users={users} tags={tags} posts={posts} filtr={activeTags} edit={(post: IPost) => console.log(`${post.title}`)} />
                    : <UserBoard users={users} tags={tags} filtr={activeTags} />
            }


        </div>
    )
};
export default Board