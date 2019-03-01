import * as ActionTypes from './ActionTypes';
import RequestProcessor from '../../../RequestProcessor';

export function getResourcePackManagementBasicInfoAction()
{
    return async dispatch =>
    {
        const basicInfo = await RequestProcessor.sendGetResourcePackManagementBasicInfoRequestAsync();
        if (basicInfo)
        {
            dispatch(getResourcePackManagementBasicInfoSuccessfulAction(basicInfo));
        }
        else
        {
            dispatch(getResourcePackManagementBasicInfoFailedAction());
        }
    };
}

function getResourcePackManagementBasicInfoSuccessfulAction(basicInfo)
{
    return {
        type: ActionTypes.GET_RESOURCE_PACK_MANAGEMENT_BASIC_INFO_SUCCESSFUL,
        basicInfo,
    };
}

function getResourcePackManagementBasicInfoFailedAction()
{
    return {
        type: ActionTypes.GET_RESOURCE_PACK_MANAGEMENT_BASIC_INFO_FAILED,
    };
}

export function selectTagAction(tagId)
{
    return {
        type: ActionTypes.SELECT_TAG,
        tagId,
    };
}

export function unselectTagAction(tagId)
{
    return {
        type: ActionTypes.UNSELECT_TAG,
        tagId,
    };
}

export function unselectAllTagsAction()
{
    return {
        type: ActionTypes.UNSELECT_ALL_TAGS,
    };
}

export function selectAdvertisementAction(advertisementId)
{
    return {
        type: ActionTypes.SELECT_ADVERTISEMENT,
        advertisementId,
    };
}

export function unselectAdvertisementAction(advertisementId)
{
    return {
        type: ActionTypes.UNSELECT_ADVERTISEMENT,
        advertisementId,
    };
}

export function unselectAllAdvertisementsAction()
{
    return {
        type: ActionTypes.UNSELECT_ALL_ADVERTISEMENTS,
    };
}