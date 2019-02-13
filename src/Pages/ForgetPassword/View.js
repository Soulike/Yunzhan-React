import React, {Component} from 'react';
import {Link} from 'react-router';
import style from './ForgetPassword.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import Regex from '../../Static/Regex';
import RequestProcessors from '../../RequestProcessors';
import {WarningAlert} from '../../Components/Alerts';
import Card from '../../Components/Card/View';

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

    onGetCodeButtonClick = e =>
    {
        e.preventDefault();
        const $getCodeButton = document.querySelector(`.${style.getCodeButton}`);
        RequestProcessors.sendGetVerificationCodeRequest.apply(this, [$getCodeButton]);
    };

    onFormSubmit = e =>
    {
        e.preventDefault();
        const {email, newPassword, repeatNewPassword, verificationCode} = this.state;
        if (newPassword !== repeatNewPassword)
        {
            WarningAlert.pop('两次输入密码不一致');
        }
        else if (!Regex.EMAIL.test(email))
        {
            WarningAlert.pop('请输入正确的邮箱');
        }
        else if (!Regex.PASSWORD.test(newPassword))
        {
            WarningAlert.pop('请输入正确的新密码');
        }
        else if (!Regex.VERIFICATION_CODE.test(verificationCode))
        {
            WarningAlert.pop('请输入正确的验证码');
        }
        else
        {
            RequestProcessors.sendPostForgetPasswordRequest.apply(this);
        }
    };

    onSubmitButtonClick = e =>
    {
        this.onFormSubmit(e);
    };

    render()
    {
        return (
            <div className={style.ForgetPassword}>
                <div className={style.titleWrapper}>
                    <FontAwesomeIcon icon={solidIcon.faDove} className={style.icon} />
                    <div className={style.title}>找回密码</div>
                </div>
                <Card className={style.formWrapper}>
                    <form action="#" onSubmit={this.onFormSubmit}>
                        <div className={style.inputWrapper}>
                            <div className={style.label}>邮箱</div>
                            <input type="text" className={style.input} onChange={this.onEmailChange} autoFocus />
                        </div>
                        <div className={style.inputWrapper}>
                            <div className={style.label}>新密码（最少 6 位）
                            </div>
                            <input type="password" className={style.input} onChange={this.onNewPasswordChange} />
                        </div>
                        <div className={style.inputWrapper}>
                            <div className={style.label}>重复新密码
                            </div>
                            <input type="password" className={style.input} onChange={this.onRepeatNewPasswordChange} />
                        </div>
                        <div className={style.inputWrapper}>
                            <div className={style.label}>验证码</div>
                            <input type="password"
                                   className={style.codeInput}
                                   onChange={this.onVerificationCodeChange} />
                            <button className={style.getCodeButton} onClick={this.onGetCodeButtonClick}>获取验证码</button>
                        </div>
                        <button className={style.submitButton} onClick={this.onSubmitButtonClick}>提交</button>
                    </form>
                </Card>
                <Card className={style.hint}>
                    已有账号？<Link onlyActiveOnIndex={false} to={'/login'}>登录</Link><br />
                    新用户？<Link onlyActiveOnIndex={false} to={'/signUp'}>注册个账号吧</Link>
                </Card>
            </div>
        );
    }
}

export default ForgetPassword;
