import {STATUS_CODE} from '../../../Static/Constants';
import {redirectToLogin} from '../../../Pages/Login/Functions';
import Functions from '../../../Functions';
import {DangerAlert, SuccessAlert, WarningAlert} from '../../../Components/Alerts';
import {GET_BASIC_INFO, UPLOAD_IMAGE, UPLOAD_VIDEO} from './Route';
import NAMESPACE from '../../../Namespace';

const {getAsync} = Functions;

export default {
    sendGetAdvertisementBasicInfoRequest,
    sendPostUploadVideoRequestAsync,
    sendPostUploadImageRequestAsync,
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

async function sendPostUploadVideoRequestAsync()
{
    const {videoFileObject, videoName} = this.state;
    const formData = new FormData();
    formData.append(NAMESPACE.ADVERTISEMENT_MANAGEMENT.VIDEO.NAME, videoName);
    formData.append(NAMESPACE.ADVERTISEMENT_MANAGEMENT.VIDEO.FILE, videoFileObject);
    try
    {
        const {code} = await Functions.postAsync(UPLOAD_VIDEO, formData, {
            onUploadProgress: e =>
            {
                this.setState({
                    uploadProgress: e.loaded / e.total * 100,
                });
            },
        });
        if (code === STATUS_CODE.SUCCESS)
        {
            SuccessAlert.pop('上传成功');
            return true;
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            WarningAlert.pop('请先登录');
            redirectToLogin();
            return false;
        }
        else if (code === STATUS_CODE.REJECTION)
        {
            WarningAlert.pop('上传被拒绝');
            return false;
        }
        else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            DangerAlert.pop('服务器错误');
            return false;
        }
    }
    catch (e)
    {
        WarningAlert.pop('上传失败');
        console.log(e);
        return false;
    }
}

async function sendPostUploadImageRequestAsync()
{
    const {imageFileObject, imageName} = this.state;
    const formData = new FormData();
    formData.append(NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.NAME, imageName);
    formData.append(NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.FILE, imageFileObject);
    try
    {
        const {code} = await Functions.postAsync(UPLOAD_IMAGE, formData, {
            onUploadProgress: e =>
            {
                this.setState({
                    uploadProgress: e.loaded / e.total * 100,
                });
            },
        });
        if (code === STATUS_CODE.SUCCESS)
        {
            SuccessAlert.pop('上传成功');
            return true;
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            WarningAlert.pop('请先登录');
            redirectToLogin();
            return false;
        }
        else if (code === STATUS_CODE.REJECTION)
        {
            WarningAlert.pop('上传被拒绝');
            return false;
        }
        else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            DangerAlert.pop('服务器错误');
            return false;
        }
    }
    catch (e)
    {
        WarningAlert.pop('上传失败');
        console.log(e);
        return false;
    }
}