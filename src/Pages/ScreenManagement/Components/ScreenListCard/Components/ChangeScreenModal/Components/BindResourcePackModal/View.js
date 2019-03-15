import React, {Component} from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {Function as ModalFunction, LargeModal} from '../../../../../../../../Components/Bootstrap/Modal';
import {MODAL_ID} from '../../../../../../../../Config';
import {View as ResourcePackList} from './Components/ResourcePackList';
import {connect} from 'react-redux';
import {WarningAlert} from '../../../../../../../../Components/Bootstrap/Alerts';
import RequestProcessor from '../../../../../../../../RequestProcessor';
import {getScreenList} from '../../../../../../Function';

class BindResourcePackModal extends Component
{
    onConfirmButtonClick = async () =>
    {
        const {screenId, selectedResourcePackId} = this.props;
        if (typeof selectedResourcePackId !== 'number' || selectedResourcePackId <= 0)
        {
            WarningAlert.pop('请选择要绑定的资源包');
        }
        else
        {
            const requestIsSuccessful = await RequestProcessor.sendPostBindResourcePackRequestAsync([screenId], selectedResourcePackId);
            if (requestIsSuccessful)
            {
                getScreenList();
                ModalFunction.hideModal(MODAL_ID.BIND_RESOURCE_PACK_MODAL);
            }
        }
    };

    render()
    {
        const {screenName} = this.props;
        return (
            <LargeModal id={MODAL_ID.BIND_RESOURCE_PACK_MODAL}
                        title={`为屏幕 ${screenName} 绑定资源包`}
                        className={Style.BindResourcePackModal}
                        onConfirmButtonClick={this.onConfirmButtonClick}>
                <ResourcePackList />
            </LargeModal>
        );
    }
}

BindResourcePackModal.propTypes = {
    screenId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    screenName: PropTypes.string.isRequired,
};

const mapStateToProps = state =>
{
    const {ScreenManagement: {selectedResourcePackId}} = state;
    return {
        selectedResourcePackId,
    };
};

export default connect(mapStateToProps)(BindResourcePackModal);
