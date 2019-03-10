import React, {Component} from 'react';
import {Link} from 'react-router';
import Style from './ForgetPassword.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {REGEX, REGEX_TEXT} from '../../Config';
import RequestProcessor from '../../RequestProcessor';
import {WarningAlert} from '../../Components/Bootstrap/Alerts';
import Card from '../../Components/Bootstrap/Card/View';
import {View as ToolTip} from '../../Components/Bootstrap/Tooltip';

class ForgetPassword extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            email: '',
            newPassword: '',
            repeatNewPassword: '',
            verificationCode: '',
        };
    }

    onEmailChange = e =>
    {
        this.setState({
            email: e.target.value,
        });
    };

    componentDidMount()
    {
        document.title = '找回密码 - 云展';
    }

    onNewPasswordChange = e =>
    {
        this.setState({
            newPassword: e.target.value,
        });
    };

    onRepeatNewPasswordChange = e =>
    {
        this.setState({
            repeatNewPassword: e.target.value,
        });
    };

    onVerificationCodeChange = e =>
    {
        this.setState({
            verificationCode: e.target.value,
        });
    };

    onGetCodeButtonClick = async e =>
    {
        e.preventDefault();
        const {email} = this.state;
        const $getCodeButton = document.querySelector(`.${Style.getCodeButton}`);
        const requestIsSuccessful = await RequestProcessor.sendPostGetVerificationCodeRequestAsync(email);
        if (requestIsSuccessful)
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
    };

    onFormSubmit = async e =>
    {
        e.preventDefault();
        const {email, newPassword, repeatNewPassword, verificationCode} = this.state;
        if (newPassword !== repeatNewPassword)
        {
            WarningAlert.pop('两次输入密码不一致');
        }
        else if (!REGEX.EMAIL.test(email))
        {
            WarningAlert.pop('请输入正确的邮箱');
        }
        else if (!REGEX.PASSWORD.test(newPassword))
        {
            WarningAlert.pop('请输入正确的新密码');
        }
        else if (!REGEX.VERIFICATION_CODE.test(verificationCode))
        {
            WarningAlert.pop('请输入正确的验证码');
        }
        else
        {
            await RequestProcessor.sendPostForgetPasswordRequestAsync(email, newPassword, verificationCode);
        }
    };

    onSubmitButtonClick = async e =>
    {
        await this.onFormSubmit(e);
    };

    render()
    {
        return (
            <div className={Style.ForgetPassword}>
                <div className={Style.titleWrapper}>
                    <FontAwesomeIcon icon={solidIcon.faDove} className={Style.icon} />
                    <div className={Style.title}>找回密码</div>
                </div>
                <Card className={Style.formWrapper}>
                    <form action="#" onSubmit={this.onFormSubmit}>
                        <div className={Style.inputWrapper}>
                            <div className={Style.label}>邮箱</div>
                            <input type="text" className={Style.input} onChange={this.onEmailChange} autoFocus />
                        </div>
                        <div className={Style.inputWrapper}>
                            <div className={Style.label}>新密码</div>
                            <ToolTip placement={'top'} title={REGEX_TEXT.PASSWORD}>
                                <input type="password" className={Style.input} onChange={this.onNewPasswordChange} />
                            </ToolTip>
                        </div>
                        <div className={Style.inputWrapper}>
                            <div className={Style.label}>重复新密码
                            </div>
                            <input type="password" className={Style.input} onChange={this.onRepeatNewPasswordChange} />
                        </div>
                        <div className={Style.inputWrapper}>
                            <div className={Style.label}>验证码</div>
                            <input type="password"
                                   className={Style.codeInput}
                                   onChange={this.onVerificationCodeChange} />
                            <button className={Style.getCodeButton} onClick={this.onGetCodeButtonClick}>获取验证码</button>
                        </div>
                        <button className={Style.submitButton} onClick={this.onSubmitButtonClick}>提交</button>
                    </form>
                </Card>
                <Card className={Style.hint}>
                    已有账号？<Link onlyActiveOnIndex={false} to={'/login'}>登录</Link><br />
                    新用户？<Link onlyActiveOnIndex={false} to={'/signUp'}>注册个账号吧</Link>
                </Card>
            </div>
        );
    }
}

export default ForgetPassword;
