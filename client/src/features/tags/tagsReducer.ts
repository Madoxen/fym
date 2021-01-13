import { ITags } from "../../components/props/Interfaces"

export const REPLACE_TAGS = 'REPLACE_TAGS'

const initialState = {
    tags: []
}

interface IReplaceTags {
    type: typeof REPLACE_TAGS
    tags: ITags[];
}


export type TagsActionTypes = IReplaceTags
export const getTags = (state: any): ITags[] => state.tags.tags

export function replaceTags(tags: ITags[]): IReplaceTags {
    return {
        type: REPLACE_TAGS,
        tags: tags,
    }
}

export default (state = initialState, action: TagsActionTypes) => {
    if (action.type === REPLACE_TAGS) {
        return {
            ...state,
            tags: action.tags,
        }
    }
    return state
}