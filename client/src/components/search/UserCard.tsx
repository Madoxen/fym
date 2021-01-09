import React from 'react'
import { Card } from 'react-bootstrap'
import { ITags,IUser } from '../props/Interfaces'

interface Props {
    tags: ITags[];
    user: IUser;
}

const UserCard: React.FC<Props> = ({tags,user}) => {

    return(
        <Card >
            <Card.Body>
                <Card.Title>Username {user.userid}</Card.Title>
                <Card.Subtitle></Card.Subtitle>
                <Card.Text>{user.profiledescription}</Card.Text>
                <Card.Link href="#">{user.phone} {user.email}</Card.Link>
            </Card.Body>
        </Card>
    )
};
export default UserCard