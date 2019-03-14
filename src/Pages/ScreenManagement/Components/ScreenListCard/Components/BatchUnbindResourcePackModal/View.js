import React, {Component} from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {MODAL_ID} from '../../../../../../Config';
import RequestProcessor from '../../../../../../RequestProcessor';
import {Function as ModalFunction, SmallModal} from '../../../../../../Components/Bootstrap/Modal';
import {getScreenList, getScreenManagementBasicInfo} from '../../../../Function';

class BatchUnbindResourcePackModal extends Component
{
    onConfirmButtonClick = async () =>
    {
        const {selectedScreenIdSet} = this.props;
        if (await RequestProcessor.sendPostUnbindResourcePackRequestAsync([...selectedScreenIdSet]))
        {
            ModalFunction.hideModal(MODAL_ID.BATCH_UNBIND_RESOURCE_PACK_MODAL);
            getScreenManagementBasicInfo();
            getScreenList(); // 刷新屏幕列表
        }
    };

    render()
    {
        const {selectedScreenIdSet} = this.props;
        return (
            <SmallModal id={MODAL_ID.BATCH_UNBIND_RESOURCE_PACK_MODAL}
                        title={'批量解绑资源包'}
                        className={Style.BatchUnbindResourcePackModal}
                        onConfirmButtonClick={this.onConfirmButtonClick}>
                <span>确认要为选中的 {selectedScreenIdSet.size} 个屏幕解绑资源包吗？</span>
            </SmallModal>
        );
    }
}

BatchUnbindResourcePackModal.propTypes = {
    selectedScreenIdSet: PropTypes.instanceOf(Set).isRequired,
};

export default BatchUnbindResourcePackModal;