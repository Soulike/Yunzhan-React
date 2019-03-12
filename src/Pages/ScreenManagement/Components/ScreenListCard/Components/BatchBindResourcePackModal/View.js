import React, {Component} from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {MODAL_ID} from '../../../../../../Config';
import {WarningAlert} from '../../../../../../Components/Bootstrap/Alerts';
import RequestProcessor from '../../../../../../RequestProcessor';
import {Function as ModalFunction, LargeModal} from '../../../../../../Components/Bootstrap/Modal';
import {getScreenList, getScreenManagementBasicInfo} from '../../../../Function';
import {View as ResourcePackList} from '../ResourcePackList';

class BatchBindResourcePackModal extends Component
{
    onConfirmButtonClick = async () =>
    {
        const {selectedResourcePackId} = this.props;
        if (selectedResourcePackId === null)
        {
            WarningAlert.pop('请选择资源包');
        }
        else
        {
            const {selectedResourcePackId, selectedScreenIdSet} = this.props;
            if (await RequestProcessor.sendPostBindResourcePackRequestAsync(Array.from(selectedScreenIdSet.keys()), selectedResourcePackId))
            {
                ModalFunction.hideModal(MODAL_ID.BATCH_BIND_RESOURCE_PACK_MODAL);
                getScreenManagementBasicInfo();
                getScreenList(); // 刷新屏幕列表
            }
        }
    };

    render()
    {
        return (
            <LargeModal id={MODAL_ID.BATCH_BIND_RESOURCE_PACK_MODAL}
                        title={'批量绑定资源包'}
                        className={Style.BatchBindResourcePackModal}
                        onConfirmButtonClick={this.onConfirmButtonClick}>
                <ResourcePackList />
            </LargeModal>
        );
    }
}

BatchBindResourcePackModal.propTypes = {
    selectedResourcePackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    selectedScreenIdSet: PropTypes.instanceOf(Set).isRequired,
};

export default BatchBindResourcePackModal;