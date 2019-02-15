import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as Card} from '../../../../Components/Card';

class AdvertisementListCard extends Component
{
    render()
    {
        return (
            <div className={Style.AdvertisementListCard}>
                <Card title={'广告列表'}>
                    <div className={Style.content}>

                    </div>
                </Card>
            </div>
        );
    }
}

export default AdvertisementListCard;