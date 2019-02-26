import React, {Component} from 'react';
import style from './Style.module.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';
import {MENU_ITEM_ID} from '../../Config/MenuItem';
import {View as AdvertisementManagementInfoCard} from './Components/AdvertisementManagementInfoCard';
import {View as UploaderCard} from './Components/UploaderCard';
import {View as AdvertisementListCard} from './Components/AdvertisementListCard';
import {getAdvertisementList, getAdvertisementManagementBasicInfo} from './Function';

class AdvertiseManagement extends Component
{
    componentDidMount()
    {
        document.title = '广告管理 - 云展';
        MenuFunctions.setActiveItemId(MENU_ITEM_ID.ADVERTISEMENT_MANAGEMENT);
        getAdvertisementManagementBasicInfo();
        getAdvertisementList();
    }

    render()
    {
        return (
            <div className={style.AdvertiseManagement}>
                <div className={style.leftWrapper}>
                    <AdvertisementManagementInfoCard />
                    <UploaderCard />
                </div>
                <div className={style.rightWrapper}>
                    <AdvertisementListCard />
                </div>
            </div>
        );
    }
}

export default AdvertiseManagement;