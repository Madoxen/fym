import React, { Fragment, useEffect, useState } from 'react'
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import TagPanel from '../components/tags/TagPanel'
import { ITags, IPostPOST } from '../components/props/Interfaces'
import { useSelector } from 'react-redux'
import { getAccessToken } from '../features/auth/selectors'
import { getUsername } from '../features/login/loginReducer'
import { fetchFunction } from '../components/api/FetchFunction'
import { useHistory } from 'react-router-dom'

export const AddPost: React.FC = () => {
    const acc = useSelector(getAccessToken);
    const username = useSelector(getUsername);
    const history = useHistory();

    //TAGS
    const [tags, setTags] = useState<ITags[]>([])
    //TAGS
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        fetchFunction('/tags', setTags);
    }

    //POST to POST HAAHAHAH
    const PostPOST: IPostPOST = {
        content: "",
        title: "",
        tagids: []
    }

    const getActiveTags: Function = (tags: ITags[]): void => {
        var ids: number[] = []

        tags.map(tag => {
            ids.push(tag.tagid)
        })
        PostPOST.tagids = ids
    }

    //TODO SEND Post :)
    const SendChanges = (): void => {
        fetch(process.env.REACT_APP_API_URL + '/posts/' + username, {
            method: 'POST',
            body: JSON.stringify(PostPOST),
            headers: {
                Accept: 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: 'Bearer ' + acc
            },
        })
            .then((r) => r.json())
            .then((r) => {
                //handle success
                history.push({
                    pathname: "/profile"
                })
            })
            .catch((e) => {
                //handle failure
            })
    }

    return (
        <Fragment>
            <h1>ADD POST</h1>
            <div className="add-post">

                <FormGroup>
                    <FormLabel>Add your post title</FormLabel>
                    <FormControl
                        type="text"
                        onChange={e => PostPOST.title = e.target.value}
                    ></FormControl>

                </FormGroup>

                <FormGroup>
                    <FormLabel>Add tags to your posts this will help another find your offert</FormLabel>
                </FormGroup>
                <TagPanel tags={tags} updateTags={getActiveTags}></TagPanel>


                <FormGroup>
                    <FormLabel>Description your post</FormLabel>
                    <FormControl
                        as="textarea"
                        type="text"
                        onChange={e => PostPOST.content = e.target.value}
                    >

                    </FormControl>
                </FormGroup>

                <FormGroup>
                    <Button
                        className="btnFormSend"
                        variant="outline-success"
                        onClick={SendChanges}
                    >
                        Add Post
                    </Button>
                </FormGroup>

            </div>

        </Fragment >
    )
}
