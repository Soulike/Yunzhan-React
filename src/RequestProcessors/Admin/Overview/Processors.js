import {STATUS_CODE} from '../../../Static/Constants';
import {View as Alert} from '../../../Components/Alert';
import {redirectToLogin} from '../../../Pages/Login/Functions';
import Functions from '../../../Functions';
import {GET_ADVERTISE_INFO, GET_LOGIN_INFO, GET_RESOURCE_PACK_INFO, GET_SCREEN_INFO, GET_TAG_INFO} from './Route';

const {getAsync} = Functions;

export default {
    sendGetLoginInfoRequest,
    sendGetScreenInfoRequest,
    sendGetAdvertisementInfoRequest,
    sendGetResourcePackInfoRequest,
    sendGetTagInfoRequest
};

function sendGetLoginInfoRequest()
{
    getAsync(GET_LOGIN_INFO, false)
        .then(res =>
        {
            const {code, data} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                this.setState({...data});
            }
            else if (code === STATUS_CODE.INVALID_SESSION)
            {
                Alert.show('请先登录', false);
                redirectToLogin();
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            Alert.show('获取登录信息失败', false);
            console.log(e);
        });
}

function sendGetScreenInfoRequest()
{
    getAsync(GET_SCREEN_INFO, false)
        .then(res =>
        {
            const {code, data} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                this.setState({...data});
            }
            else if (code === STATUS_CODE.INVALID_SESSION)
            {
                Alert.show('请先登录', false);
                redirectToLogin();
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            Alert.show('获取屏幕信息失败', false);
            console.log(e);
        });
}

function sendGetAdvertisementInfoRequest()
{
    getAsync(GET_ADVERTISE_INFO, false)
        .then(res =>
        {
            const {code, data} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                this.setState({...data});
            }
            else if (code === STATUS_CODE.INVALID_SESSION)
            {
                Alert.show('请先登录', false);
                redirectToLogin();
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            Alert.show('获取广告信息失败', false);
            console.log(e);
        });
}

function sendGetResourcePackInfoRequest()
{
    getAsync(GET_RESOURCE_PACK_INFO, false)
        .then(res =>
        {
            const {code, data} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                this.setState({...data});
            }
            else if (code === STATUS_CODE.INVALID_SESSION)
            {
                Alert.show('请先登录', false);
                redirectToLogin();
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            Alert.show('获取资源包信息失败', false);
            console.log(e);
        });
}

function sendGetTagInfoRequest()
{
    getAsync(GET_TAG_INFO, false)
        .then(res =>
        {
            const {code, data} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                this.setState({...data});
            }
            else if (code === STATUS_CODE.INVALID_SESSION)
            {
                Alert.show('请先登录', false);
                redirectToLogin();
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            Alert.show('获取标签信息失败', false);
            console.log(e);
        });
}
