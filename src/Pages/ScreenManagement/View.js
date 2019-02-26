import React, {Component} from 'react';
import style from './Style.module.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';
import {View as ScreenManagementInfoCard} from './Components/ScreenManagementInfoCard';
import {View as LogCard} from './Components/LogCard';
import ScreenListCard from './Components/ScreenListCard/View';
import {MENU_ITEM_ID} from '../../Config/MenuItem';
import {getResourcePackList, getScreenList, getScreenManagementBasicInfo, getScreenManagementLogList} from './Function';

class ScreenManagement extends Component
{
    componentDidMount()
    {
        document.title = '屏幕管理 - 云展';
        MenuFunctions.setActiveItemId(MENU_ITEM_ID.SCREEN_MANAGEMENT);
        getScreenManagementBasicInfo();
        getScreenManagementLogList();
        getScreenList();
        getResourcePackList();
    }

    render()
    {
        return (
            <div className={style.ScreenManagement}>
                <div className={style.leftWrapper}>
                    <ScreenManagementInfoCard />
                    <LogCard />
                </div>
                <div className={style.rightWrapper}>
                    <ScreenListCard />
                </div>
            </div>
        );
    }
}

export default ScreenManagement;