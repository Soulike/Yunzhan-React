import {STATUS_CODE} from '../../../Static/Constants';
import {redirectToLogin} from '../../../Pages/Login/Functions';
import Functions from '../../../Functions';
import {
    ADD_SCREEN,
    BIND_RESOURCE_PACK,
    DELETE_SCREEN,
    GET_BASIC_INFO,
    GET_LOG_LIST,
    GET_RESOURCE_PACK_LIST,
    GET_SCREEN_LIST,
    START_SCREEN,
    STOP_SCREEN,
    UNBIND_RESOURCE_PACK,
} from './Route';
import NAMESPACE from '../../../Namespace';
import {refreshScreenList} from '../../../Pages/ScreenManagement/Components/ScreenListCard/Functions';
import {DangerAlert, SuccessAlert, WarningAlert} from '../../../Components/Alerts';

const {getAsync, postAsync} = Functions;

export default {
    sendGetScreenBasicInfoRequest,
    sendGetScreenLogListRequest,
    sendGetScreenListRequestAsync,
    sendPostUnbindResourcePackRequest,
    sendPostBindResourcePackRequest,
    sendPostAddScreenRequest,
    sendPostDeleteScreenRequest,
    sendPostStartScreenRequest,
    sendPostStopScreenRequest,
    sendGetResourcePackListRequest,
    sendBindResourcePackRequest,
};

function sendGetScreenBasicInfoRequest()
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
            WarningAlert.pop('获取屏幕基本信息失败');
            console.log(e);
        });
}

function sendGetScreenLogListRequest()
{
    getAsync(GET_LOG_LIST, false)
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
            WarningAlert.pop('获取最新消息失败');
            console.log(e);
        });
}

async function sendGetScreenListRequestAsync(dispatch, successAction, failAction)
{
    try
    {
        const res = await getAsync(GET_SCREEN_LIST, false);
        const {code, data} = res;
        const {[NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN]: screenList} = data;
        if (code === STATUS_CODE.SUCCESS)
        {
            dispatch(successAction(screenList));
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            WarningAlert.pop('请先登录');
            dispatch(failAction());
            redirectToLogin();
        }
        else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            DangerAlert.pop('服务器错误');
            dispatch(failAction());
        }
    }
    catch (e)
    {
        WarningAlert.pop('获取屏幕列表失败');
        dispatch(failAction());
        console.log(e);
    }
}

function sendPostUnbindResourcePackRequest()
{
    const {
        [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN]: screenIdList,
    } = this.state;
    postAsync(UNBIND_RESOURCE_PACK, {[NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN_ID]: screenIdList})
        .then(res =>
        {
            const {code} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                SuccessAlert.pop('解绑成功');
                refreshScreenList();
            }
            else if (code === STATUS_CODE.INVALID_SESSION)
            {
                WarningAlert.pop('请先登录');
                redirectToLogin();
            }
            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
            {
                WarningAlert.pop('屏幕不存在');
                refreshScreenList();
            }
            else if (code === STATUS_CODE.REJECTION)
            {
                WarningAlert.pop('你无权解绑该屏幕的资源包');
                refreshScreenList();
            }
        })
        .catch(e =>
        {
            WarningAlert.pop('解绑失败');
            console.log(e);
        });
}

function sendPostBindResourcePackRequest()
{
    const {
        selectedResourcePackId,
    } = this.props;
    const {
        [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN]: screenIdList,
    } = this.state;

    postAsync(BIND_RESOURCE_PACK, {
        [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN]: screenIdList,
        [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: selectedResourcePackId,
    })
        .then(res =>
        {
            const {code} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                SuccessAlert.pop('绑定成功');
            }
            else if (code === STATUS_CODE.INVALID_SESSION)
            {
                WarningAlert.pop('请先登录');
                redirectToLogin();
            }
            else if (code === STATUS_CODE.REJECTION)
            {
                WarningAlert.pop('由于权限问题，绑定失败');
            }
            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
            {
                WarningAlert.pop('资源包或屏幕不存在，绑定失败');
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                DangerAlert.pop('服务器错误');
            }
        })
        .catch(e =>
        {
            WarningAlert.pop('绑定失败');
            console.log(e);
        });
}

