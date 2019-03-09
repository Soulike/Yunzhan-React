import React, {Component} from 'react';
import Style from './Login.module.scss';
import {Link} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {login} from './Actions/Actions';
import Functions from '../../Function';
import {REGEX, REGEX_TEXT} from '../../Config';
import {WarningAlert} from '../../Components/Alerts';
import {View as Card} from '../../Components/Card';
import {View as ToolTip} from '../../Components/Tooltip';

const {getSHA256} = Functions;

class Login extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            email: '',
            password: '',
        };
    }

    componentDidMount()
    {
        document.title = '登录 - 云展';
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

    onFormSubmit = e =>
    {
        e.preventDefault();
        const {email, password} = this.state;
        if (!REGEX.EMAIL.test(email))
        {
            WarningAlert.pop('请输入正确的邮箱');
        }
        else if (!REGEX.PASSWORD.test(password))
        {
            WarningAlert.pop('请输入正确的密码');
        }
        else
        {
            this.props.onFormSubmit(email, getSHA256(password));
        }

    };

    onSubmitButtonClick = e =>
    {
        this.onFormSubmit(e);
    };

    render()
    {
        return (
            <div className={Style.Login}>
                <div className={Style.titleWrapper}>
                    <FontAwesomeIcon icon={solidIcon.faDove} className={Style.icon} />
                    <div className={Style.title}>登录到云展</div>
                </div>
                <Card className={Style.formWrapper}>
                    <form action="#" onSubmit={this.onFormSubmit}>
                        <div className={Style.inputWrapper}>
                            <div className={Style.label}>邮箱</div>
                            <input type="text" className={Style.input} onChange={this.onEmailChange} autoFocus />
                        </div>
                        <div className={Style.inputWrapper}>
                            <div className={Style.label}>密码
                                <div className={Style.forgetPassword}><Link onlyActiveOnIndex={false}
                                                                            to={'/forgetPassword'}>
                                    忘记密码了？</Link>
                                </div>
                            </div>
                            <ToolTip placement={'top'} title={REGEX_TEXT.PASSWORD}>
                                <input type="password" className={Style.input} onChange={this.onPasswordChange} />
                            </ToolTip>
                        </div>
                        <button className={Style.submitButton} onClick={this.onSubmitButtonClick}>登录</button>
                    </form>
                </Card>

                <Card className={Style.hint}>
                    新用户？<Link onlyActiveOnIndex={false} to={'/signUp'}>注册个账号吧</Link>
                </Card>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        onFormSubmit: (email, password) =>
        {
            dispatch(login(email, password));
        },
    };
};

export default connect(null, mapDispatchToProps)(Login);
