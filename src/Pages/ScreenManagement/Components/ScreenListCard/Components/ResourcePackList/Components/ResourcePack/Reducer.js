import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    if (type === ActionTypes.RESOURCE_PACK_CLICK)
    {
        return {
            ...state,
            selectedResourcePackId: action.id
        };
    }
    else
    {
        return state;
    }
}