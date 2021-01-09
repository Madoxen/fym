import React, {useState} from 'react'
import { ITagBox,ITags } from '../props/Interfaces'
import { Button } from 'react-bootstrap';

interface Props {
    tags: ITags[];
    updateTags: Function;
}

const TagPanel: React.FC<Props> = ({tags,updateTags}) => {

    const assignTags: Function = (): ITagBox[] =>
    {
        let tagArr: ITagBox[] = []
        tags.forEach(tag => tagArr.push({tagid: tag.tagid,name: tag.name,active: false}));
        return tagArr;
    }
    const [tagBoxes, setTagBoxes] = useState<ITagBox[]>(assignTags());


    const boxes: Function = (): JSX.Element[] => 
    {
        let tagBoxArray:JSX.Element[] = [];
        tagBoxes.forEach(tagBox => tagBoxArray.push(
            <Button 
                className="ml-1 mr-1 p-1 rounded"
                key={tagBox.tagid}
                size="sm"
                onClick={() => tagClick(tagBox.tagid)}
                variant={tagBox.active? 'primary':'scondary'}
                onMouseDown={(e) => e.preventDefault()}
            > 
            {tagBox.name}
            </Button>
            ));
        return tagBoxArray;
    }

    const tagClick: Function = (id: number): void => 
    {
        let newArr = [...tagBoxes];
        newArr.map(tag => tag.tagid === id ? tag.active = !tag.active : null);
        setTagBoxes(newArr);

        let ArrActive: ITags[] = [];
        newArr.map(tag => tag.active? ArrActive.push({tagid: tag.tagid,name: tag.name}): null)
        updateTags(ArrActive);
    }

    return(
        <div className="m-3">
            {boxes()}
        </div>
    )
};
export default TagPanel