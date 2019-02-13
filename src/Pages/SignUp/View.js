import React, {Component} from 'react';
import style from './Signup.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router';
import Regex from '../../Static/Regex';
import RequestProcessors from '../../RequestProcessors';
import {WarningAlert} from '../../Components/Alerts';


class SignUp extends Component
{
    onEmailChange = e =>
    {
        this.setState({
            email: e.target.value
        });
    };

    componentDidMount()
    {
        document.title = '注册 - 云展';
    }

    onPasswordChange = e =>
    {
        this.setState({
            newPassword: e.target.value
        });
    };
    onRepeatPasswordChange = e =>
    {
        this.setState({
            repeatNewPassword: e.target.value
        });
    };
    onVerificationCodeChange = e =>
    {
        this.setState({
            verificationCode: e.target.value
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
        const {email, password, repeatPassword, verificationCode} = this.state;
        if (password !== repeatPassword)
        {
            WarningAlert.pop('两次输入密码不一致');
        }
        else if (!Regex.EMAIL.test(email))
        {
            WarningAlert.pop('请输入正确的邮箱');
        }
        else if (!Regex.PASSWORD.test(password))
        {
            WarningAlert.pop('请输入正确的新密码');
        }
        else if (!Regex.VERIFICATION_CODE.test(verificationCode))
        {
            WarningAlert.pop('请输入正确的验证码');
        }
        else
        {
            RequestProcessors.sendPostSignUpRequest.apply(this);
        }
    };
    onSubmitButtonClick = e =>
    {
        this.onFormSubmit(e);
    };

    constructor()
    {
        super(...arguments);
        this.state = {
            email: '',
            newPassword: '',
            repeatNewPassword: '',
            verificationCode: ''
        };
    }

    render()
    {
        return (
            <div className={style.SignUp}>
                <div className={style.titleWrapper}>
                    <FontAwesomeIcon icon={solidIcon.faDove} className={style.icon}/>
                    <div className={style.title}>注册云展</div>
                </div>
                <form action="#" className={style.form} onSubmit={this.onFormSubmit}>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>邮箱</div>
                        <input type="text" className={style.input} onChange={this.onEmailChange}/>
                    </div>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>密码（最少 6 位）
                        </div>
                        <input type="password" className={style.input} onChange={this.onPasswordChange}/>
                    </div>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>重复密码
                        </div>
                        <input type="password" className={style.input} onChange={this.onRepeatPasswordChange}/>
                    </div>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>验证码</div>
                        <input type="password" className={style.codeInput} onChange={this.onVerificationCodeChange}/>
                        <button className={style.getCodeButton} onClick={this.onGetCodeButtonClick}>获取验证码</button>
                    </div>
                    <button className={style.submitButton} onClick={this.onSubmitButtonClick}>注册</button>
                </form>
                <div className={style.hint}>
                    已有账号？<Link onlyActiveOnIndex={false} to={'/login'}>登录</Link>
                </div>
            </div>
        );
    }
}

export default SignUp;
