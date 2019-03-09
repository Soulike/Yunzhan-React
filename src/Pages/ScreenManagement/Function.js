import * as Actions from './Actions/Actions';
import {
    selectResourcePackAction,
    selectScreensAction,
    unselectAllResourcePacksAction,
    unselectAllScreensAction,
    unselectScreenAction,
} from './Actions/Actions';
import Store from '../../Store';

export function getScreenManagementBasicInfo()
{
    Store.dispatch(Actions.getScreenManagementBasicInfoAction());
}

export function getScreenManagementLogList()
{
    Store.dispatch(Actions.getScreenManagementLogListAction());
}

export function getScreenList()
{
    Store.dispatch(Actions.getScreenListAction());
}

export function getResourcePackList()
{
    Store.dispatch(Actions.getResourcePackListAction());
}

export function selectScreens(screenIdArray)
{
    Store.dispatch(selectScreensAction(screenIdArray));
}

export function unselectScreen(screenId)
{
    Store.dispatch(unselectScreenAction(screenId));
}

export function unselectAllScreens()
{
    Store.dispatch(unselectAllScreensAction());
}

export function selectResourcePack(resourcePackId)
{
    Store.dispatch(selectResourcePackAction(resourcePackId));
}

export function unselectAllResourcePacks()
{
    Store.dispatch(unselectAllResourcePacksAction());
}