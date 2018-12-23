import React, {Component} from 'react';
import style from './Header.module.scss';

class Header extends Component
{
    render()
    {
        return (
            <div className={style.Header}>
                <div className={style.radioInput}/>
                <div className={style.name}>资源包名</div>
                <div className={style.advertiseNumber}>广告数</div>
                <div className={style.description}>备注</div>
            </div>
        );
    }
}

export default Header;