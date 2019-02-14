import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    if (type === ActionTypes.SWITCH_ITEM)
    {
        return {
            ...state,
            currentActiveItemId: action.itemId,
        };
    }
    else
    {
        return state;
    }
}