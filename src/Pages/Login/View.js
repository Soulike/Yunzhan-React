import React, {Component} from 'react';
import style from './Login.module.scss';
import {Link} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';
import {login} from './Actions/Actions';
import {getSHA256} from '../../Static/Functions';
import Regex from '../../Static/Regex';
import {View as Alert} from '../../Components/Alert';

class Login extends Component
{
    onEmailChange = e =>
    {
        this.setState({
            email: e.target.value
        });
    };

    componentDidMount()
    {
        document.title = '登录 - 云展';
    }

    onPasswordChange = e =>
    {
        this.setState({
            password: e.target.value
        });
    };
    onFormSubmit = e =>
    {
        e.preventDefault();
        const {email, password} = this.state;
        if (!Regex.EMAIL.test(email))
        {
            Alert.show('请输入正确的邮箱', false);
        }
        else if (!Regex.PASSWORD.test(password))
        {
            Alert.show('请输入正确的密码', false);
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

    constructor()
    {
        super(...arguments);
        this.state = {
            email: '',
            password: ''
        };
    }

    render()
    {
        return (
            <div className={style.Login}>
                <div className={style.titleWrapper}>
                    <FontAwesomeIcon icon={solidIcon.faDove} className={style.icon}/>
                    <div className={style.title}>登录到云展</div>
                </div>
                <form action="#" className={style.form} onSubmit={this.onFormSubmit}>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>邮箱</div>
                        <input type="text" className={style.input} onChange={this.onEmailChange}/>
                    </div>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>密码
                            <div className={style.forgetPassword}><Link onlyActiveOnIndex={false}
                                                                        to={'/forgetPassword'}>
                                忘记密码了？</Link>
                            </div>
                        </div>
                        <input type="password" className={style.input} onChange={this.onPasswordChange}/>
                    </div>
                    <button className={style.submitButton} onClick={this.onSubmitButtonClick}>登录</button>
                </form>
                <div className={style.hint}>
                    新用户？<Link onlyActiveOnIndex={false} to={'/signUp'}>注册个账号吧</Link>
                </div>
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
        }
    };
};

export default connect(null, mapDispatchToProps)(Login);
