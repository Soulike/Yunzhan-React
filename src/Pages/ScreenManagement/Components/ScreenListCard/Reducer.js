import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type, id, screenIdSet} = action;
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
    else
    {
        return state;
    }
}
