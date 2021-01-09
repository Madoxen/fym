import React from 'react'
import { IUser,ITags } from '../props/Interfaces'
import UserCard from './UserCard'

interface Props{
    users: IUser[];
    tags: ITags[];
    filtr: ITags[];
}
const UserBoard: React.FC<Props> = ({users,tags,filtr}) => {

    
    const listUsers: Function = (): JSX.Element[] => 
    {
        let userArr: IUser[] = []
        let userJSX: JSX.Element[] = []
        if(filtr.length !== 0) 
        {
            users.forEach(user => haveTag(user,filtr) ? userArr.push(user) : null);
            userArr.sort((a,b) => countUserTags(b) - countUserTags(a));
        }
        else
        {
            users.forEach(user => userArr.push(user));
        }
        userArr.forEach(user => userJSX.push(<UserCard tags={tags} user={user}/>));
        return userJSX;
    }

    const haveTag: Function = (user:IUser,tags:ITags[]): boolean => 
    {
        let have = false;
        user.tagids.forEach(tagId => 
            tags.forEach(tag => 
                tag.tagid === tagId ? have = true : null)
            );
        return have;
    }

    const countUserTags: Function = (user: IUser): number =>
    {
        let counter = 0;
        filtr.forEach(tag => user.tagids.includes(tag.tagid) ? counter++ : null)
        return counter;
    }

    return(<div>{listUsers()}</div>)
}
export default UserBoard