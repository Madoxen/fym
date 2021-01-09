import React from 'react'
import { ITags } from '../props/Interfaces'

interface Props {
    tags: ITags[];
    tagids: number[];
}

const TagList: React.FC<Props> = ({tagids,tags}) => {

    const listTags: Function = (): JSX.Element[] => 
    {
        let tagArray:JSX.Element[] = [];
        tagids.forEach(tagId => tagArray.push(
            <span key={tagId}> {tagOfId(tagId)} </span>
            ));
        return tagArray;
    }

    const tagOfId: Function = (id: number): string =>
    {
        let tagName:string = "";
        tags.forEach(tag => tag.tagid === id ? tagName = tag.name : null);
        return tagName;
    }

    return(
        <div>
            {listTags()}
        </div>
    )
};
export default TagList