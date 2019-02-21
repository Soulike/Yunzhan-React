import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    switch (type)
    {
        case ActionTypes.GET_SCREEN_MANAGEMENT_BASIC_INFO_SUCCESSFUL:
        {
            const {basicInfo} = action;
            return {
                ...state,
                basicInfo,
            };
        }
        case ActionTypes.GET_SCREEN_MANAGEMENT_LOG_LIST_SUCCESSFUL:
        {
            const {logList} = action;
            return {
                ...state,
                logList,
            };
        }
        case ActionTypes.GET_SCREEN_LIST_SUCCESSFUL:
        {
            const {screenList} = action;
            return {
                ...state,
                screenList,
            };
        }
        case ActionTypes.GET_RESOURCE_PACK_LIST_SUCCESSFUL:
        {
            const {resourcePackList} = action;
            return {
                ...state,
                resourcePackList,
            };
        }
        case ActionTypes.GET_RESOURCE_PACK_LIST_FAILED:
        case ActionTypes.GET_SCREEN_LIST_FAILED:
        case ActionTypes.GET_SCREEN_MANAGEMENT_LOG_LIST_INFO_FAILED:
        case ActionTypes.GET_SCREEN_MANAGEMENT_BASIC_INFO_FAILED:
        default:
        {
            return state;
        }
    }
}