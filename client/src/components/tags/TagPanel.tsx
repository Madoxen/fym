import React, {useState} from 'react'
import { ITagBox,ITags } from '../props/Interfaces'
import 'bootstrap/dist/css/bootstrap.min.css'

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
            <span 
                className="ml-1 mr-1 p-1 rounded"
                key={tagBox.tagid}
                onClick={() => tagClick(tagBox.tagid)}
                style={{background: tagBox.active? 'blue':'grey',color: 'white'}}
            > 
            {tagBox.name}
            </span>
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
        <div>
            {boxes()}
        </div>
    )
};
export default TagPanel