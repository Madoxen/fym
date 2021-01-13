import React from 'react'
import { Card } from 'react-bootstrap'
import { IUser } from '../props/Interfaces'
import TagList from '../tags/TagList'

interface Props {
    user: IUser;
}

const UserCard: React.FC<Props> = ({ user }) => {

    return (
        <Card >
            <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Subtitle><TagList tagids={user.tagids} /></Card.Subtitle>
                <Card.Text>{user.profiledescription}</Card.Text>
                <Card.Link href="#">{user.phone} {user.email}</Card.Link>
            </Card.Body>
        </Card>
    )
};
export default UserCard