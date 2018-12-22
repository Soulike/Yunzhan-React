import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type, id, screenIdSet, screenList} = action;
    const {selectedScreenSet} = state;
    if (type === ActionTypes.SELECT_SCREEN)
    {
        selectedScreenSet.add(id);
        return {
            ...state,
            selectedScreenSet: new Set(selectedScreenSet.keys())
        };
    }
    else if (type === ActionTypes.UNSELECT_SCREEN)
    {
        selectedScreenSet.delete(id);
        return {
            ...state,
            selectedScreenSet: new Set(selectedScreenSet.keys())
        };
    }
    else if (type === ActionTypes.SELECT_ALL_SCREENS)
    {
        return {
            ...state,
            selectedScreenSet: new Set(screenIdSet.keys())
        };
    }
    else if (type === ActionTypes.UNSELECT_ALL_SCREENS)
    {
        return {
            ...state,
            selectedScreenSet: new Set()
        };
    }
    else if (type === ActionTypes.GET_SCREEN_LIST_SUCCEED)
    {
        return {
            ...state,
            screenList,
            selectedScreenSet: new Set()
        };
    }
    else if (type === ActionTypes.GET_SCREEN_LIST_FAILED)
    {
        return state;
    }
    else
    {
        return state;
    }
}