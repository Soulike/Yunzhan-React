import React, {Component} from 'react';
import Style from './Header.module.scss';

class Header extends Component
{
    render()
    {
        return (
            <div className={Style.Header}>
                <div className={Style.radioInput} />
                <div className={Style.name}>资源包名</div>
                <div className={Style.advertiseNumber}>广告数</div>
                <div className={Style.description}>备注</div>
            </div>
        );
    }
}

export default Header;