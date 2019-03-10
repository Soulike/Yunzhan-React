import Function from '../../Function';
import {loginStateInvalid, loginStateValid} from './Actions/Actions';
import {browserHistory} from 'react-router';
import Store from '../../Store';
import RequestProcessors from '../../RequestProcessor';
import {SuccessAlert} from '../../Components/Bootstrap/Alerts';

export async function requireLogin(nextState, replace)
{
    const {hasLoggedIn} = Store.getState()['Login'];
    if (!isLoginTokenValid()) // Token 无效，直接要求登录
    {
        SuccessAlert.pop('请先登录');
        setOffline();
        replace('/login');
    }
    else if (isLoginTokenValid() && !hasLoggedIn) // Token 有效，但 Store 中状态无效，那么可能是刷新导致
    {
        await RequestProcessors.sendGetVerifySessionRequestAsync();
    }
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

function setLoginToken()
{
    const date = new Date();
    const str = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const hash = Function.getHash(str, 'md5');
    sessionStorage.setItem('loginToken', hash);
}

function isLoginTokenValid()
{
    const date = new Date();
    const str = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const hash = Function.getHash(str, 'md5');
    const token = sessionStorage.getItem('loginToken');
    return hash === token;
}

function removeLoginToken()
{
    sessionStorage.removeItem('loginToken');
}
