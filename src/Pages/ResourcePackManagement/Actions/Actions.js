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