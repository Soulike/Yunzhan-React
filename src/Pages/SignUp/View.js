import React, {Component} from 'react';
import Style from './Signup.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router';
import {REGEX, REGEX_TEXT} from '../../Config';
import RequestProcessor from '../../RequestProcessor';
import {WarningAlert} from '../../Components/Bootstrap/Alerts';
import {View as Card} from '../../Components/Bootstrap/Card';
import {View as ToolTip} from '../../Components/Bootstrap/Tooltip';


class SignUp extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            email: '',
            password: '',
            repeatPassword: '',
            verificationCode: '',
        };
    }

    componentDidMount()
    {
        document.title = '注册 - 云展';
    }

    onEmailChange = e =>
    {
        this.setState({
            email: e.target.value,
        });
    };

    onPasswordChange = e =>
    {
        this.setState({
            password: e.target.value,
        });
    };

    onRepeatPasswordChange = e =>
    {
        this.setState({
            repeatPassword: e.target.value,
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
        const {email, password, repeatPassword, verificationCode} = this.state;
        if (password !== repeatPassword)
        {
            WarningAlert.pop('两次输入密码不一致');
        }
        else if (!REGEX.EMAIL.test(email))
        {
            WarningAlert.pop('请输入正确的邮箱');
        }
        else if (!REGEX.PASSWORD.test(password))
        {
            WarningAlert.pop('请输入正确的新密码');
        }
        else if (!REGEX.VERIFICATION_CODE.test(verificationCode))
        {
            WarningAlert.pop('请输入正确的验证码');
        }
        else
        {
            await RequestProcessor.sendPostSignUpRequestAsync(email, password, verificationCode);
        }
    };
    onSubmitButtonClick = async e =>
    {
        await this.onFormSubmit(e);
    };

    onVerificationCodeChange = e =>
    {
        this.setState({
            verificationCode: e.target.value,
        });
    };

    render()
    {
        return (
            <div className={Style.SignUp}>
                <div className={Style.titleWrapper}>
                    <FontAwesomeIcon icon={solidIcon.faDove} className={Style.icon} />
                    <div className={Style.title}>注册云展</div>
                </div>
                <Card className={Style.formWrapper}>
                    <form action="#" onSubmit={this.onFormSubmit}>
                        <div className={Style.inputWrapper}>
                            <div className={Style.label}>邮箱</div>
                            <input type="text" className={Style.input} onChange={this.onEmailChange} autoFocus />
                        </div>
                        <div className={Style.inputWrapper}>
                            <div className={Style.label}>密码
                            </div>
                            <ToolTip placement={'top'} title={REGEX_TEXT.PASSWORD}>
                                <input type="password" className={Style.input} onChange={this.onPasswordChange} />
                            </ToolTip>
                        </div>
                        <div className={Style.inputWrapper}>
                            <div className={Style.label}>重复密码
                            </div>
                            <input type="password" className={Style.input} onChange={this.onRepeatPasswordChange} />
                        </div>
                        <div className={Style.inputWrapper}>
                            <div className={Style.label}>验证码</div>
                            <input type="password"
                                   className={Style.codeInput}
                                   onChange={this.onVerificationCodeChange} />
                            <button className={Style.getCodeButton} onClick={this.onGetCodeButtonClick}>获取验证码</button>
                        </div>
                        <button className={Style.submitButton} onClick={this.onSubmitButtonClick}>注册</button>
                    </form>
                </Card>
                <Card className={Style.hint}>
                    已有账号？<Link onlyActiveOnIndex={false} to={'/login'}>登录</Link>
                </Card>
            </div>
        );
    }
}

export default SignUp;
