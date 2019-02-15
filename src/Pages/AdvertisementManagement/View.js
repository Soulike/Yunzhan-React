import React, {Component} from 'react';
import style from './AdvertisementManagement.module.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';
import {MENU_ITEM_ID} from '../../Config/MenuItem';
import {View as InfoCard} from './Components/InfoCard';
import {View as UploaderCard} from './Components/UploaderCard';
import {View as AdvertisementListCard} from './Components/AdvertisementListCard';

class AdvertiseManagement extends Component
{
    componentDidMount()
    {
        document.title = '广告管理 - 云展';
        MenuFunctions.setActiveItemId(MENU_ITEM_ID.ADVERTISEMENT_MANAGEMENT);
    }

    render()
    {
        return (
            <div className={style.AdvertiseManagement}>
                <div className={style.cardWrapper}>
                    <div className={style.leftWrapper}>
                        <InfoCard />
                        <UploaderCard />
                    </div>
                    <div className={style.rightWrapper}>
                        <AdvertisementListCard />
                    </div>
                </div>
            </div>
        );
    }
}

export default AdvertiseManagement;