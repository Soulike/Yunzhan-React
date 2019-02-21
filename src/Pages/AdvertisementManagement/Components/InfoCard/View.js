import React, {Component} from 'react';
import Style from './InfoCard.module.scss';
import {View as Card} from '../../../../Components/Card';
import {View as DividingLine} from './Components/DividingLine';
import NAMESPACE from '../../../../Namespace';
import {connect} from 'react-redux';

class InfoCard extends Component
{

    render()
    {
        const {
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.BASIC_INFO.ADVERTISEMENT_AMOUNT]: advertisementAmount,
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.BASIC_INFO.IMAGE_AMOUNT]: imageAmount,
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.BASIC_INFO.ADVERTISEMENT_FILE_SIZE]: advertiseFileSize,
        } = this.props;
        return (
            <div className={Style.InfoCard}>
                <Card title={'广告信息'}>
                    <div className={Style.infoWrapper}>
                        <div className={Style.info}>
                            <div className={Style.infoTitle}>总数量</div>
                            <div className={Style.infoNumber} style={{color: '#09C'}}>{advertisementAmount | 0}</div>
                        </div>
                        <DividingLine />
                        <div className={Style.info}>
                            <div className={Style.infoTitle}>图片</div>
                            <div className={Style.infoNumber} style={{color: '#090'}}>{imageAmount | 0}</div>
                        </div>
                        <DividingLine />
                        <div className={Style.info}>
                            <div className={Style.infoTitle}>视频</div>
                            <div className={Style.infoNumber}
                                 style={{color: '#F00'}}>{(advertisementAmount - imageAmount) | 0}</div>
                        </div>
                        <DividingLine />
                        <div className={Style.info}>
                            <div className={Style.infoTitle}>占用空间</div>
                            <div className={Style.infoNumber}
                                 style={{color: '#09C'}}>{((advertiseFileSize | 0) / 1024 / 1024).toFixed(2)} M
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state =>
{
    const {AdvertisementManagement: {basicInfo}} = state;
    return {...basicInfo};
};

export default connect(mapStateToProps)(InfoCard);
