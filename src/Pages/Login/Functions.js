import {getAsync, getHash, postAsync, requestPrefix} from '../../Static/Functions';
import {loginStateInvalid, loginStateValid} from './Actions/Actions';
import {browserHistory} from 'react-router';
import {View as Alert} from '../../Components/Alert';
import Store from '../../Store';
import {View as Modal} from '../../Components/Modal';
import {STATUS_CODE} from '../../Static/Constants';

export function requireLogin(nextState, replace)
{
    const {hasLoggedIn} = Store.getState()['Login'];
    if (!isLoginTokenValid()) // Token 无效，直接要求登录
    {
        Alert.show('请先登录', false);
        setOffline();
        replace('/login');
    }
    else if (isLoginTokenValid() && !hasLoggedIn) // Token 有效，但 Store 中状态无效，那么可能是刷新导致
    {
        checkLoginState();
    }
}

function checkLoginState()
{
    getAsync(requestPrefix('/verifySession'), false)
        .then(res =>
        {
            const {code} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                setOnline();
            }
            else if (code === STATUS_CODE.INVALID_SESSION)
            {
                setOffline();
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        });
}

export function setOnline()
{
    Store.dispatch(loginStateValid());
    setLoginToken();
}

export function setOffline()
{
    Store.dispatch(loginStateInvalid());
    removeLoginToken();
}

export function redirectToLogin()
{
    setOffline();
    browserHistory.push('/login');
}

export function showLogoutModal()
{
    Modal.show('确认退出', '您真的要退出云展吗？', sendLogoutRequest);
}

function sendLogoutRequest()
{
    postAsync(requestPrefix('/logout'))
        .then(res =>
        {
            const {code} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                Alert.show('退出成功', true);
                setOffline();
                browserHistory.push('/login');
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            console.log(e);
            Alert.show('退出失败，请重试', false);
        });
}

function setLoginToken()
{
    const date = new Date();
    const str = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const hash = getHash(str, 'md5');
    sessionStorage.setItem('loginToken', hash);
}

function isLoginTokenValid()
{
    const date = new Date();
    const str = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const hash = getHash(str, 'md5');
    const token = sessionStorage.getItem('loginToken');
    return hash === token;
}

function removeLoginToken()
{
    sessionStorage.removeItem('loginToken');
}
