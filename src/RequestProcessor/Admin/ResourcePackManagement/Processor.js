import {STATUS_CODE} from '../../../Static/Constants';
import {redirectToLogin} from '../../../Pages/Login/Function';
import Function from '../../../Function';
import {DangerAlert, WarningAlert} from '../../../Components/Alerts';
import {GET_BASIC_INFO} from './Route';

export default {
    sendGetResourcePackManagementBasicInfoRequestAsync,
};

async function sendGetResourcePackManagementBasicInfoRequestAsync()
{
    try
    {
        const {code, data} = await Function.getAsync(GET_BASIC_INFO, false);
        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return data;
            }
            case STATUS_CODE.INVALID_SESSION:
            {
                WarningAlert.pop('请先登录');
                redirectToLogin();
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                DangerAlert.pop('服务器错误');
                return null;
            }
            default:
            {
                WarningAlert.pop('未知错误');
                return null;
            }
        }
    }
    catch (e)
    {
        WarningAlert.pop('获取基本信息失败');
        console.log(e);
        return null;
    }
}