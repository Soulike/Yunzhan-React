import * as ActionTypes from './ActionTypes';
import {getAsync, requestPrefix} from '../../../../../Static/Functions';
import {STATUS_CODE} from '../../../../../Static/Constants';
import {redirectToLogin} from '../../../../Login/Functions';
import {View as Alert} from '../../../../../Components/Alert';

export function getScreenList()
{
    return async dispatch =>
    {
        getAsync(requestPrefix('/admin/screenManagement/getScreenList'), false)
            .then(res =>
            {
                const {code, data: screenList} = res;
                if (code === STATUS_CODE.SUCCESS)
                {
                    dispatch(getScreenListSucceed(screenList));
                }
                else if (code === STATUS_CODE.INVALID_SESSION)
                {
                    Alert.show('请先登录', false);
                    dispatch(getScreenListFailed());
                    redirectToLogin();
                }
                else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
                {
                    Alert.show('服务器错误', false);
                    dispatch(getScreenListFailed());
                }
            })
            .catch(e =>
            {
                Alert.show('获取屏幕列表失败', false);
                dispatch(getScreenListFailed());
                console.log(e);
            });
    };
}


export function selectScreen(id)
{
    return {
        type: ActionTypes.SELECT_SCREEN,
        id
    };
}

export function unselectScreen(id)
{
    return {
        type: ActionTypes.UNSELECT_SCREEN,
        id
    };
}

export function selectAllScreens(screenIdSet)
{
    return {
        type: ActionTypes.SELECT_ALL_SCREENS,
        screenIdSet
    };
}

export function unselectAllScreens()
{
    return {
        type: ActionTypes.UNSELECT_ALL_SCREENS
    };
}

export function getScreenListSucceed(screenList)
{
    return {
        type: ActionTypes.GET_SCREEN_LIST_SUCCEED,
        screenList
    };
}

export function getScreenListFailed()
{
    return {
        type: ActionTypes.GET_SCREEN_LIST_FAILED,
    };
}