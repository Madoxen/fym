import React, { Fragment } from 'react'
import { FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { getAccessToken } from '../../features/auth/selectors';
import { IUser, ITags, IUserPOST } from '../props/Interfaces'
import TagPanel from '../tags/TagPanel'

interface Props {
    user: IUser,
}
const EditProfile: React.FC<Props> = ({ user }) => {

    const acc = useSelector(getAccessToken);

    const UserPOST: IUserPOST = {
        profileDescription: user.profiledescription,
        visibleName: "",
        telephone: user.phone,
        contactEmail: user.email,
        tagids: user.tagids
    }

    const SendChanges = (): void => {
        console.log(acc);
        //fetch some posts and users
        fetch(process.env.REACT_APP_API_URL + '/users/' + user.username, {
            method: 'POST',
            body: JSON.stringify(UserPOST),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: 'Bearer ' + acc
            },
        })
            .then((r) => r.json())
            .then((r) => {
                //handle success
            })
            .catch((e) => {
                //handle failure
            })
    }

    const getActiveTags: Function = (tags: ITags[]): void => {
        let ids = tags.map(tag => tag.tagid)
        UserPOST.tagids = ids
        console.log(UserPOST.tagids)
    }

    return (
        <Fragment>


            <div className="edit-profile">
                <FormGroup>
                    <FormLabel> Your tags</FormLabel>
                    <TagPanel updateTags={getActiveTags} active={UserPOST.tagids}></TagPanel>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        type="email"
                        placeholder={user.email}
                        onChange={e => UserPOST.contactEmail = e.target.value}
                    ></FormControl>

                </FormGroup>
                <FormGroup>
                    <FormLabel>Telephone</FormLabel>
                    <FormControl
                        type="text"
                        placeholder={user.phone}
                        onChange={e => UserPOST.telephone = e.target.value}
                    >

                    </FormControl>
                </FormGroup>
                <FormGroup>
                    <FormLabel>Description</FormLabel>
                    <FormControl
                        type="text"
                        placeholder={user.profiledescription}
                        onChange={e => UserPOST.profileDescription = e.target.value}
                    ></FormControl>
                </FormGroup>
                <FormGroup>
                    <Button
                        className="btnFormSend"
                        variant="outline-success"
                        onClick={SendChanges}
                    >
                        Edit Profile
                    </Button>
                </FormGroup>

            </div>
        </ Fragment >
    )
};
export default EditProfile