import {STATUS_CODE} from '../../../Static/Constants';
import {redirectToLogin} from '../../../Pages/Login/Function';
import Function from '../../../Function';
import {DangerAlert, SuccessAlert, WarningAlert} from '../../../Components/Alerts';
import {GET_BASIC_INFO, GET_RESOURCE_PACK_LIST, SUBMIT_NEW_RESOURCE_PACK} from './Route';
import NAMESPACE from '../../../Namespace';

export default {
    sendGetResourcePackManagementBasicInfoRequestAsync,
    sendPostSubmitNewResourcePackRequestAsync,
    sendGetResourcePackListRequestAsync,
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

async function sendPostSubmitNewResourcePackRequestAsync(resourcePackName, advertisementIdListArray, tagIdListArray)
{
    try
    {
        const {code} = await Function.postAsync(SUBMIT_NEW_RESOURCE_PACK, {
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.NAME]: resourcePackName, // 新资源包的名称
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.LIST.ADVERTISEMENT_ID]: advertisementIdListArray, // 新资源包包含的广告 ID 列表，可以为空
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.LIST.TAG_ID]: tagIdListArray, // 新资源包包含的标签列表，可以为空
        });
        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                SuccessAlert.pop('创建新资源包成功');
                return true;
            }
            case STATUS_CODE.INVALID_SESSION:
            {
                WarningAlert.pop('请先登录');
                redirectToLogin();
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
                WarningAlert.pop('创建新资源包失败');
                return null;
            }
        }
    }
    catch (e)
    {
        WarningAlert.pop('创建新资源包失败');
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