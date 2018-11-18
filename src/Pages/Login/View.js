import React, {Component} from 'react';
import style from './Login.module.scss';
import {Link} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';

class Login extends Component
{
    componentDidMount()
    {
        document.title = '登录 - 云展';
    }

    render()
    {
        return (
            <div className={style.Login}>
                <div className={style.titleWrapper}>
                    <FontAwesomeIcon icon={solidIcon.faDove} className={style.icon}/>
                    <div className={style.title}>登录到云展</div>
                </div>
                <form action="#" className={style.form}>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>邮箱</div>
                        <input type="text" className={style.input}/>
                    </div>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>密码
                            <div className={style.forgetPassword}><Link onlyActiveOnIndex={false}
                                                                        to={'/forgetPassword'}>
                                忘记密码了？</Link>
                            </div>
                        </div>
                        <input type="password" className={style.input}/>
                    </div>
                    <button className={style.submitButton}>登录</button>
                </form>
                <div className={style.hint}>
                    新用户？<Link onlyActiveOnIndex={false} to={'/signUp'}>注册个账号吧</Link>
                </div>
            </div>
        );
    }
}

export default Login;
