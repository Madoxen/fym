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
        users.forEach(user => user.userid === post.userid ? userArray.push(<span key={user.userid}> {user.email} {user.phone} </span>): null);
        return userArray;
    }

    return(
        <Card >
            <Card.Body>
                <Card.Title>{post.title}</Card.Title>
                <Card.Subtitle><TagList tagids={post.tagids} tags={tags} /></Card.Subtitle>
                <Card.Text>{post.content}</Card.Text>
                <Card.Link href="#">{postUser()}</Card.Link>
                <br/>
                {edit !== undefined ? <Button onClick={() => edit()}>Edit</Button> : null}
            </Card.Body>
        </Card>
    )
};
export default Post