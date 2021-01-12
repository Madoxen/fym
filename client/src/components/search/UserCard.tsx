import React from 'react'
import { Card } from 'react-bootstrap'
import { ITags,IUser } from '../props/Interfaces'
import TagList from '../tags/TagList'

interface Props {
    tags: ITags[];
    user: IUser;
}

const UserCard: React.FC<Props> = ({tags,user}) => {

    return(
        <Card >
            <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Subtitle><TagList tagids={user.tagids} tags={tags}/></Card.Subtitle>
                <Card.Text>{user.profiledescription}</Card.Text>
                <Card.Link href="#">{user.phone} {user.email}</Card.Link>
            </Card.Body>
        </Card>
    )
};
export default UserCard