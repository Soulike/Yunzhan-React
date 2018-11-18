import React, {Component} from 'react';
import style from './Signup.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router';

class SignUp extends Component
{
    componentDidMount()
    {
        document.title = '注册 - 云展';
    }

    render()
    {
        return (
            <div className={style.SignUp}>
                <div className={style.titleWrapper}>
                    <FontAwesomeIcon icon={solidIcon.faDove} className={style.icon}/>
                    <div className={style.title}>注册云展</div>
                </div>
                <form action="#" className={style.form}>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>邮箱</div>
                        <input type="text" className={style.input}/>
                    </div>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>密码
                        </div>
                        <input type="password" className={style.input}/>
                    </div>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>重复密码
                        </div>
                        <input type="password" className={style.input}/>
                    </div>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>验证码</div>
                        <input type="password" className={style.codeInput}/>
                        <button className={style.getCodeButton}>获取验证码</button>
                    </div>
                    <button className={style.submitButton}>注册</button>
                </form>
                <div className={style.hint}>
                    已有账号？<Link onlyActiveOnIndex={false} to={'/login'}>登录</Link>
                </div>
            </div>
        );
    }
}

export default SignUp;
