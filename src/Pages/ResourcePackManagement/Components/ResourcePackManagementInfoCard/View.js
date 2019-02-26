import React, {Component} from 'react';
import NAMESPACE from '../../../../Namespace';
import {connect} from 'react-redux';
import {Object as InfoCardObject, View as InfoCard} from '../../../../Components/InfoCard';

class ResourcePackManagementInfoCard extends Component
{
    render()
    {
        const {
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.BASIC_INFO.RESOURCE_PACK_AMOUNT]: resourcePackAmount, // 总资源包个数
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.BASIC_INFO.USING_RESOURCE_PACK_AMOUNT]: usingResourcePackAmount, // 正在使用的资源包个数
        } = this.props;

        const infoArray = [
            new InfoCardObject.Info('总数量', '#09C', resourcePackAmount),
            new InfoCardObject.Info('使用中', '#090', usingResourcePackAmount),
            new InfoCardObject.Info('未使用', '#F00', resourcePackAmount - usingResourcePackAmount),
        ];

        return (<InfoCard title={'资源包信息'} infoArray={infoArray} />);
    }
}

const mapStateToProps = state =>
{
    const {ResourcePackManagement: {basicInfo}} = state;
    return {...basicInfo};
};

export default connect(mapStateToProps)(ResourcePackManagementInfoCard);
