import React, {Component} from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {Function as ModalFunction, SmallModal} from '../../../../../../../../Components/Bootstrap/Modal';
import {MODAL_ID} from '../../../../../../../../Config';
import RequestProcessor from '../../../../../../../../RequestProcessor';
import {getScreenList} from '../../../../../../Function';

class UnbindResourcePackModal extends Component
{
    onConfirmButtonClick = async () =>
    {
        const {screenId} = this.props;
        const requestIsSuccessful = await RequestProcessor.sendPostUnbindResourcePackRequestAsync([screenId]);
        if (requestIsSuccessful)
        {
            getScreenList();
            ModalFunction.hideModal(MODAL_ID.UNBIND_RESOURCE_PACK_MODAL);
        }
    };

    render()
    {
        const {screenName, resourcePackNameOfScreen} = this.props;
        return (
            <SmallModal id={MODAL_ID.UNBIND_RESOURCE_PACK_MODAL}
                        title={'解绑资源包确认'}
                        className={Style.UnbindResourcePackModal}
                        onConfirmButtonClick={this.onConfirmButtonClick}>
                确定要为屏幕<span style={{fontWeight: 'bold'}}>{screenName}</span>解绑资源包<span style={{
                color: 'red',
                fontWeight: 'bold',
            }}>{resourcePackNameOfScreen}</span>？
            </SmallModal>
        );
    }
}

UnbindResourcePackModal.propTypes = {
    screenId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    screenName: PropTypes.string.isRequired,
    resourcePackNameOfScreen: PropTypes.string.isRequired,
};

export default UnbindResourcePackModal;