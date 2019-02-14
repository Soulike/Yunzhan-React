import {STATUS_CODE} from '../../Static/Constants';
import {browserHistory} from 'react-router';
import Functions from '../../Functions';
import {FORGET_PASSWORD, GET_VERIFICATION_CODE, LOGIN, LOGOUT, SIGN_UP, VERIFY_SESSION} from './Route';
import {setOffline, setOnline} from '../../Pages/Login/Functions';
import NAMESPACE from '../../Namespace';
import {DangerAlert, SuccessAlert, WarningAlert} from '../../Components/Alerts';

const {getAsync, postAsync, getSHA256} = Functions;

export default {
    sendPostLoginRequestAsync,
    sendGetVerificationCodeRequest,
    sendPostSignUpRequest,
    sendPostForgetPasswordRequest,
    sendGetVerifySessionRequest,
    sendPostLogoutRequest,
};

function sendGetVerificationCodeRequest($getCodeButton)
{
    getAsync(GET_VERIFICATION_CODE, false)
        .then(res =>
        {
            const {code} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                $getCodeButton.setAttribute('disabled', 'disabled');
                const secondsBeforeNextGetting = 30;
                let secondsLeft = secondsBeforeNextGetting;
                const interval = setInterval(() =>
                {
                    $getCodeButton.innerHTML = secondsLeft.toString();
                    secondsLeft--;
                }, 1000);

                setTimeout(() =>
                {
                    clearInterval(interval);
                    $getCodeButton.removeAttribute('disabled');
                    $getCodeButton.innerHTML = '获取验证码';
                }, secondsBeforeNextGetting * 1000);
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                DangerAlert.pop('服务器错误');
            }
        })
        .catch(e =>
        {
            WarningAlert.pop('获取验证码失败，请重试');
            console.log(e);
        });
}

function sendPostForgetPasswordRequest()
{
    const {email, newPassword, verificationCode} = this.state;
    postAsync(FORGET_PASSWORD, {
        [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: email,
        [NAMESPACE.ACCOUNT.VERIFICATION.NEW_PASSWORD]: getSHA256(newPassword),
        [NAMESPACE.ACCOUNT.VERIFICATION.VERIFICATION_CODE]: verificationCode,
    })
        .then(res =>
        {
            const {code} = res;

            if (code === STATUS_CODE.SUCCESS)
            {
                SuccessAlert.pop('找回密码成功');
                setTimeout(() =>
                {
                    browserHistory.push('/');
                }, 1000);
            }
            else if (code === STATUS_CODE.REJECTION)
            {
                WarningAlert.pop('验证码错误');
            }
            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
            {
                WarningAlert.pop('用户不存在');
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                DangerAlert.pop('服务器错误');
            }
        })
        .catch(e =>
        {
            WarningAlert.pop('提交失败，请重试');
            console.log(e);
        });
}

function sendPostSignUpRequest()
{
    const {email, password, verificationCode} = this.state;
    postAsync(SIGN_UP, {
        [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: email,
        [NAMESPACE.ACCOUNT.VERIFICATION.PASSWORD]: getSHA256(password),
        [NAMESPACE.ACCOUNT.VERIFICATION.VERIFICATION_CODE]: verificationCode,
    })
        .then(res =>
        {
            const {code} = res;

            if (code === STATUS_CODE.SUCCESS)
            {
                SuccessAlert.pop('注册成功');
                setTimeout(() =>
                {
                    browserHistory.push('/login');
                }, 1000);
            }
            else if (code === STATUS_CODE.REJECTION)
            {
                WarningAlert.pop('验证码错误');
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                DangerAlert.pop('服务器错误');
            }
        })
        .catch(e =>
        {
            WarningAlert.pop('提交失败，请重试');
            console.log(e);
        });
}

async function sendPostLoginRequestAsync(dispatch, successAction, failAction, email, password)
{
    try
    {
        const res = await postAsync(LOGIN, {
            [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: email,
            [NAMESPACE.ACCOUNT.ACCOUNT.PASSWORD]: password,
        });

        const {code} = res;
        if (code === STATUS_CODE.SUCCESS)
        {
            dispatch(successAction());
            setOnline();
            browserHistory.push('/');
        }
        else
        {
            dispatch(failAction());

            if (code === STATUS_CODE.REJECTION)
            {
                WarningAlert.pop('密码错误');
            }
            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
            {
                WarningAlert.pop('用户不存在');
            }
            else if (code === STATUS_CODE.WRONG_PARAMETER)
            {
                WarningAlert.pop('参数无效');
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                DangerAlert.pop('服务器错误');
            }
        }
    }
    catch (e)
    {
        dispatch(failAction());
        WarningAlert.pop('登录失败');
        console.log(e);
    }
}

function sendGetVerifySessionRequest()
{
    getAsync(VERIFY_SESSION, false)
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
                DangerAlert.pop('服务器错误');
            }
        });
}

function sendPostLogoutRequest()
{
    postAsync(LOGOUT)
        .then(res =>
        {
            const {code} = res;
            if (code === STATUS_CODE.SUCCESS)
            {
                SuccessAlert.pop('退出成功');
                setOffline();
                browserHistory.push('/login');
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                DangerAlert.pop('服务器错误');
            }
        })
        .catch(e =>
        {
            console.log(e);
            WarningAlert.pop('退出失败，请重试');
        });
}
