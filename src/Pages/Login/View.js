import React, {Component} from 'react';
import style from './Login.module.scss';
import {Link} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {login} from './Actions/Actions';
import Functions from '../../Functions';
import Regex from '../../Static/Regex';
import {WarningAlert} from '../../Components/Alerts';
import {View as Card} from '../../Components/Card';

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
        if (!Regex.EMAIL.test(email))
        {
            WarningAlert.pop('请输入正确的邮箱');
        }
        else if (!Regex.PASSWORD.test(password))
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
            <div className={style.Login}>
                <div className={style.titleWrapper}>
                    <FontAwesomeIcon icon={solidIcon.faDove} className={style.icon} />
                    <div className={style.title}>登录到云展</div>
                </div>
                <Card className={style.formWrapper}>
                    <form action="#" onSubmit={this.onFormSubmit}>
                        <div className={style.inputWrapper}>
                            <div className={style.label}>邮箱</div>
                            <input type="text" className={style.input} onChange={this.onEmailChange} autoFocus />
                        </div>
                        <div className={style.inputWrapper}>
                            <div className={style.label}>密码
                                <div className={style.forgetPassword}><Link onlyActiveOnIndex={false}
                                                                            to={'/forgetPassword'}>
                                    忘记密码了？</Link>
                                </div>
                            </div>
                            <input type="password" className={style.input} onChange={this.onPasswordChange} />
                        </div>
                        <button className={style.submitButton} onClick={this.onSubmitButtonClick}>登录</button>
                    </form>
                </Card>

                <Card className={style.hint}>
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
