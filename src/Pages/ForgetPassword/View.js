import React, {Component} from 'react';
import style from './ForgetPassword.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router';


class ForgetPassword extends Component
{
    componentDidMount()
    {
        document.title = '找回密码 - 云展';
    }

    render()
    {
        return (
            <div className={style.ForgetPassword}>
                <div className={style.titleWrapper}>
                    <FontAwesomeIcon icon={solidIcon.faDove} className={style.icon}/>
                    <div className={style.title}>找回密码</div>
                </div>
                <form action="#" className={style.form}>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>邮箱</div>
                        <input type="text" className={style.input}/>
                    </div>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>新密码
                        </div>
                        <input type="password" className={style.input}/>
                    </div>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>重复新密码
                        </div>
                        <input type="password" className={style.input}/>
                    </div>
                    <div className={style.inputWrapper}>
                        <div className={style.label}>验证码</div>
                        <input type="password" className={style.codeInput}/>
                        <button className={style.getCodeButton}>获取验证码</button>
                    </div>
                    <button className={style.submitButton}>提交</button>
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
