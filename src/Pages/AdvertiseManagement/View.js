import React, {Component} from 'react';
import style from './AdvertiseManagement.module.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';

class AdvertiseManagement extends Component
{
    componentDidMount()
    {
        document.title = '广告管理 - 云展';
        MenuFunctions.setActiveItemId(2);
    }

    render()
    {
        return (
            <div className={style.AdvertiseManagement}>

            </div>
        );
    }
}

export default AdvertiseManagement;