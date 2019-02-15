import {STATUS_CODE} from '../../../Static/Constants';
import {redirectToLogin} from '../../../Pages/Login/Functions';
import Functions from '../../../Functions';
import {DangerAlert, WarningAlert} from '../../../Components/Alerts';
import {GET_BASIC_INFO} from './Route';

const {getAsync} = Functions;

export default {
    sendGetAdvertisementBasicInfoRequest,
};

function sendGetAdvertisementBasicInfoRequest()
{
    getAsync(GET_BASIC_INFO, false)
        .then(res =>
        {
            const {code, data} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                this.setState({...data});
            }
            else if (code === STATUS_CODE.INVALID_SESSION)
            {
                redirectToLogin();
                WarningAlert.pop('请先登录');
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                DangerAlert.pop('服务器错误');
            }
        })
        .catch(e =>
        {
            WarningAlert.pop('获取广告基本信息失败');
            console.log(e);
        });
}