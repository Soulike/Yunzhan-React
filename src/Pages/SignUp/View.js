import React, {Component} from 'react';
import style from './Signup.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {browserHistory, Link} from 'react-router';
import {getAsync, getSHA256, postAsync} from '../../Static/Functions';
import {View as Alert} from '../../Components/Alert';
import Regex from '../../Static/Regex';
import {accountRequestPrefix} from '../../Static/AccountShare/AccountShare';
import {STATUS_CODE} from '../../Static/Constants';

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
        getAsync(accountRequestPrefix('/getVerificationCode'), false)
            .then(res =>
            {
                const {code} = res;
                if (code === STATUS_CODE.SUCCESS)
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
    };


    onFormSubmit = e =>
    {
        e.preventDefault();
        const {email, password, repeatPassword, verificationCode} = this.state;
        if (password !== repeatPassword)
        {
            Alert.show('两次输入密码不一致', false);
        }
        else if (!Regex.EMAIL.test(email))
        {
            Alert.show('请输入正确的邮箱', false);
        }
        else if (!Regex.PASSWORD.test(password))
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
                password: getSHA256(password),
                verificationCode
            };

            postAsync(accountRequestPrefix('/signUp'), requestBody)
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
