import {STATUS_CODE} from '../../../Static/Constants';
import {redirectToLogin} from '../../../Pages/Login/Functions';
import {DangerAlert, WarningAlert} from '../../../Components/Alerts';
import Function from '../../../Function';
import {GET_BASIC_INFO} from './Route';

export default {
    sendGetTagBasicInfoRequest,
};

function sendGetTagBasicInfoRequest()
{
    Function.getAsync(GET_BASIC_INFO, false)
        .then(res =>
        {
            const {code, data} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                this.setState({...data});
            }
            else if (code === STATUS_CODE.INVALID_SESSION)
            {
                WarningAlert.pop('请先登录');
                redirectToLogin();
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                DangerAlert.pop('服务器错误');
            }
        })
        .catch(e =>
        {
            WarningAlert.pop('获取标签基本信息失败');
            console.log(e);
        });
}