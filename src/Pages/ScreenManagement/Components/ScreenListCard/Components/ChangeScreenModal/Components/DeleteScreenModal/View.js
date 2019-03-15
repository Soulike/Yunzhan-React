import React, {Component} from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {Function as ModalFunction, SmallModal} from '../../../../../../../../Components/Bootstrap/Modal';
import {MODAL_ID} from '../../../../../../../../Config';
import RequestProcessor from '../../../../../../../../RequestProcessor';
import {getScreenList} from '../../../../../../Function';

class DeleteScreenModal extends Component
{
    onConfirmButtonClick = async () =>
    {
        const {screenId} = this.props;
        const requestIsSuccessful = await RequestProcessor.sendPostDeleteScreenRequestAsync([screenId]);
        if (requestIsSuccessful)
        {
            getScreenList();
            ModalFunction.hideModal(MODAL_ID.DELETE_SCREEN_MODAL);
        }
    };

    render()
    {
        const {screenName} = this.props;
        return (
            <SmallModal id={MODAL_ID.DELETE_SCREEN_MODAL}
                        title={'删除屏幕确认'}
                        className={Style.DeleteScreenModal}
                        onConfirmButtonClick={this.onConfirmButtonClick}>
                确认删除屏幕<span style={{
                color: 'red',
                fontWeight: 'bold',
            }}>{screenName}</span>？<strong>该操作不可逆！</strong>
            </SmallModal>
        );
    }
}

DeleteScreenModal.propTypes = {
    screenId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    screenName: PropTypes.string.isRequired,
};

export default DeleteScreenModal;