import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap'
import { IPost,ITags,IUser } from '../props/Interfaces'
import TagList from '../tags/TagList'
import { fetchFunction } from '../api/FetchFunction';


interface Props {
    post: IPost;
    tags: ITags[];
    edit?: Function;
}

const Post: React.FC<Props> = ({post,tags,edit}) => {

    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        fetchFunction(`/users/${post.username}`, setUser);
    }, []);

    return(
        <Card >
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <TagList tagids={post.tagids} tags={tags} />
                <Card.Text className="mt-2">
                    {post.content}<br/>
                    {user !== undefined ? <span > Email: {user.email} <br/> Phone: {user.phone} </span>:null}<br/>
                    {edit !== undefined ? <Button size="sm" onClick={() => edit(post)}>Edit</Button> : null}
                </Card.Text>
            </Card.Body>
        </Card>
    )
};
export default Post