import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { IPost,ITags,IUser } from '../props/Interfaces'
import TagList from '../tags/TagList'


interface Props {
    post: IPost;
    tags: ITags[];
    users: IUser[];
    edit?: Function;
}

const Post: React.FC<Props> = ({post,tags,users,edit}) => {


    const postUser: Function = (): JSX.Element[] => 
    {
        let userArray:JSX.Element[] = [];
        users.forEach(user => user.userid === post.userid ? userArray.push(<span key={user.userid}> Email: {user.email} <br/> Phone: {user.phone} </span>): null);
        return userArray;
    }

    return(
        <Card >
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <TagList tagids={post.tagids} tags={tags} />
                <Card.Text className="mt-2">
                    {post.content}<br/>
                    {postUser()}<br/>
                    {edit !== undefined ? <Button size="sm" onClick={() => edit(post)}>Edit</Button> : null}
                </Card.Text>
            </Card.Body>
        </Card>
    )
};
export default Post