import {STATUS_CODE} from '../../Static/Constants';
import {browserHistory} from 'react-router';
import {View as Alert} from '../../Components/Alert';
import Functions from '../../Functions';
import {GET_VERIFICATION_CODE, LOGIN, SIGN_UP} from './Route';
import {accountRequestPrefix} from '../../Static/AccountShare/AccountShare';
import {setOffline, setOnline} from '../../Pages/Login/Functions';
import NAMESPACE from '../../Namespace';

const {requestPrefix, getAsync, postAsync, getSHA256} = Functions;

export default {
    sendPostLoginRequestAsync,
    sendGetVerificationCodeRequest,
    sendPostSignUpRequest,
    sendPostForgetPasswordRequest,
    sendGetVerifySessionRequest,
    sendPostLogoutRequest
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
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            Alert.show('获取验证码失败，请重试', false);
            console.log(e);
        });
}

function sendPostForgetPasswordRequest()
{
    const {email, newPassword, verificationCode} = this.state;
    postAsync(accountRequestPrefix('/forgetPassword'), {
        [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: email,
        [NAMESPACE.ACCOUNT.VERIFICATION.NEW_PASSWORD]: getSHA256(newPassword),
        [NAMESPACE.ACCOUNT.VERIFICATION.VERIFICATION_CODE]: verificationCode
    })
        .then(res =>
        {
            const {code} = res;

            if (code === STATUS_CODE.SUCCESS)
            {
                Alert.show('找回密码成功', true);
                setTimeout(() =>
                {
                    browserHistory.push('/');
                }, 1000);
            }
            else if (code === STATUS_CODE.REJECTION)
            {
                Alert.show('验证码错误', false);
            }
            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
            {
                Alert.show('用户不存在', false);
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            Alert.show('提交失败，请重试', false);
            console.log(e);
        });
}

function sendPostSignUpRequest()
{
    const {email, password, verificationCode} = this.state;
    postAsync(SIGN_UP, {
        [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: email,
        [NAMESPACE.ACCOUNT.VERIFICATION.PASSWORD]: getSHA256(password),
        [NAMESPACE.ACCOUNT.VERIFICATION.VERIFICATION_CODE]: verificationCode
    })
        .then(res =>
        {
            const {code} = res;

            if (code === STATUS_CODE.SUCCESS)
            {
                Alert.show('注册成功', true);
                setTimeout(() =>
                {
                    browserHistory.push('/');
                }, 1000);
            }
            else if (code === STATUS_CODE.REJECTION)
            {
                Alert.show('验证码错误', false);
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        })
        .catch(e =>
        {
            Alert.show('提交失败，请重试', false);
            console.log(e);
        });
}

async function sendPostLoginRequestAsync(dispatch, successAction, failAction, email, password)
{
    try
    {
        const res = await postAsync(LOGIN, {
            [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: email,
            [NAMESPACE.ACCOUNT.ACCOUNT.PASSWORD]: password
        });

        const {code} = res;
        if (code === STATUS_CODE.SUCCESS)
        {
            dispatch(successAction());
            browserHistory.push('/');
        }
        else
        {
            dispatch(failAction());

            if (code === STATUS_CODE.REJECTION)
            {
                Alert.show('密码错误', false);
            }
            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
            {
                Alert.show('用户不存在', false);
            }
            else if (code === STATUS_CODE.WRONG_PARAMETER)
            {
                Alert.show('参数无效', false);
            }
            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
            {
                Alert.show('服务器错误', false);
            }
        }
    }
    catch (e)
    {
        dispatch(failAction());
        Alert.show('登录失败', false);
        console.log(e);
    }
}

function sendGetVerifySessionRequest()
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

function sendPostLogoutRequest()
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
