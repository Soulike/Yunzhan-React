import React, {Component} from 'react';
import style from './ScreenManagement.module.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';
import {View as InfoCard} from './Components/InfoCard';
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
                <div className={style.cardWrapper}>
                    <div className={style.leftWrapper}>
                        <div className={style.infoCardWrapper}>
                            <InfoCard />
                        </div>
                        <div className={style.logCardWrapper}>
                            <LogCard />
                        </div>
                    </div>
                    <div className={style.rightWrapper}>
                        <ScreenListCard />
                    </div>
                </div>
            </div>
        );
    }
}

export default ScreenManagement;