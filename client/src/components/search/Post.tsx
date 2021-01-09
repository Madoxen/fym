import React from 'react'
import { Card } from 'react-bootstrap'
import { IPost,ITags,IUser } from '../props/Interfaces'


interface Props {
    post: IPost;
    tags: ITags[];
    users: IUser[];
}

const Post: React.FC<Props> = ({post,tags,users}) => {


    const postTags: Function = (): JSX.Element[] => 
    {
        let tagArray:JSX.Element[] = [];
        post.tagids.forEach(tagId => tagArray.push(
            <span key={tagId}> {tagOfId(tagId)} </span>
            ));
        return tagArray;
    }

    const tagOfId: Function = (id: number): string =>
    {
        let tagName:string = "";
        tags.forEach(tag => tag.tagid === id ? tagName = tag.name : null);
        return tagName;
    }

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
                <Card.Subtitle>{postTags()}</Card.Subtitle>
                <Card.Text>{post.content}</Card.Text>
                <Card.Link href="#">{postUser()}</Card.Link>
            </Card.Body>
        </Card>
    )
};
export default Post