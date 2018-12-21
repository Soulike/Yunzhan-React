import React, {Component} from 'react';
import style from './Header.module.scss';

class Header extends Component
{
    render()
    {
        return (
            <div className={style.Header}>
                <input type="checkbox" id={'_0'} className={style.checkbox}/>
                <label htmlFor="#_0" className={style.checkboxLabel}/>
                <div className={style.name}>屏幕名</div>
                <div className={style.runningInfo}>状态</div>
                <div className={style.resourcePackName}>资源包</div>
                <div className={style.button}/>
            </div>
        );
    }
}

export default Header;