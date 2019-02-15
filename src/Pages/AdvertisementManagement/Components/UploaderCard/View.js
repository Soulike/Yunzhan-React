import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as Card} from '../../../../Components/Card';

class UploaderCard extends Component
{
    render()
    {
        return (
            <div className={Style.UploaderCard}>
                <Card title={'广告上传'}>
                    <div className={Style.content}>

                    </div>
                </Card>
            </div>
        );
    }
}

export default UploaderCard;