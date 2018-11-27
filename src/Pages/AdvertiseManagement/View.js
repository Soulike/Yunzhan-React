import React, {Component} from 'react';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import style from './AdvertiseManagement.module.scss';
import {View as Title} from '../../Components/Title';
import {Functions as MenuFunctions} from '../Root/Components/Menu';

class AdvertiseManagement extends Component
{
    componentDidMount()
    {
        document.title = '广告管理 - 云展';
        MenuFunctions.setActiveItemIndex(2);
    }

    render()
    {
        return (
            <div className={style.AdvertiseManagement}>
                <Title icon={solidIcon.faAd} text={'广告管理'}/>
            </div>
        );
    }
}

export default AdvertiseManagement;