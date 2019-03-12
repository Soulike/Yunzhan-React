import {
    getResourcePackListAction,
    getScreenListAction,
    getScreenManagementBasicInfoAction,
    getScreenManagementLogListAction,
    selectResourcePackAction,
    selectScreensAction,
    unselectAllResourcePacksAction,
    unselectAllScreensAction,
    unselectScreenAction,
} from './Actions/Actions';
import Store from '../../Store';

export function getScreenManagementBasicInfo()
{
    Store.dispatch(getScreenManagementBasicInfoAction());
}

export function getScreenManagementLogList()
{
    Store.dispatch(getScreenManagementLogListAction());
}

export function getScreenList()
{
    Store.dispatch(getScreenListAction());
    Store.dispatch(unselectAllScreensAction());
}

export function getResourcePackList()
{
    Store.dispatch(getResourcePackListAction());
    Store.dispatch(unselectAllResourcePacksAction());
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