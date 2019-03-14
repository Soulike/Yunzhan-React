import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {Function as ModalFunction, SmallModal} from '../../../../../../../../Components/Bootstrap/Modal';
import {MODAL_ID} from '../../../../../../../../Config';
import RequestProcessor from '../../../../../../../../RequestProcessor';
import {getAdvertisementList} from '../../../../../../Function';

class DeleteAdvertisementModal extends Component
{
    onModalConfirmButtonClick = async () =>
    {
        const {advertisementId} = this.props;
        const requestIsSuccessful = await RequestProcessor.sendPostDeleteAdvertisementsRequestAsync([advertisementId]);
        if (requestIsSuccessful)
        {
            ModalFunction.hideModal(MODAL_ID.DELETE_ADVERTISEMENT_MODAL);
            getAdvertisementList();
        }
    };

    render()
    {
        const {advertisementName} = this.props;
        return (
            <SmallModal id={MODAL_ID.DELETE_ADVERTISEMENT_MODAL}
                        title={'删除广告确认'}
                        className={Style.DeleteAdvertisementModal}
                        onConfirmButtonClick={this.onModalConfirmButtonClick}>
                确认删除广告 <span className={Style.advertisementName}>{advertisementName}</span>？<strong>此操作不可逆！</strong>
            </SmallModal>
        );
    }
}

DeleteAdvertisementModal.propTypes = {
    advertisementId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    advertisementName: PropTypes.string.isRequired,
};

export default DeleteAdvertisementModal;