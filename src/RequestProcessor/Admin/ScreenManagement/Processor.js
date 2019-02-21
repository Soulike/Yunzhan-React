import {STATUS_CODE} from '../../../Static/Constants';
import {redirectToLogin} from '../../../Pages/Login/Function';
import Function from '../../../Function';
import {
    ADD_SCREEN,
    BIND_RESOURCE_PACK,
    DELETE_SCREEN,
    GET_BASIC_INFO,
    GET_LOG_LIST,
    GET_RESOURCE_PACK_LIST,
    GET_SCREEN_LIST,
    START_SCREEN,
    STOP_SCREEN,
    UNBIND_RESOURCE_PACK,
} from './Route';
import NAMESPACE from '../../../Namespace';
import {DangerAlert, SuccessAlert, WarningAlert} from '../../../Components/Alerts';

export default {
    sendGetScreenBasicInfoRequestAsync,
    sendGetScreenLogListRequestAsync,
    sendGetScreenListRequestAsync,
    sendPostUnbindResourcePackRequestAsync,
    sendPostBindResourcePackRequestAsync,
    sendPostAddScreenRequestAsync,
    sendPostDeleteScreenRequestAsync,
    sendPostStartScreenRequestAsync,
    sendPostStopScreenRequestAsync,
    sendGetResourcePackListRequestAsync,
};

async function sendGetScreenBasicInfoRequestAsync()
{
    try
    {
        const {code, data} = await Function.getAsync(GET_BASIC_INFO, false);
        if (code === STATUS_CODE.SUCCESS)
        {
            return data;
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            redirectToLogin();
            WarningAlert.pop('请先登录');
            return null;
        }
        else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            DangerAlert.pop('服务器错误');
            return null;
        }
    }
    catch (e)
    {
        WarningAlert.pop('获取屏幕基本信息失败');
        console.log(e);
        return null;
    }
}

async function sendGetScreenLogListRequestAsync()
{
    try
    {
        const {code, data} = await Function.getAsync(GET_LOG_LIST, false);
        if (code === STATUS_CODE.SUCCESS)
        {
            return data;
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            WarningAlert.pop('请先登录');
            redirectToLogin();
            return null;
        }
        else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            DangerAlert.pop('服务器错误');
            return null;
        }
    }
    catch (e)
    {
        WarningAlert.pop('获取最新消息失败');
        console.log(e);
        return null;
    }
}

async function sendGetScreenListRequestAsync()
{
    try
    {
        const {code, data} = await Function.getAsync(GET_SCREEN_LIST, false);
        if (code === STATUS_CODE.SUCCESS)
        {
            return data;
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            WarningAlert.pop('请先登录');
            redirectToLogin();
            return null;
        }
        else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            DangerAlert.pop('服务器错误');
            return null;
        }
    }
    catch (e)
    {
        WarningAlert.pop('获取屏幕列表失败');
        console.log(e);
        return null;
    }
}

async function sendPostUnbindResourcePackRequestAsync(screenIdListArray)
{
    try
    {
        const {code} = await Function.postAsync(UNBIND_RESOURCE_PACK, {[NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN_ID]: screenIdListArray});
        if (code === STATUS_CODE.SUCCESS)
        {
            SuccessAlert.pop('解绑成功');

            return true;
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            WarningAlert.pop('请先登录');
            redirectToLogin();
            return null;
        }
        else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
        {
            WarningAlert.pop('屏幕不存在');

            return null;
        }
        else if (code === STATUS_CODE.REJECTION)
        {
            WarningAlert.pop('你无权解绑该屏幕的资源包');

            return null;
        }
    }
    catch (e)
    {
        WarningAlert.pop('解绑失败');
        console.log(e);
        return null;
    }
}

async function sendPostBindResourcePackRequestAsync(screenIdListArray, resourcePackIdListArray)
{
    try
    {
        const {code} = Function.postAsync(BIND_RESOURCE_PACK, {
            [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN_ID]: screenIdListArray,
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: resourcePackIdListArray,
        });
        if (code === STATUS_CODE.SUCCESS)
        {
            SuccessAlert.pop('绑定成功');
            return true;
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            WarningAlert.pop('请先登录');
            redirectToLogin();
            return null;
        }
        else if (code === STATUS_CODE.REJECTION)
        {
            WarningAlert.pop('由于权限问题，绑定失败');
            return null;
        }
        else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
        {
            WarningAlert.pop('资源包或屏幕不存在，绑定失败');
            return null;
        }
        else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            DangerAlert.pop('服务器错误');
            return null;
        }
    }
    catch (e)
    {
        WarningAlert.pop('绑定失败');
        console.log(e);
        return null;
    }
}

