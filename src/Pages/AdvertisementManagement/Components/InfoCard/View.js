import React, {Component} from 'react';
import style from './InfoCard.module.scss';
import {View as Card} from '../../../../Components/Card';
import {View as DividingLine} from './Components/DividingLine';
import RequestProcessors from '../../../../RequestProcessor';
import NAMESPACE from '../../../../Namespace';

class InfoCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.BASIC_INFO.ADVERTISEMENT_AMOUNT]: 0,// 总广告数
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.BASIC_INFO.IMAGE_AMOUNT]: 0,// 图片形式的广告数
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.BASIC_INFO.ADVERTISEMENT_FILE_SIZE]: 0,// 广告占用空间大小
        };
    }

    componentDidMount()
    {
        RequestProcessors.sendGetAdvertisementBasicInfoRequest.apply(this);
    }


    render()
    {
        const {
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.BASIC_INFO.ADVERTISEMENT_AMOUNT]: advertisementAmount,
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.BASIC_INFO.IMAGE_AMOUNT]: imageAmount,
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.BASIC_INFO.ADVERTISEMENT_FILE_SIZE]: advertiseFileSize,
        } = this.state;
        return (
            <div className={style.InfoCard}>
                <Card title={'广告信息'}>
                    <div className={style.infoWrapper}>
                        <div className={style.info}>
                            <div className={style.infoTitle}>总数量</div>
                            <div className={style.infoNumber} style={{color: '#09C'}}>{advertisementAmount}</div>
                        </div>
                        <DividingLine />
                        <div className={style.info}>
                            <div className={style.infoTitle}>图片</div>
                            <div className={style.infoNumber} style={{color: '#090'}}>{imageAmount}</div>
                        </div>
                        <DividingLine />
                        <div className={style.info}>
                            <div className={style.infoTitle}>视频</div>
                            <div className={style.infoNumber}
                                 style={{color: '#F00'}}>{advertisementAmount - imageAmount}</div>
                        </div>
                        <DividingLine />
                        <div className={style.info}>
                            <div className={style.infoTitle}>占用空间</div>
                            <div className={style.infoNumber}
                                 style={{color: '#09C'}}>{(advertiseFileSize / 1024 / 1024).toFixed(2)} M
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default InfoCard;
