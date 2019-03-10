import React, {Component} from 'react';
import Style from './Style.module.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';
import {View as ScreenManagementInfoCard} from './Components/ScreenManagementInfoCard';
import {View as LogCard} from './Components/LogCard';
import ScreenListCard from './Components/ScreenListCard/View';
import {MENU_ITEM_ID} from '../../Config/MENU_ITEM';
import {
    getResourcePackList,
    getScreenList,
    getScreenManagementBasicInfo,
    getScreenManagementLogList,
} from './Function';

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
            <div className={Style.ScreenManagement}>
                <div className={Style.leftWrapper}>
                    <ScreenManagementInfoCard />
                    <LogCard />
                </div>
                <div className={Style.rightWrapper}>
                    <ScreenListCard />
                </div>
            </div>
        );
    }
}

export default ScreenManagement;