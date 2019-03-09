import React, {Component} from 'react';
import Style from './Style.module.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';
import {MENU_ITEM_ID} from '../../Config/MENU_ITEM';
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
            <div className={Style.AdvertiseManagement}>
                <div className={Style.leftWrapper}>
                    <AdvertisementManagementInfoCard />
                    <UploaderCard />
                </div>
                <div className={Style.rightWrapper}>
                    <AdvertisementListCard />
                </div>
            </div>
        );
    }
}

export default AdvertiseManagement;