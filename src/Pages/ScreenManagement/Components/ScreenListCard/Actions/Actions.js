import * as ActionTypes from './ActionTypes';


export function selectScreen(id)
{
    return {
        type: ActionTypes.SELECT_SCREEN,
        id,
    };
}

export function unselectScreen(id)
{
    return {
        type: ActionTypes.UNSELECT_SCREEN,
        id,
    };
}

export function selectAllScreens(screenIdSet)
{
    return {
        type: ActionTypes.SELECT_ALL_SCREENS,
        screenIdSet,
    };
}

export function unselectAllScreens()
{
    return {
        type: ActionTypes.UNSELECT_ALL_SCREENS,
    };
}
