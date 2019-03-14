import {STATUS_CODE} from '../../../Config';
import {redirectToLogin} from '../../../Pages/Login/Function';
import Function from '../../../Function';
import {DangerAlert, SuccessAlert, WarningAlert} from '../../../Components/Bootstrap/Alerts';
import {
    DELETE_ADVERTISEMENT,
    GET_ADVERTISEMENT_INFO,
    GET_ADVERTISEMENT_LIST,
    GET_BASIC_INFO,
    UPDATE_ADVERTISEMENT_INFO,
    UPLOAD_IMAGE,
    UPLOAD_VIDEO,
} from './Route';
import NAMESPACE from '../../../Namespace';
import {Function as SpinnerFunction} from '../../../Components/Bootstrap/GrowingSpinner';

export default {
    sendGetAdvertisementBasicInfoRequestAsync,
    sendPostUploadVideoRequestAsync,
    sendPostUploadImageRequestAsync,
    sendGetAdvertisementListRequestAsync,
    sendPostUpdateAdvertisementInfoRequestAsync,
    sendGetAdvertisementInfoRequestAsync,
    sendPostDeleteAdvertisementRequestAsync,
};

async function sendGetAdvertisementBasicInfoRequestAsync()
{
    try
    {
        SpinnerFunction.showSpinner();
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
        WarningAlert.pop('获取广告基本信息失败');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendPostUploadVideoRequestAsync(videoFileObject, videoName)
{
    try
    {
        SpinnerFunction.showSpinner();
        const formData = new FormData();
        formData.append(NAMESPACE.ADVERTISEMENT_MANAGEMENT.VIDEO.NAME, videoName);
        formData.append(NAMESPACE.ADVERTISEMENT_MANAGEMENT.VIDEO.FILE, videoFileObject);
        const {code} = await Function.postAsync(UPLOAD_VIDEO, formData, {
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
            return null;
        }
        else if (code === STATUS_CODE.WRONG_PARAMETER)
        {
            WarningAlert.pop('参数错误');
            return null;
        }
        else if (code === STATUS_CODE.REJECTION)
        {
            WarningAlert.pop('上传被拒绝');
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
        WarningAlert.pop('上传失败');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }

}

async function sendPostUploadImageRequestAsync(imageFileObject, imageName, QRCodeUrl, QRCodePosition)
{
    try
    {
        SpinnerFunction.showSpinner();
        const formData = new FormData();
        formData.append(NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.NAME, imageName);
        formData.append(NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.FILE, imageFileObject);
        formData.append(NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_URL, QRCodeUrl);
        formData.append(NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_POSITION, QRCodePosition);

        const {code} = await Function.postAsync(UPLOAD_IMAGE, formData, {
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
            return null;
        }
        else if (code === STATUS_CODE.WRONG_PARAMETER)
        {
            WarningAlert.pop('参数错误');
            return null;
        }
        else if (code === STATUS_CODE.REJECTION)
        {
            WarningAlert.pop('上传被拒绝');
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
        WarningAlert.pop('上传失败');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendGetAdvertisementListRequestAsync()
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code, data} = await Function.getAsync(GET_ADVERTISEMENT_LIST, false);
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
        WarningAlert.pop('获取广告列表失败');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendGetAdvertisementInfoRequestAsync(advertisementId)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code, data} = await Function.getAsync(GET_ADVERTISEMENT_INFO, false, {
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.ID]: advertisementId,
        });
        if (code === STATUS_CODE.SUCCESS)
        {
            return data;
        }
        else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
        {
            WarningAlert.pop('广告不存在');
            return null;
        }
        else if (code === STATUS_CODE.REJECTION)
        {
            WarningAlert.pop('权限不足');
            return null;
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            WarningAlert.pop('请先登录');
            redirectToLogin();
            return null;
        }
        else if (code === STATUS_CODE.WRONG_PARAMETER)
        {
            WarningAlert.pop('参数错误');
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
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendPostUpdateAdvertisementInfoRequestAsync(currentIdOfAdvertisementInModal, advertisementName, QRCodeUrl, QRCodePosition)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code} = await Function.postAsync(UPDATE_ADVERTISEMENT_INFO, {
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.ID]: parseInt(currentIdOfAdvertisementInModal, 10), // 文件 ID
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME]: advertisementName, // 文件名
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_URL]: QRCodeUrl, // 二维码 URL
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_POSITION]: QRCodePosition, // 二维码位置
        });

        if (code === STATUS_CODE.SUCCESS)
        {
            SuccessAlert.pop('修改信息成功');
            return true;
        }
        else if (code === STATUS_CODE.REJECTION)
        {
            WarningAlert.pop('修改被拒绝');
            return null;
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            WarningAlert.pop('请先登录');
            redirectToLogin();
            return null;
        }
        else if (code === STATUS_CODE.WRONG_PARAMETER)
        {
            WarningAlert.pop('参数错误');
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
        WarningAlert.pop('修改信息失败');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendPostDeleteAdvertisementRequestAsync(advertisementId)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code} = await Function.postAsync(DELETE_ADVERTISEMENT, {
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.ID]: advertisementId,
        });

        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                SuccessAlert.pop('删除成功');
                return true;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('被删除广告不存在');
                return null;
            }
            case STATUS_CODE.INVALID_SESSION:
            {
                WarningAlert.pop('请先登录');
                redirectToLogin();
                return null;
            }
            case STATUS_CODE.REJECTION:
            {
                WarningAlert.pop('无权删除该广告');
                return null;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
                WarningAlert.pop('参数错误');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                DangerAlert.pop('服务器错误');
                return null;
            }
            default:
            {
                WarningAlert.pop('删除广告失败');
                return null;
            }
        }
    }
    catch (e)
    {
        WarningAlert.pop('删除广告失败');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}