async function sendPostAddScreenRequestAsync(uuid)
{
    try
    {
        const {code} = await Function.postAsync(ADD_SCREEN, {[NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: uuid});
        if (code === STATUS_CODE.SUCCESS)
        {
            SuccessAlert.pop('添加成功');

            return true;
        }
        else if (code === STATUS_CODE.WRONG_PARAMETER)
        {
            WarningAlert.pop('参数无效');
            return null;
        }
        else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
        {
            WarningAlert.pop('UUID 对应的屏幕不存在');
            return null;
        }
        else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            DangerAlert.pop('服务器错误');
            return null;
        }
    }
    catch (e)
    {
        DangerAlert.pop('添加失败');
        console.log(e);
        return null;
    }
}

async function sendPostDeleteScreenRequestAsync(screenIdListArray)
{
    try
    {
        const {code} = await Function.postAsync(DELETE_SCREEN, {
            [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN_ID]: screenIdListArray,
        });
        if (code === STATUS_CODE.SUCCESS)
        {
            SuccessAlert.pop('删除成功');

            return true;
        }
        else if (code === STATUS_CODE.REJECTION)
        {
            WarningAlert.pop('不能删除他人屏幕');

            return null;
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            WarningAlert.pop('请先登录');
            redirectToLogin();
            return null;
        }
        else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
        {
            WarningAlert.pop('被删除屏幕不存在');

            return null;
        }
        else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            DangerAlert.pop('服务器错误');
            return null;
        }
    }
    catch (e)
    {
        WarningAlert.pop('删除失败');
        console.log(e);
        return null;
    }
}

async function sendPostStartScreenRequestAsync(screenIdListArray)
{
    try
    {
        const {code} = await Function.postAsync(START_SCREEN, {
            [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN_ID]: screenIdListArray,
        });
        if (code === STATUS_CODE.SUCCESS)
        {
            SuccessAlert.pop('全部开始播放成功');

            return true;
        }
        else if (code === STATUS_CODE.REJECTION)
        {
            WarningAlert.pop('部分开始播放失败，请确认所有屏幕上 APP 处于运行状态');

            return null;
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            WarningAlert.pop('请先登录');
            redirectToLogin();
            return null;
        }
        else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
        {
            WarningAlert.pop('部分开始播放屏幕不存在');

            return null;
        }
        else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            DangerAlert.pop('服务器错误');
            return null;
        }
    }
    catch (e)
    {
        WarningAlert.pop('开始播放失败');
        console.log(e);
        return null;
    }
}

async function sendPostStopScreenRequestAsync(screenIdListArray)
{
    try
    {
        const {code} = await Function.postAsync(STOP_SCREEN, {
            [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN_ID]: screenIdListArray,
        });
        if (code === STATUS_CODE.SUCCESS)
        {
            SuccessAlert.pop('全部停止播放成功');

            return true;
        }
        else if (code === STATUS_CODE.REJECTION)
        {
            WarningAlert.pop('部分停止播放失败，请确认所有屏幕的网络状态');

            return null;
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            WarningAlert.pop('请先登录');
            redirectToLogin();
            return null;
        }
        else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
        {
            WarningAlert.pop('部分停止播放屏幕不存在');

            return null;
        }
        else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            DangerAlert.pop('服务器错误');
            return null;
        }
    }
    catch (e)
    {
        WarningAlert.pop('停止播放失败');
        console.log(e);
        return null;
    }
}

async function sendGetResourcePackListRequestAsync()
{
    try
    {
        const {code, data} = await Function.getAsync(GET_RESOURCE_PACK_LIST, false);
        if (code === STATUS_CODE.SUCCESS)
        {
            return data;
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            WarningAlert.pop('请先登录');
            redirectToLogin();
            return null;
        }
        else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            DangerAlert.pop('服务器错误');
            return null;
        }
    }
    catch (e)
    {
        WarningAlert.pop('获取资源包列表失败');
        console.log(e);
        return null;
    }
}