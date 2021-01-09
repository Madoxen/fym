import React from 'react'
import { IUser,ITags } from '../props/Interfaces'
import UserCard from './UserCard'

interface Props{
    users: IUser[];
    tags: ITags[];
}
const UserBoard: React.FC<Props> = ({users,tags}) => {

    return(
        <div>
            <UserCard tags={tags} user={users[0]}/>
            <UserCard tags={tags} user={users[1]}/>
        </div>
    )
}
export default UserBoard