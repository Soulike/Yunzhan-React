import {STATUS_CODE} from '../../../Static/Constants';
import {redirectToLogin} from '../../../Pages/Login/Function';
import Function from '../../../Function';
import {DangerAlert, SuccessAlert, WarningAlert} from '../../../Components/Alerts';
import {
    CHANGE_RESOURCE_PACK_INFO,
    GET_BASIC_INFO,
    GET_RESOURCE_PACK_ADVERTISEMENT_LIST,
    GET_RESOURCE_PACK_LIST,
    GET_RESOURCE_PACK_SCREEN_LIST,
    GET_RESOURCE_PACK_TAG_LIST,
    GET_RESOURCE_PACK_UNBINDING_ADVERTISEMENT_LIST,
    GET_RESOURCE_PACK_UNBINDING_TAG_LIST,
    SUBMIT_NEW_RESOURCE_PACK,
} from './Route';
import NAMESPACE from '../../../Namespace';
import {Function as SpinnerFunction} from '../../../Components/GrowingSpinner';

export default {
    sendGetResourcePackManagementBasicInfoRequestAsync,
    sendPostSubmitNewResourcePackRequestAsync,
    sendGetResourcePackListRequestAsync,
    sendGetResourcePackTagListRequestAsync,
    sendGetResourcePackAdvertisementListRequestAsync,
    sendGetResourcePackScreenListRequestAsync,
    sendGetResourcePackUnbindingTagListRequestAsync,
    sendGetResourcePackUnbindingAdvertisementListRequestAsync,
    sendPostChangeResourcePackInfoRequestAsync,
};

async function sendGetResourcePackManagementBasicInfoRequestAsync()
{
    try
    {
        SpinnerFunction.showSpinner();
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
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendPostSubmitNewResourcePackRequestAsync(resourcePackName, advertisementIdListArray, tagIdListArray)
{
    try
    {
        SpinnerFunction.showSpinner();
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
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendGetResourcePackListRequestAsync()
{
    try
    {
        SpinnerFunction.showSpinner();
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
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendGetResourcePackTagListRequestAsync(resourcePackId)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code, data} = await Function.getAsync(GET_RESOURCE_PACK_TAG_LIST, false, {
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: resourcePackId,
        });

        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return data;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
                WarningAlert.pop('参数无效');
                return null;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('资源包不存在');
                return null;
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
                WarningAlert.pop('获取资源包标签列表失败');
                return null;
            }
        }
    }
    catch (e)
    {
        WarningAlert.pop('获取资源包标签列表失败');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendGetResourcePackAdvertisementListRequestAsync(resourcePackId)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code, data} = await Function.getAsync(GET_RESOURCE_PACK_ADVERTISEMENT_LIST, false, {
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: resourcePackId,
        });
        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return data;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
                WarningAlert.pop('参数无效');
                return null;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('资源包不存在');
                return null;
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
                WarningAlert.pop('获取资源包广告列表失败');
                return null;
            }
        }
    }
    catch (e)
    {
        WarningAlert.pop('获取资源包广告列表失败');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendGetResourcePackScreenListRequestAsync(resourcePackId)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code, data} = await Function.getAsync(GET_RESOURCE_PACK_SCREEN_LIST, false, {
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: resourcePackId,
        });

        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return data;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
                WarningAlert.pop('参数无效');
                return null;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('资源包不存在');
                return null;
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
                WarningAlert.pop('获取资源包屏幕列表失败');
                return null;
            }
        }
    }
    catch (e)
    {
        WarningAlert.pop('获取资源包屏幕列表失败');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendGetResourcePackUnbindingTagListRequestAsync(resourcePackId)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code, data} = await Function.getAsync(GET_RESOURCE_PACK_UNBINDING_TAG_LIST, false, {
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: resourcePackId,
        });

        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return data;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
                WarningAlert.pop('参数无效');
                return null;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('资源包不存在');
                return null;
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
                WarningAlert.pop('获取资源包未绑定标签列表失败');
                return null;
            }
        }
    }
    catch (e)
    {
        WarningAlert.pop('获取资源包未绑定标签列表失败');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendGetResourcePackUnbindingAdvertisementListRequestAsync(resourcePackId)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code, data} = await Function.getAsync(GET_RESOURCE_PACK_UNBINDING_ADVERTISEMENT_LIST, false, {
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: resourcePackId,
        });
        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                return data;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
                WarningAlert.pop('参数无效');
                return null;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('资源包不存在');
                return null;
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
                WarningAlert.pop('获取资源包未绑定广告列表失败');
                return null;
            }
        }
    }
    catch (e)
    {
        WarningAlert.pop('获取资源包未绑定广告列表失败');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendPostChangeResourcePackInfoRequestAsync(resourcePackId, resourcePackName, resourcePackDescription, resourcePackTagIdListArray, resourcePackAdvertisementIdListArray)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code} = await Function.postAsync(CHANGE_RESOURCE_PACK_INFO, {
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: resourcePackId,// 被修改的资源包 ID
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.NAME]: resourcePackName,// 新资源包名
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.DESCRIPTION]: resourcePackDescription,// 新资源包备注
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.LIST.TAG_ID]: resourcePackTagIdListArray, // 绑定标签的列表，内含所有绑定的标签 ID
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.LIST.ADVERTISEMENT_ID]: resourcePackAdvertisementIdListArray, // 绑定广告的列表，内含所有绑定的广告 ID
        });

        switch (code)
        {
            case STATUS_CODE.SUCCESS:
            {
                SuccessAlert.pop('修改资源包成功');
                return true;
            }
            case STATUS_CODE.INVALID_SESSION:
            {
                WarningAlert.pop('请先登录');
                redirectToLogin();
                return null;
            }
            case STATUS_CODE.CONTENT_NOT_FOUND:
            {
                WarningAlert.pop('资源包不存在');
                return null;
            }
            case STATUS_CODE.WRONG_PARAMETER:
            {
                WarningAlert.pop('参数错误');
                return null;
            }
            case STATUS_CODE.REJECTION:
            {
                WarningAlert.pop('权限不足');
                return null;
            }
            case STATUS_CODE.INTERNAL_SERVER_ERROR:
            {
                DangerAlert.pop('服务器错误');
                return null;
            }
            default:
            {
                WarningAlert.pop('修改资源包失败');
                return null;
            }
        }
    }
    catch (e)
    {
        WarningAlert.pop('修改资源包失败');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}