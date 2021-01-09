import React, { Fragment } from 'react'
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import LoginModal from '../components/loginModal/LoginModal'
import TagPanel from '../components/tags/TagPanel'
import { ITags, IPostPOST } from '../components/props/Interfaces'

export const AddPost: React.FC = () => {
    //TAGS
    const tags = [
        {
            "tagid": 1,
            "name": "Programista"
        },
        {
            "tagid": 2,
            "name": "Grafik"
        }
    ]
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
        console.log(PostPOST)
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
