import {STATUS_CODE} from '../../../Config';
import {redirectToLogin} from '../../../Pages/Login/Function';
import {DangerAlert, SuccessAlert, WarningAlert} from '../../../Components/Bootstrap/Alerts';
import Function from '../../../Function';
import {CHANGE_TAG_INFO, GET_BASIC_INFO, GET_TAG_INFO, GET_TAG_LIST, SUBMIT_NEW_TAG} from './Route';
import NAMESPACE from '../../../Namespace';
import {Function as SpinnerFunction} from '../../../Components/Bootstrap/GrowingSpinner';

export default {
    sendGetTagBasicInfoRequestAsync,
    sendPostSubmitNewTagRequestAsync,
    sendGetTagListRequestAsync,
    sendGetTagInfoRequestAsync,
    sendPostChangeTagInfoRequestAsync,
};

async function sendGetTagBasicInfoRequestAsync()
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
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendPostSubmitNewTagRequestAsync(tagName)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code} = await Function.postAsync(SUBMIT_NEW_TAG, {[NAMESPACE.TAG_MANAGEMENT.TAG.NAME]: tagName});
        if (code === STATUS_CODE.SUCCESS)
        {
            SuccessAlert.pop('添加成功');
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
        else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            DangerAlert.pop('服务器错误');
            return null;
        }
    }
    catch (e)
    {
        WarningAlert.pop('添加失败');
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendGetTagListRequestAsync()
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code, data} = await Function.getAsync(GET_TAG_LIST, false);
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
        WarningAlert.pop('获取标签列表失败');
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendGetTagInfoRequestAsync(tagId)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code, data} = await Function.getAsync(GET_TAG_INFO, false, {[NAMESPACE.TAG_MANAGEMENT.TAG.ID]: tagId});
        if (code === STATUS_CODE.SUCCESS)
        {
            return data;
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
        else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
        {
            WarningAlert.pop('标签不存在');
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
        WarningAlert.pop('获取标签信息失败');
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendPostChangeTagInfoRequestAsync(tagId, tagName)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code} = await Function.postAsync(CHANGE_TAG_INFO, {
            [NAMESPACE.TAG_MANAGEMENT.TAG.ID]: tagId,
            [NAMESPACE.TAG_MANAGEMENT.TAG.NAME]: tagName,
        });

        if (code === STATUS_CODE.SUCCESS)
        {
            SuccessAlert.pop('修改标签信息成功');
            return true;
        }
        else if (code === STATUS_CODE.WRONG_PARAMETER)
        {
            WarningAlert.pop('参数错误');
            return null;
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            WarningAlert.pop('请先登录');
            redirectToLogin();
            return null;
        }
        else if (code === STATUS_CODE.REJECTION)
        {
            WarningAlert.pop('权限不足');
            return null;
        }
        else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
        {
            WarningAlert.pop('标签不存在');
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
        WarningAlert.pop('修改标签信息失败');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}