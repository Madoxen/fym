import React from 'react'
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getTags } from '../../features/tags/tagsReducer';

interface Props {
    tagids: number[];
}

const TagList: React.FC<Props> = ({ tagids }) => {

    const tags = useSelector(getTags);

    const listTags: Function = (): JSX.Element[] => {
        let tagArray: JSX.Element[] = [];
        tagids.forEach(tagId => tagArray.push(
            <Badge
                pill
                variant="primary"
                key={tagId}
                style={{ color: 'white', fontWeight: 'normal', fontSize: "12px", margin: "0px 10px 5px 0px" }}
            >{tagOfId(tagId)}</Badge>
        ));
        return tagArray;
    }

    const tagOfId: Function = (id: number): string => {
        let tagName: string = "";
        tags.forEach(tag => tag.tagid === id ? tagName = tag.name : null);
        return tagName;
    }

    return (
        <div className="d-flex">
            {listTags()}
        </div>
    )
};
export default TagList