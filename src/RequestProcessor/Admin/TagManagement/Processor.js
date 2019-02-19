import {STATUS_CODE} from '../../../Static/Constants';
import {redirectToLogin} from '../../../Pages/Login/Functions';
import {DangerAlert, WarningAlert} from '../../../Components/Alerts';
import Function from '../../../Function';
import {GET_BASIC_INFO} from './Route';

export default {
    sendGetTagBasicInfoRequestAsync,
};

async function sendGetTagBasicInfoRequestAsync()
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
        WarningAlert.pop('获取标签基本信息失败');
        console.log(e);
        return null;
    }
}