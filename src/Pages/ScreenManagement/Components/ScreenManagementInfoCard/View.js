import React, {Component} from 'react';
import NAMESPACE from '../../../../Namespace';
import {connect} from 'react-redux';
import {Object as InfoCardObject, View as InfoCard} from '../../../../Components/InfoCard';

class ScreenManagementInfoCard extends Component
{

    render()
    {
        const {
            [NAMESPACE.SCREEN_MANAGEMENT.BASIC_INFO.SCREEN_AMOUNT]: screenAmount,
            [NAMESPACE.SCREEN_MANAGEMENT.BASIC_INFO.RUNNING_SCREEN_AMOUNT]: runningScreenAmount,
            [NAMESPACE.SCREEN_MANAGEMENT.BASIC_INFO.ABNORMAL_EVENT_AMOUNT]: abnormalEventAmount,
        } = this.props;

        const infoArray = [
            new InfoCardObject.Info('总数量', '#09C', screenAmount),
            new InfoCardObject.Info('运行中', '#090', runningScreenAmount),
            new InfoCardObject.Info('已停止', '#F00', screenAmount - runningScreenAmount),
            new InfoCardObject.Info('异常', '#F00', abnormalEventAmount),

        ];

        return (<InfoCard title={'屏幕信息'} infoArray={infoArray} />);
    }
}

const mapStateToProps = state =>
{
    const {ScreenManagement: {basicInfo}} = state;
    return {...basicInfo};
};

export default connect(mapStateToProps)(ScreenManagementInfoCard);
