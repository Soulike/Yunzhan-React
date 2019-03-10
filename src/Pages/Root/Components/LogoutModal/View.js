import React, {Component} from 'react';
import Style from './Style.module.scss';
import {MODAL_ID} from '../../../../Config';
import RequestProcessor from '../../../../RequestProcessor';
import {Function as ModalFunction, SmallModal} from '../../../../Components/Bootstrap/Modal';
import {SuccessAlert} from '../../../../Components/Bootstrap/Alerts';
import {Function as LoginFunction} from '../../../Login';
import {browserHistory} from 'react-router';

class LogoutModal extends Component
{
    onConfirmButtonClick = async () =>
    {
        const requestIsSuccessful = await RequestProcessor.sendPostLogoutRequestAsync();
        if (requestIsSuccessful)
        {
            ModalFunction.hideModal(MODAL_ID.LOGOUT_MODAL);
            SuccessAlert.pop('退出成功');
            LoginFunction.setOffline();
            browserHistory.push('/login');
        }
    };

    render()
    {
        return (
            <SmallModal id={MODAL_ID.LOGOUT_MODAL}
                        title={'确认退出'}
                        className={Style.LogoutModal}
                        onConfirmButtonClick={this.onConfirmButtonClick}>
                您真的要退出云展吗？
            </SmallModal>
        );
    }
}

export default LogoutModal;