import * as ActionTypes from './ActionTypes';

export function switchItem(itemId)
{
    return {
        type: ActionTypes.SWITCH_ITEM,
        itemId,
    };
}