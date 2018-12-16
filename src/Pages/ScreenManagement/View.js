import React, {Component} from 'react';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import style from './ScreenManagement.scss';
import {View as Title} from '../../Components/Title';
import {Functions as MenuFunctions} from '../Root/Components/Menu';

class ScreenManagement extends Component
{
    componentDidMount()
    {
        document.title = '屏幕管理 - 云展';
        MenuFunctions.setActiveItemId(1);
    }

    render()
    {
        return (
            <div className={style.ScreenManagement}>
                <Title icon={solidIcon.faDesktop} text={'屏幕管理'}/>
            </div>
        );
    }
}

export default ScreenManagement;