function sendPostAddScreenRequest()
{
    const {[NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: uuid} = this.state;
    postAsync(ADD_SCREEN, {[NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: uuid})
        .then(res =>
        {
            const {code} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                SuccessAlert.pop('添加成功');
                refreshScreenList();
            }
            else if (code === STATUS_CODE.WRONG_PARAMETER)
            {
                WarningAlert.pop('参数无效');
            }
            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
            {
                WarningAlert.pop('UUID 对应的屏幕不存在');
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                DangerAlert.pop('服务器错误');
            }
        })
        .catch(e =>
        {
            DangerAlert.pop('添加失败');
            console.log(e);
        });
}

function sendPostDeleteScreenRequest()
{
    const {selectedScreenIdSet} = this.props;
    postAsync(DELETE_SCREEN, {
        [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN_ID]: Array.from(selectedScreenIdSet.keys()),
    })
        .then(res =>
        {
            const {code} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                SuccessAlert.pop('删除成功');
                refreshScreenList();
            }
            else if (code === STATUS_CODE.REJECTION)
            {
                WarningAlert.pop('不能删除他人屏幕');
                refreshScreenList();
            }
            else if (code === STATUS_CODE.INVALID_SESSION)
            {
                WarningAlert.pop('请先登录');
                redirectToLogin();
            }
            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
            {
                WarningAlert.pop('被删除屏幕不存在');
                refreshScreenList();
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                DangerAlert.pop('服务器错误');
            }
        })
        .catch(e =>
        {
            WarningAlert.pop('删除失败');
            console.log(e);
        });
}

function sendPostStartScreenRequest()
{
    const {selectedScreenIdSet} = this.props;
    postAsync(START_SCREEN, {
        [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN_ID]: Array.from(selectedScreenIdSet.keys()),
    })
        .then(res =>
        {
            const {code} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                SuccessAlert.pop('全部开始播放成功');
                refreshScreenList();
            }
            else if (code === STATUS_CODE.REJECTION)
            {
                WarningAlert.pop('部分开始播放失败，请确认所有屏幕上 APP 处于运行状态');
                refreshScreenList();
            }
            else if (code === STATUS_CODE.INVALID_SESSION)
            {
                WarningAlert.pop('请先登录');
                redirectToLogin();
            }
            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
            {
                WarningAlert.pop('部分开始播放屏幕不存在');
                refreshScreenList();
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                DangerAlert.pop('服务器错误');
            }
        })
        .catch(e =>
        {
            WarningAlert.pop('开始播放失败');
            console.log(e);
        });
}

function sendPostStopScreenRequest()
{
    const {selectedScreenIdSet} = this.props;
    postAsync(STOP_SCREEN, {
        [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN_ID]: Array.from(selectedScreenIdSet.keys()),
    })
        .then(res =>
        {
            const {code} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                SuccessAlert.pop('全部停止播放成功');
                refreshScreenList();
            }
            else if (code === STATUS_CODE.REJECTION)
            {
                WarningAlert.pop('部分停止播放失败，请确认所有屏幕的网络状态');
                refreshScreenList();
            }
            else if (code === STATUS_CODE.INVALID_SESSION)
            {
                WarningAlert.pop('请先登录');
                redirectToLogin();
            }
            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
            {
                WarningAlert.pop('部分停止播放屏幕不存在');
                refreshScreenList();
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                DangerAlert.pop('服务器错误');
            }
        })
        .catch(e =>
        {
            WarningAlert.pop('停止播放失败');
            console.log(e);
        });
}

function sendGetResourcePackListRequest()
{
    getAsync(GET_RESOURCE_PACK_LIST, false)
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
            WarningAlert.pop('获取资源包列表失败');
            console.log(e);
        });
}

function sendBindResourcePackRequest()
{
    const {selectedResourcePackId, selectedScreenIdSet} = this.props;
    postAsync(BIND_RESOURCE_PACK, {
        [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN_ID]: Array.from(selectedScreenIdSet.keys()),
        [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: selectedResourcePackId,
    })
        .then(res =>
        {
            const {code} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                SuccessAlert.pop('绑定成功');
            }
            else if (code === STATUS_CODE.INVALID_SESSION)
            {
                WarningAlert.pop('请先登录');
                redirectToLogin();
            }
            else if (code === STATUS_CODE.REJECTION)
            {
                WarningAlert.pop('由于权限问题，绑定失败');
            }
            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
            {
                WarningAlert.pop('资源包或屏幕不存在，绑定失败');
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                DangerAlert.pop('服务器错误');
            }
        })
        .catch(e =>
        {
            WarningAlert.pop('绑定失败');
            console.log(e);
        });
}
