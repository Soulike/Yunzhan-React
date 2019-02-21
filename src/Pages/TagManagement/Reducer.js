import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    switch (type)
    {
        case ActionTypes.GET_TAG_MANAGEMENT_BASIC_INFO_SUCCESSFUL:
        {
            const {basicInfo} = action;
            return {
                ...state,
                basicInfo,
            };
        }
        case ActionTypes.GET_TAG_LIST_SUCCESSFUL:
        {
            const {tagList} = action;
            return {
                ...state,
                tagList,
            };
        }
        case ActionTypes.GET_TAG_MANAGEMENT_BASIC_INFO_FAILED:
        case ActionTypes.GET_TAG_LIST_FAILED:
        default:
        {
            return state;
        }
    }
}