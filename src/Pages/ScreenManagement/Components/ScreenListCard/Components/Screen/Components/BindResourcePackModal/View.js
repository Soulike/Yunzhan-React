import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {MODAL_ID} from '../../../../../../../../Config';
import {WarningAlert} from '../../../../../../../../Components/Bootstrap/Alerts';
import RequestProcessors from '../../../../../../../../RequestProcessor';
import {Function as ModalFunction, LargeModal} from '../../../../../../../../Components/Bootstrap/Modal';
import {getScreenList, getScreenManagementBasicInfo, unselectAllResourcePacks} from '../../../../../../Function';
import {View as ResourcePackList} from '../../../ResourcePackList';

class BindResourcePackModal extends Component
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
            const {screenId, selectedResourcePackId} = this.props;
            if (await RequestProcessors.sendPostBindResourcePackRequestAsync([screenId], selectedResourcePackId))
            {
                ModalFunction.hideModal(`${MODAL_ID.BIND_RESOURCE_PACK_MODAL}_${screenId}`);
                unselectAllResourcePacks();
                getScreenManagementBasicInfo();
                getScreenList(); // 刷新屏幕列表
            }
        }
    };

    render()
    {
        const {screenId} = this.props;
        return (
            <LargeModal id={`${MODAL_ID.BIND_RESOURCE_PACK_MODAL}_${screenId}`}
                        title={'绑定资源包'}
                        className={Style.BindResourcePackModal}
                        onConfirmButtonClick={this.onConfirmButtonClick}>
                <ResourcePackList />
            </LargeModal>
        );
    }
}

BindResourcePackModal.propTypes = {
    screenId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    selectedResourcePackId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

export default BindResourcePackModal;