import * as ActionTypes from './ActionTypes';

export function resourcePackClick(id)
{
    return {
        type: ActionTypes.RESOURCE_PACK_CLICK,
        id
    };
}