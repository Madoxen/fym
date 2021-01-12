import React, { Fragment } from 'react'
import { Button, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import TagPanel from '../components/tags/TagPanel'
import { ITags, IPostPOST, IPost } from '../components/props/Interfaces'
import { useLocation, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getAccessToken } from '../features/auth/selectors'

interface Ilocal {
    post: IPost
}

export const EditPost: React.FC = () => {
    const location = useLocation<Ilocal>();
    const history = useHistory();
    const acc = useSelector(getAccessToken);

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
        content: location.state.post.content,
        title: location.state.post.title,
        tagids: location.state.post.tagids
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
        history.push({
            pathname: '/profile'
        })

        fetch(process.env.REACT_APP_API_URL + '/posts/' + location.state.post.username + "/" + location.state.post.postid, {
            method: 'PATCH',
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
            })
            .catch((e) => {
                //handle failure
            })
    }


    const tagOfId: Function = (id: number): ITags => {
        let returnTag: ITags = {
            tagid: id,
            name: ""
        }
        tags.forEach(tag => tag.tagid === id ? returnTag = tag : null);
        return returnTag;
    }

    const tagList: Function = (arr: number[]): ITags[] => {
        let TagsArr: ITags[] = []
        arr.map(tagid => TagsArr.push(tagOfId(tagid)))
        console.log(TagsArr)
        return TagsArr
    }


    return (
        <Fragment>
            <h1>Edit Post</h1>
            <div className="add-post">

                <FormGroup>
                    <FormLabel>Your post title</FormLabel>
                    <FormControl
                        type="text"
                        placeholder={location.state.post.title}
                        onChange={e => PostPOST.title = e.target.value}
                    ></FormControl>

                </FormGroup>

                <FormGroup>
                    <FormLabel>Your labels</FormLabel>
                </FormGroup>
                <TagPanel tags={tags} updateTags={getActiveTags} active={tagList(location.state.post.tagids)}></TagPanel>


                <FormGroup>
                    <FormLabel>Description your post</FormLabel>
                    <FormControl
                        as="textarea"
                        type="text"
                        placeholder={location.state.post.content}
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
                        Edit Post
                    </Button>
                </FormGroup>

            </div>

        </Fragment >
    )
}
