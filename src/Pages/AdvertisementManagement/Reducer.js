import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    switch (type)
    {
        case ActionTypes.GET_ADVERTISEMENT_MANAGEMENT_BASIC_INFO_SUCCESSFUL:
        {
            const {basicInfo} = action;
            return {
                ...state,
                basicInfo,
            };
        }
        case ActionTypes.GET_ADVERTISEMENT_LIST_SUCCESSFUL:
        {
            const {advertisementList} = action;
            return {
                ...state,
                advertisementList,
            };
        }
        case ActionTypes.GET_ADVERTISEMENT_MANAGEMENT_BASIC_INFO_FAILED:
        case ActionTypes.GET_ADVERTISEMENT_LIST_FAILED:
        default:
        {
            return state;
        }
    }
}