import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {MODAL_ID} from '../../../../../../../../Config';
import RequestProcessors from '../../../../../../../../RequestProcessor';
import {Function as ModalFunction, SmallModal} from '../../../../../../../../Components/Bootstrap/Modal';
import {getScreenList, getScreenManagementBasicInfo, unselectAllResourcePacks} from '../../../../../../Function';

class UnbindResourcePackModal extends Component
{
    onConfirmButtonClick = async () =>
    {
        const {screenId} = this.props;
        if (await RequestProcessors.sendPostUnbindResourcePackRequestAsync([screenId]))
        {
            ModalFunction.hideModal(`${MODAL_ID.UNBIND_RESOURCE_PACK_MODAL}_${screenId}`);
            unselectAllResourcePacks();
            getScreenManagementBasicInfo();
            getScreenList(); // 刷新屏幕列表
        }
    };

    render()
    {
        const {screenId, screenName, resourcePackName} = this.props;
        return (
            <SmallModal id={`${MODAL_ID.UNBIND_RESOURCE_PACK_MODAL}_${screenId}`}
                        title={'解绑资源包'}
                        className={Style.UnbindResourcePackModal}
                        onConfirmButtonClick={this.onConfirmButtonClick}>
                    <span>确认要为屏幕
                        <span style={{color: '#F00'}}>{screenName}</span>
                          解绑资源包
                        <span style={{color: '#F00'}}>{resourcePackName}</span>？
                    </span>
            </SmallModal>
        );
    }
}

UnbindResourcePackModal.propTypes = {
    screenId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    screenName: PropTypes.string.isRequired,
    resourcePackName: PropTypes.string.isRequired,
};

export default UnbindResourcePackModal;