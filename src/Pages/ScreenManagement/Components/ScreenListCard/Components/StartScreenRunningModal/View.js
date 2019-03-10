import React, {Component} from 'react';
import Style from './Style.module.scss';
import {MODAL_ID} from '../../../../../../Config';
import RequestProcessor from '../../../../../../RequestProcessor';
import {Function as ModalFunction, SmallModal} from '../../../../../../Components/Bootstrap/Modal';
import {getScreenList, getScreenManagementBasicInfo} from '../../../../Function';
import PropTypes from 'prop-types';

class StartScreenRunningModal extends Component
{
    onConfirmButtonClick = async () =>
    {
        const {selectedScreenIdSet} = this.props;
        if (await RequestProcessor.sendPostStartScreenRequestAsync([...selectedScreenIdSet]))
        {
            ModalFunction.hideModal(MODAL_ID.START_SCREEN_RUNNING_MODAL);
            getScreenManagementBasicInfo();
            getScreenList(); // 刷新屏幕列表
        }
    };

    render()
    {
        const {selectedScreenIdSet} = this.props;
        return (
            <SmallModal id={MODAL_ID.START_SCREEN_RUNNING_MODAL}
                        title={'开始播放'}
                        className={Style.StartScreenRunningModal}
                        onConfirmButtonClick={this.onConfirmButtonClick}>
                <span>确认使选中的 {selectedScreenIdSet.size} 个屏幕开始播放吗？</span>
            </SmallModal>
        );
    }
}

StartScreenRunningModal.propTypes = {
    selectedScreenIdSet: PropTypes.instanceOf(Set).isRequired,
};

export default StartScreenRunningModal;