import React, {Component} from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {MODAL_ID} from '../../../../../../Config';
import RequestProcessor from '../../../../../../RequestProcessor';
import {Function as ModalFunction, SmallModal} from '../../../../../../Components/Bootstrap/Modal';
import {getScreenList, getScreenManagementBasicInfo} from '../../../../Function';

class StopScreenRunningModal extends Component
{
    onConfirmButtonClick = async () =>
    {
        const {selectedScreenIdSet} = this.props;
        if (await RequestProcessor.sendPostStopScreenRequestAsync([...selectedScreenIdSet]))
        {
            ModalFunction.hideModal(MODAL_ID.STOP_SCREEN_RUNNING_MODAL);
            getScreenManagementBasicInfo();
            getScreenList(); // 刷新屏幕列表
        }
    };

    render()
    {
        const {selectedScreenIdSet} = this.props;
        return (
            <SmallModal id={MODAL_ID.STOP_SCREEN_RUNNING_MODAL}
                        title={'停止播放'}
                        className={Style.StopScreenRunningModal}
                        onConfirmButtonClick={this.onConfirmButtonClick}>
                <span>确认使选中的 {selectedScreenIdSet.size} 个屏幕停止播放吗？</span>
            </SmallModal>
        );
    }
}

StopScreenRunningModal.propTypes = {
    selectedScreenIdSet: PropTypes.instanceOf(Set).isRequired,
};

export default StopScreenRunningModal;