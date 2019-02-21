import * as ActionTypes from './ActionTypes';
import RequestProcessor from '../../../RequestProcessor';
import NAMESPACE from '../../../Namespace';

export function getAdvertisementManagementBasicInfoAction()
{
    return async dispatch =>
    {
        const basicInfo = await RequestProcessor.sendGetAdvertisementBasicInfoRequestAsync();
        if (basicInfo)
        {
            dispatch(getAdvertisementManagementBasicInfoSuccessfulAction(basicInfo));
        }
        else
        {
            dispatch(getAdvertisementManagementBasicInfoFailedAction());
        }
    };
}

function getAdvertisementManagementBasicInfoSuccessfulAction(basicInfo)
{
    return {
        type: ActionTypes.GET_ADVERTISEMENT_MANAGEMENT_BASIC_INFO_SUCCESSFUL,
        basicInfo,
    };
}

function getAdvertisementManagementBasicInfoFailedAction()
{
    return {
        type: ActionTypes.GET_ADVERTISEMENT_MANAGEMENT_BASIC_INFO_FAILED,
    };
}

export function getAdvertisementListAction()
{
    return async dispatch =>
    {
        const advertisementListWrapper = await RequestProcessor.sendGetAdvertisementListRequestAsync();
        if (advertisementListWrapper)
        {
            const {[NAMESPACE.ADVERTISEMENT_MANAGEMENT.LIST.ADVERTISEMENT]: advertisementList} = advertisementListWrapper;
            dispatch(getAdvertisementListSuccessfulAction(advertisementList));
        }
        else
        {
            dispatch(getAdvertisementListFailedAction());
        }
    };
}

function getAdvertisementListSuccessfulAction(advertisementList)
{
    return {
        type: ActionTypes.GET_ADVERTISEMENT_LIST_SUCCESSFUL,
        advertisementList,
    };
}

function getAdvertisementListFailedAction()
{
    return {
        type: ActionTypes.GET_ADVERTISEMENT_LIST_FAILED,
    };
}