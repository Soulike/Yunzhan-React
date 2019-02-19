import Functions from '../../Function';
import {loginStateInvalid, loginStateValid} from './Actions/Actions';
import {browserHistory} from 'react-router';
import Store from '../../Store';
import {Functions as ModalFunctions} from '../../Components/Modal';
import RequestProcessors from '../../RequestProcessor';
import {SuccessAlert} from '../../Components/Alerts';
import {MODAL_ID} from '../../Static/Constants';

const {getHash} = Functions;
const {showModal} = ModalFunctions;

export function requireLogin(nextState, replace)
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
        checkLoginState();
    }
}

function checkLoginState()
{
    RequestProcessors.sendGetVerifySessionRequest();
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
    showModal(MODAL_ID.LOGOUT_MODAL);
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
