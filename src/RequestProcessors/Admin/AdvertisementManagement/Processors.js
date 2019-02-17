import {STATUS_CODE} from '../../../Static/Constants';
import {redirectToLogin} from '../../../Pages/Login/Functions';
import Functions from '../../../Functions';
import {DangerAlert, SuccessAlert, WarningAlert} from '../../../Components/Alerts';
import {GET_ADVERTISEMENT_LIST, GET_BASIC_INFO, UPDATE_ADVERTISEMENT_INFO, UPLOAD_IMAGE, UPLOAD_VIDEO} from './Route';
import NAMESPACE from '../../../Namespace';
import REGEX from '../../../Static/Regex';
import {QRCodePositionId} from '../../../Pages/AdvertisementManagement/Components/UploaderCard/Components/ImageUploader/QRCodePosition';

const {getAsync} = Functions;

export default {
    sendGetAdvertisementBasicInfoRequest,
    sendPostUploadVideoRequestAsync,
    sendPostUploadImageRequestAsync,
    sendGetAdvertisementListRequest,
    sendPostUpdateAdvertisementInfoRequest,
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
    if (!REGEX.ADVERTISEMENT_NAME.test(videoName))
    {
        WarningAlert.pop('请输入正确的视频名');
        return false;
    }
    else
    {
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
}

async function sendPostUploadImageRequestAsync()
{
    const {imageFileObject, imageName, QRCodeUrl, QRCodePosition} = this.state;
    if (!REGEX.ADVERTISEMENT_NAME.test(imageName))
    {
        WarningAlert.pop('请输入正确的图片名');
    }
    else if (!REGEX.URL.test(QRCodeUrl))
    {
        WarningAlert.pop('请输入有效的网址');
    }
    else if (!Object.values(QRCodePositionId).includes(QRCodePosition))
    {
        WarningAlert.pop('选择的位置无效');
    }
    else
    {
        const formData = new FormData();
        formData.append(NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.NAME, imageName);
        formData.append(NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.FILE, imageFileObject);
        formData.append(NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_URL, QRCodeUrl);
        formData.append(NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_POSITION, QRCodePosition);
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
}

function sendGetAdvertisementListRequest()
{
    Functions.getAsync(GET_ADVERTISEMENT_LIST, false)
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
            WarningAlert.pop('获取广告列表失败');
            console.log(e);
        });
}

function sendPostUpdateAdvertisementInfoRequest()
{
    const {currentIdOfAdvertisementInModal, advertisementName, QRCodeUrl, QRCodePosition} = this.state;

    if (!REGEX.ADVERTISEMENT_NAME.test(advertisementName))
    {
        WarningAlert.pop('请输入正确的文件名');
    }
    else if (!REGEX.URL.test(QRCodeUrl))
    {
        WarningAlert.pop('请输入有效的网址');
    }
    else if (!Object.values(QRCodePositionId).includes(QRCodePosition))
    {
        WarningAlert.pop('选择的位置无效');
    }
    else
    {
        Functions.postAsync(UPDATE_ADVERTISEMENT_INFO, {
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.ID]: parseInt(currentIdOfAdvertisementInModal, 10), // 文件 ID
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME]: advertisementName, // 文件名
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_URL]: QRCodeUrl, // 二维码 URL
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_POSITION]: QRCodePosition, // 二维码位置
        })
            .then(res =>
            {
                const {code} = res;
                if (code === STATUS_CODE.SUCCESS)
                {
                    SuccessAlert.pop('修改信息成功');
                    sendGetAdvertisementListRequest.apply(this);
                }
                else if (code === STATUS_CODE.REJECTION)
                {
                    WarningAlert.pop('修改被拒绝');
                }
                else if (code === STATUS_CODE.INVALID_SESSION)
                {
                    WarningAlert.pop('请先登录');
                    redirectToLogin();
                }
                else if (code === STATUS_CODE.WRONG_PARAMETER)
                {
                    WarningAlert.pop('参数错误');
                }
                else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
                {
                    DangerAlert.pop('服务器错误');
                }
            })
            .catch(e =>
            {
                WarningAlert.pop('修改信息失败');
                console.log(e);
            });
    }
}