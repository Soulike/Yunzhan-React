import {getAsync, getSHA256, postAsync, requestPrefix} from '../../Static/Functions';
import {setOffline, setOnline} from './Actions/Actions';
import {browserHistory} from 'react-router';
import {View as Alert} from '../../Components/Alert';
import Store from '../../Store';
import {View as Modal} from '../../Components/Modal';

export function requireLogin(nextState, replace)
{
    if (!isLoginTokenValid())
    {
        Alert.show('请先登录');
        Store.dispatch(setOffline());
        replace('/login');
    }
    else
    {
        getAsync(requestPrefix('/verifySession'), false)
            .then(res =>
            {
                const {isSuccess} = res;
                if (isSuccess)
                {
                    setLoginToken();
                    Store.dispatch(setOnline());
                }
                else
                {
                    Alert.show('请先登录', false);
                    Store.dispatch(setOffline());
                    removeLoginToken();
                    replace('/login');
                }
            });
    }
}

function logout()
{
    postAsync(requestPrefix('/logout'))
        .then(res =>
        {
            const {isSuccess, msg} = res;
            Alert.show(msg, isSuccess);
            if (isSuccess)
            {
                browserHistory.push('/login');
                removeLoginToken();
                Store.dispatch(setOffline());
            }
        })
        .catch(e =>
        {
            console.log(e);
            Alert.show('退出失败，请重试', false);
        });
}

export function showLogoutModal()
{
    Modal.show('确认退出', '您真的要退出云展吗？', logout);
}

function setLoginToken()
{
    sessionStorage.setItem('token', getSHA256(Date.now().toString()));
}

function isLoginTokenValid()
{
    const token = sessionStorage.getItem('token');
    return !!token;
}

function removeLoginToken()
{
    sessionStorage.removeItem('token');
}
