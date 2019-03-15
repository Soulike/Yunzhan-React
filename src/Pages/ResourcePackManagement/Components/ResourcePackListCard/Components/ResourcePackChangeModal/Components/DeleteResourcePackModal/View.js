import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Function as ModalFunction, SmallModal} from '../../../../../../../../Components/Bootstrap/Modal';
import Style from './Style.module.scss';
import {MODAL_ID} from '../../../../../../../../Config';
import RequestProcessor from '../../../../../../../../RequestProcessor';
import {getResourcePackList} from '../../../../../../Function';

class DeleteResourcePackModal extends Component
{
    onConfirmButtonClick = async () =>
    {
        const {resourcePackId} = this.props;
        const requestIsSuccessful = await RequestProcessor.sendPostDeleteResourcePacksRequestAsync([resourcePackId]);
        if (requestIsSuccessful)
        {
            getResourcePackList();
            ModalFunction.hideModal(MODAL_ID.DELETE_RESOURCE_PACK_MODAL);
        }
    };

    render()
    {
        const {resourcePackName} = this.props;
        return (
            <SmallModal id={MODAL_ID.DELETE_RESOURCE_PACK_MODAL}
                        title={'删除资源包确认'}
                        className={Style.DeleteResourcePackModal}
                        onConfirmButtonClick={this.onConfirmButtonClick}>
                确认删除资源包 <span style={{
                color: 'red',
                fontWeight: 'bold',
            }}>{resourcePackName}</span>？<strong>此操作不可逆！</strong>
            </SmallModal>
        );
    }
}

DeleteResourcePackModal.propTypes = {
    resourcePackId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    resourcePackName: PropTypes.string.isRequired,
};

export default DeleteResourcePackModal;