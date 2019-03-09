import {STATUS_CODE} from '../../Static/Constants';
import {browserHistory} from 'react-router';
import Function from '../../Function';
import {FORGET_PASSWORD, GET_VERIFICATION_CODE, LOGIN, LOGOUT, SIGN_UP, VERIFY_SESSION} from './Route';
import {setOffline, setOnline} from '../../Pages/Login/Function';
import NAMESPACE from '../../Namespace';
import {DangerAlert, SuccessAlert, WarningAlert} from '../../Components/Alerts';
import {Function as SpinnerFunction} from '../../Components/GrowingSpinner';

export default {
    sendPostLoginRequestAsync,
    sendPostGetVerificationCodeRequestAsync,
    sendPostSignUpRequestAsync,
    sendPostForgetPasswordRequestAsync,
    sendGetVerifySessionRequestAsync,
    sendPostLogoutRequestAsync,
};

async function sendPostGetVerificationCodeRequestAsync(email)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code} = await Function.postAsync(GET_VERIFICATION_CODE, {
            [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: email,
        });
        if (code === STATUS_CODE.SUCCESS)
        {
            return true;
        }
        else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            DangerAlert.pop('服务器错误');
            return null;
        }
    }
    catch (e)
    {
        WarningAlert.pop('获取验证码失败，请重试');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendPostForgetPasswordRequestAsync(email, newPassword, verificationCode)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code} = await Function.postAsync(FORGET_PASSWORD, {
            [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: email,
            [NAMESPACE.ACCOUNT.VERIFICATION.NEW_PASSWORD]: Function.getSHA256(newPassword),
            [NAMESPACE.ACCOUNT.VERIFICATION.VERIFICATION_CODE]: verificationCode,
        });

        if (code === STATUS_CODE.SUCCESS)
        {
            SuccessAlert.pop('找回密码成功');
            setTimeout(() =>
            {
                browserHistory.push('/');
            }, 1000);
            return true;
        }
        else if (code === STATUS_CODE.REJECTION)
        {
            WarningAlert.pop('验证码错误');
            return null;
        }
        else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
        {
            WarningAlert.pop('用户不存在');
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
        WarningAlert.pop('提交失败，请重试');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendPostSignUpRequestAsync(email, password, verificationCode)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code} = await Function.postAsync(SIGN_UP, {
            [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: email,
            [NAMESPACE.ACCOUNT.ACCOUNT.PASSWORD]: Function.getSHA256(password),
            [NAMESPACE.ACCOUNT.VERIFICATION.VERIFICATION_CODE]: verificationCode,
        });
        if (code === STATUS_CODE.SUCCESS)
        {
            SuccessAlert.pop('注册成功');
            setTimeout(() =>
            {
                browserHistory.push('/login');
            }, 1000);
            return true;
        }
        else if (code === STATUS_CODE.WRONG_PARAMETER)
        {
            WarningAlert.pop('请填写邮箱');
            return null;
        }
        else if (code === STATUS_CODE.REJECTION)
        {
            WarningAlert.pop('验证码错误');
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
        WarningAlert.pop('提交失败，请重试');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendPostLoginRequestAsync(email, password)
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code} = await Function.postAsync(LOGIN, {
            [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: email,
            [NAMESPACE.ACCOUNT.ACCOUNT.PASSWORD]: password,
        });

        if (code === STATUS_CODE.SUCCESS)
        {
            return true;
        }
        else
        {
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
            return null;
        }
    }
    catch (e)
    {
        WarningAlert.pop('登录失败');
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendGetVerifySessionRequestAsync()
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code} = await Function.getAsync(VERIFY_SESSION, false);
        if (code === STATUS_CODE.SUCCESS)
        {
            setOnline();
            return true;
        }
        else if (code === STATUS_CODE.INVALID_SESSION)
        {
            setOffline();
            return false;
        }
        else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
        {
            DangerAlert.pop('服务器错误');
            return null;
        }
    }
    catch (e)
    {
        console.log(e);
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}

async function sendPostLogoutRequestAsync()
{
    try
    {
        SpinnerFunction.showSpinner();
        const {code} = await Function.postAsync(LOGOUT);
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
    }
    catch (e)
    {
        console.log(e);
        WarningAlert.pop('退出失败，请重试');
        return null;
    }
    finally
    {
        SpinnerFunction.hideSpinner();
    }
}
