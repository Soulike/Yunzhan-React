import React, {Component} from 'react';
import NAMESPACE from '../../../../Namespace';
import {connect} from 'react-redux';
import {Object as InfoCardObject, View as InfoCard} from '../../../../Components/InfoCard';

class TagManagementInfoCard extends Component
{
    render()
    {
        const {
            [NAMESPACE.TAG_MANAGEMENT.BASIC_INFO.TAG_AMOUNT]: tagAmount,
            [NAMESPACE.TAG_MANAGEMENT.BASIC_INFO.USING_TAG_AMOUNT]: usingTagAmount,
        } = this.props;

        const infoArray = [
            new InfoCardObject.Info('总数量', '#09C', tagAmount),
            new InfoCardObject.Info('使用中', '#090', usingTagAmount),
            new InfoCardObject.Info('未使用', '#F00', tagAmount - usingTagAmount),
        ];

        return (<InfoCard title={'标签信息'} infoArray={infoArray} />);
    }
}

const mapStateToProps = state =>
{
    const {TagManagement: {basicInfo}} = state;
    return {...basicInfo};
};

export default connect(mapStateToProps)(TagManagementInfoCard);
