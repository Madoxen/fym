import React, { Fragment } from 'react'
import { FormControl, FormGroup, FormLabel, Button } from 'react-bootstrap'
import { IUser, ITags, IUserPOST } from '../props/Interfaces'
import TagPanel from '../tags/TagPanel'

interface Props {
    user: IUser,
    tags: ITags[]
}
const EditProfile: React.FC<Props> = ({ user, tags }) => {

    const UserPOST: IUserPOST = {
        profileDescription: user.profiledescription,
        visibleName: "",
        telephone: user.phone,
        contactEmail: user.email,
        tagIDs: []
    }

    //TODO SEND User :)
    const SendChanges = (): void => {
        console.log(UserPOST)
    }

    const getActiveTags: Function = (tags: ITags[]): void => {
        var ids: number[] = []

        tags.map(tag => {
            ids.push(tag.tagid)
        })
        UserPOST.tagIDs = ids
    }

    return (
        <Fragment>
            <div className="edit-profile">
                <FormGroup>
                    <FormLabel> Your tags</FormLabel>
                    <TagPanel tags={tags} updateTags={getActiveTags}></TagPanel>
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
                    <FormLabel>Telephone</FormLabel>
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
        </Fragment>
    )
};
export default EditProfile