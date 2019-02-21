import {STATUS_CODE} from '../../../Static/Constants';
import {redirectToLogin} from '../../../Pages/Login/Function';
import Function from '../../../Function';
import {GET_ADVERTISE_INFO, GET_LOGIN_INFO, GET_RESOURCE_PACK_INFO, GET_SCREEN_INFO, GET_TAG_INFO} from './Route';
import {DangerAlert, WarningAlert} from '../../../Components/Alerts';

const {getAsync} = Function;

export default {
    sendGetLoginInfoRequestAsync,
    sendGetScreenInfoRequestAsync,
    sendGetAdvertisementInfoRequestAsync,
    sendGetResourcePackInfoRequestAsync,
    sendGetTagInfoRequestAsync,
};

async function sendGetLoginInfoRequestAsync()
{
    try
    {
        const {code, data} = await Function.getAsync(GET_LOGIN_INFO, false);
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
        WarningAlert.pop('获取登录信息失败');
        console.log(e);
        return null;
    }
}

async function sendGetScreenInfoRequestAsync()
{
    try
    {
        const {code, data} = await Function.getAsync(GET_SCREEN_INFO, false);
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
        WarningAlert.pop('获取屏幕信息失败');
        console.log(e);
        return null;
    }
}

async function sendGetAdvertisementInfoRequestAsync()
{
    try
    {
        const {code, data} = await Function.getAsync(GET_ADVERTISE_INFO, false);
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
        WarningAlert.pop('获取广告信息失败');
        console.log(e);
        return null;
    }
}

async function sendGetResourcePackInfoRequestAsync()
{
    try
    {
        const {code, data} = await Function.getAsync(GET_RESOURCE_PACK_INFO, false);
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
        WarningAlert.pop('获取资源包信息失败');
        console.log(e);
        return null;
    }
}

async function sendGetTagInfoRequestAsync()
{
    try
    {
        const {code, data} = await getAsync(GET_TAG_INFO, false);
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
        WarningAlert.pop('获取标签信息失败');
        console.log(e);
        return null;
    }
}
