import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { IPost, IUser } from '../props/Interfaces'
import TagList from '../tags/TagList'
import { fetchFunction } from '../api/FetchFunction';


interface Props {
    post: IPost;
    edit?: Function;
    del?: Function;
}

const Post: React.FC<Props> = ({ post, edit, del }) => {

    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        fetchFunction(`/users/${post.username}`, setUser);
    }, []);

    return (
        <Card >
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <TagList tagids={post.tagids} />
                <Card.Text className="m-2">
                    {post.content}<br />
                    {user !== undefined ? <span > Email: {user.email} <br /> Phone: {user.phone} </span> : null}<br />
                    {edit !== undefined ? <Button variant="outline-success" size="sm" onClick={() => edit(post)}>Edit</Button> : null}
                    {del !== undefined ? <Button variant="outline-danger" size="sm" onClick={() => del(post)}>Delete</Button> : null}
                </Card.Text>
            </Card.Body>
        </Card>
    )
};
export default Post