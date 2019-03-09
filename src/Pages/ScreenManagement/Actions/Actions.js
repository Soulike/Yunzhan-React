import * as ActionTypes from './ActionTypes';
import RequestProcessor from '../../../RequestProcessor';
import NAMESPACE from '../../../Namespace';

export function getScreenManagementBasicInfoAction()
{
    return async dispatch =>
    {
        const basicInfo = await RequestProcessor.sendGetScreenBasicInfoRequestAsync();
        if (basicInfo)
        {
            dispatch(getScreenManagementBasicInfoSuccessfulAction(basicInfo));
        }
        else
        {
            dispatch(getScreenManagementBasicInfoFailedAction());
        }
    };
}

function getScreenManagementBasicInfoSuccessfulAction(basicInfo)
{
    return {
        type: ActionTypes.GET_SCREEN_MANAGEMENT_BASIC_INFO_SUCCESSFUL,
        basicInfo,
    };
}

function getScreenManagementBasicInfoFailedAction()
{
    return {
        type: ActionTypes.GET_SCREEN_MANAGEMENT_BASIC_INFO_FAILED,
    };
}

export function getScreenManagementLogListAction()
{
    return async dispatch =>
    {
        const logListWrapper = await RequestProcessor.sendGetScreenLogListRequestAsync();
        if (logListWrapper)
        {
            const {[NAMESPACE.SCREEN_MANAGEMENT.LIST.LOG]: logList} = logListWrapper;
            dispatch(getScreenManagementLogListSuccessfulAction(logList));
        }
        else
        {
            dispatch(getScreenManagementLogListFailedAction());
        }
    };
}

function getScreenManagementLogListSuccessfulAction(logList)
{
    return {
        type: ActionTypes.GET_SCREEN_MANAGEMENT_LOG_LIST_SUCCESSFUL,
        logList,
    };
}

function getScreenManagementLogListFailedAction()
{
    return {
        type: ActionTypes.GET_SCREEN_MANAGEMENT_LOG_LIST_INFO_FAILED,
    };
}

export function getScreenListAction()
{
    return async dispatch =>
    {
        const screenListWrapper = await RequestProcessor.sendGetScreenListRequestAsync();
        if (screenListWrapper)
        {
            const {[NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN]: screenList} = screenListWrapper;
            dispatch(getScreenListSuccessfulAction(screenList));
        }
        else
        {
            dispatch(getScreenListFailedAction());
        }
    };
}

function getScreenListSuccessfulAction(screenList)
{
    return {
        type: ActionTypes.GET_SCREEN_LIST_SUCCESSFUL,
        screenList,
    };
}

function getScreenListFailedAction()
{
    return {
        type: ActionTypes.GET_SCREEN_LIST_FAILED,
    };
}

export function getResourcePackListAction()
{
    return async dispatch =>
    {
        const resourcePackListWrapper = await RequestProcessor.sendGetResourcePackListRequestAsync();
        if (resourcePackListWrapper)
        {
            const {[NAMESPACE.RESOURCE_PACK_MANAGEMENT.LIST.RESOURCE_PACK]: resourcePackList} = resourcePackListWrapper;
            dispatch(getResourcePackListSuccessfulAction(resourcePackList));
        }
        else
        {
            dispatch(getResourcePackListFailedAction());
        }

    };
}

function getResourcePackListSuccessfulAction(resourcePackList)
{
    return {
        type: ActionTypes.GET_RESOURCE_PACK_LIST_SUCCESSFUL,
        resourcePackList,
    };
}

function getResourcePackListFailedAction()
{
    return {
        type: ActionTypes.GET_RESOURCE_PACK_LIST_FAILED,
    };
}

export function selectScreensAction(screenIdArray)
{
    return {
        type: ActionTypes.SELECT_SCREENS,
        screenIdArray,
    };
}

export function unselectScreenAction(screenId)
{
    return {
        type: ActionTypes.UNSELECT_SCREEN,
        screenId,
    };
}

export function unselectAllScreensAction()
{
    return {
        type: ActionTypes.UNSELECT_ALL_SCREENS,
    };
}

export function selectResourcePackAction(resourcePackId)
{
    return {
        type: ActionTypes.SELECT_RESOURCE_PACK,
        resourcePackId,
    };
}

export function unselectAllResourcePacksAction()
{
    return {
        type: ActionTypes.UNSELECT_ALL_RESOURCE_PACKS,
    };
}