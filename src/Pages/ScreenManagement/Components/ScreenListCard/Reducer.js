import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type, id, screenIdSet, screenList} = action;
    const {selectedScreenIdSet} = state;
    if (type === ActionTypes.SELECT_SCREEN)
    {
        selectedScreenIdSet.add(id);
        return {
            ...state,
            selectedScreenIdSet: new Set(selectedScreenIdSet.keys()),
        };
    }
    else if (type === ActionTypes.UNSELECT_SCREEN)
    {
        selectedScreenIdSet.delete(id);
        return {
            ...state,
            selectedScreenIdSet: new Set(selectedScreenIdSet.keys()),
        };
    }
    else if (type === ActionTypes.SELECT_ALL_SCREENS)
    {
        return {
            ...state,
            selectedScreenIdSet: new Set(screenIdSet.keys())
        };
    }
    else if (type === ActionTypes.UNSELECT_ALL_SCREENS)
    {
        return {
            ...state,
            selectedScreenIdSet: new Set()
        };
    }
    else if (type === ActionTypes.GET_SCREEN_LIST_SUCCEED)
    {
        return {
            ...state,
            screenList,
            selectedScreenIdSet: new Set()
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