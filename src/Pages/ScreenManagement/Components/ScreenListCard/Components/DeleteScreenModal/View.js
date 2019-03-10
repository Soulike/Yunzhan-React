import React, {Component} from 'react';
import Style from './Style.module.scss';
import {MODAL_ID} from '../../../../../../Config';
import RequestProcessor from '../../../../../../RequestProcessor';
import PropTypes from 'prop-types';
import {Function as ModalFunction, SmallModal} from '../../../../../../Components/Bootstrap/Modal';
import {getScreenList, getScreenManagementBasicInfo} from '../../../../Function';

class DeleteScreenModal extends Component
{
    onConfirmButtonClick = async () =>
    {
        const {selectedScreenIdSet} = this.props;
        if (await RequestProcessor.sendPostDeleteScreenRequestAsync(Array.from(selectedScreenIdSet.keys())))
        {
            ModalFunction.hideModal(MODAL_ID.DELETE_SCREEN_MODAL);
            getScreenManagementBasicInfo();
            getScreenList(); // 刷新屏幕列表
        }
    };

    render()
    {
        const {selectedScreenIdSet} = this.props;
        return (
            <SmallModal id={MODAL_ID.DELETE_SCREEN_MODAL}
                        title={'删除屏幕'}
                        className={Style.DeleteScreenModal}
                        onConfirmButtonClick={this.onConfirmButtonClick}>
                <span>确认删除选中的 {selectedScreenIdSet.size} 个屏幕吗？<span style={{color: '#F00'}}>此操作不可逆！</span></span>
            </SmallModal>
        );
    }
}

DeleteScreenModal.propTypes = {
    selectedScreenIdSet: PropTypes.instanceOf(Set).isRequired,
};

export default DeleteScreenModal;