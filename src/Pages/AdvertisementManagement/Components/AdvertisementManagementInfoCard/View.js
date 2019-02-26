import React, {Component} from 'react';
import NAMESPACE from '../../../../Namespace';
import {connect} from 'react-redux';
import {Object as InfoCardObject, View as InfoCard} from '../../../../Components/InfoCard';

class AdvertisementManagementInfoCard extends Component
{

    render()
    {
        const {
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.BASIC_INFO.ADVERTISEMENT_AMOUNT]: advertisementAmount,
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.BASIC_INFO.IMAGE_AMOUNT]: imageAmount,
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.BASIC_INFO.ADVERTISEMENT_FILE_SIZE]: advertiseFileSize,
        } = this.props;

        const infoArray = [
            new InfoCardObject.Info('总数量', '#09C', advertisementAmount),
            new InfoCardObject.Info('图片', '#090', imageAmount),
            new InfoCardObject.Info('视频', '#F00', advertisementAmount - imageAmount),
            new InfoCardObject.Info('占用空间', '#09C', `${((advertiseFileSize | 0) / 1024 / 1024).toFixed(2)} M`),
        ];

        return (
            <InfoCard title={'广告信息'} infoArray={infoArray} />
        );
    }
}

const mapStateToProps = state =>
{
    const {AdvertisementManagement: {basicInfo}} = state;
    return {...basicInfo};
};

export default connect(mapStateToProps)(AdvertisementManagementInfoCard);
