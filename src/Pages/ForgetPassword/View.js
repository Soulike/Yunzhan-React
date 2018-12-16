import React, {Component} from 'react';
import {browserHistory, Link} from 'react-router';
import style from './ForgetPassword.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {getAsync, getSHA256, postAsync} from '../../Static/Functions';
import {View as Alert} from '../../Components/Alert';
import Regex from '../../Static/Regex';
import {accountRequestPrefix} from '../../Static/AccountShare/AccountShare';


class ForgetPassword extends Component
{
    onEmailChange = e =>
    {
        this.setState({
            email: e.target.value
        });
    };


    componentDidMount()
    {
        document.title = '找回密码 - 云展';
    }

    onNewPasswordChange = e =>
    {
        this.setState({
            newPassword: e.target.value
        });
    };
    onRepeatNewPasswordChange = e =>
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
        getAsync(accountRequestPrefix('/getVerificationCode'), false)
            .then(res =>
            {
                const {isSuccess, msg} = res;
                if (isSuccess)
                {
                    const $getCodeButton = document.querySelector(`.${style.getCodeButton}`);
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
                else
                {
                    Alert.show(msg, false);
                }
            })
            .catch(e =>
            {
                Alert.show('获取验证码失败，请重试', false);
                console.log(e);
            });
    };
    onFormSubmit = e =>
    {
        e.preventDefault();
        const {email, newPassword, repeatNewPassword, verificationCode} = this.state;
        if (newPassword !== repeatNewPassword)
        {
            Alert.show('两次输入密码不一致', false);
        }
        else if (!Regex.EMAIL.test(email))
        {
            Alert.show('请输入正确的邮箱', false);
        }
        else if (!Regex.PASSWORD.test(newPassword))
        {
            Alert.show('请输入正确的新密码', false);
        }
        else if (!Regex.VERIFICATION_CODE.test(verificationCode))
        {
            Alert.show('请输入正确的验证码', false);
        }
        else
        {
            const requestBody = {
                email,
                newPassword: getSHA256(newPassword),
                verificationCode
            };
            postAsync(accountRequestPrefix('/forgetPassword'), requestBody)
                .then(res =>
                {
                    const {isSuccess, msg} = res;
                    Alert.show(msg, isSuccess);
                    if (isSuccess)
                    {
                        setTimeout(() =>
                        {
                            browserHistory.push('/');
                        }, 1000);
                    }
                })
                .catch(e =>
                {
                    Alert.show('提交失败，请重试', false);
                    console.log(e);
                });
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
            <div className={style.ForgetPassword}>
                <div className={style.titleWrapper}>
                    <FontAwesomeIcon icon={solidIcon.faDove} className={style.icon}/>
                    <div className={style.title}>找回密码</div>
                </div>
                <form action="#" className={style.form} onSubmit={this.onFormSubmit}>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>邮箱</div>
                        <input type="text" className={style.input} onChange={this.onEmailChange}/>
                    </div>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>新密码（最少 6 位）
                        </div>
                        <input type="password" className={style.input} onChange={this.onNewPasswordChange}/>
                    </div>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>重复新密码
                        </div>
                        <input type="password" className={style.input} onChange={this.onRepeatNewPasswordChange}/>
                    </div>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>验证码</div>
                        <input type="password" className={style.codeInput} onChange={this.onVerificationCodeChange}/>
                        <button className={style.getCodeButton} onClick={this.onGetCodeButtonClick}>获取验证码</button>
                    </div>
                    <button className={style.submitButton} onClick={this.onSubmitButtonClick}>提交</button>
                </form>
                <div className={style.hint}>
                    已有账号？<Link onlyActiveOnIndex={false} to={'/login'}>登录</Link><br/>
                    新用户？<Link onlyActiveOnIndex={false} to={'/signUp'}>注册个账号吧</Link>
                </div>
            </div>
        );
    }
}

export default ForgetPassword;
