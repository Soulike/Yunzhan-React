import * as ActionTypes from './ActionTypes';
import RequestProcessor from '../../../RequestProcessor';
import NAMESPACE from '../../../Namespace';
import Store from '../../../Store';

export function getTagManagementBasicInfoAction()
{
    return async () =>
    {
        const tagBasicInfo = await RequestProcessor.sendGetTagBasicInfoRequestAsync();
        if (tagBasicInfo)
        {
            Store.dispatch(getTagManagementBasicInfoSuccessful(tagBasicInfo));
        }
        else
        {
            Store.dispatch(getTagManagementBasicInfoFailed());
        }
    };
}

function getTagManagementBasicInfoSuccessful(basicInfo)
{
    return {
        type: ActionTypes.GET_TAG_MANAGEMENT_BASIC_INFO_SUCCESSFUL,
        basicInfo,
    };
}

function getTagManagementBasicInfoFailed()
{
    return {
        type: ActionTypes.GET_TAG_MANAGEMENT_BASIC_INFO_FAILED,
    };
}

export function getTagListAction()
{
    return async dispatch =>
    {
        const tagListWrapper = await RequestProcessor.sendGetTagListRequestAsync();
        if (tagListWrapper)
        {
            const {[NAMESPACE.TAG_MANAGEMENT.LIST.TAG]: tagList} = tagListWrapper;
            dispatch(getTagListSuccessfulAction(tagList));
        }
        else
        {
            dispatch(getTagListFailedAction());
        }
    };
}

function getTagListSuccessfulAction(tagList)
{
    return {
        type: ActionTypes.GET_TAG_LIST_SUCCESSFUL,
        tagList,
    };
}

function getTagListFailedAction()
{
    return {
        type: ActionTypes.GET_TAG_LIST_FAILED,
    };
}