import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Screen.module.scss';
import {connect} from 'react-redux';
import {View as ResourcePackList} from '../ResourcePackList';
import NAMESPACE from '../../../../../../Namespace';
import RequestProcessors from '../../../../../../RequestProcessor';
import {
    Function as ModalFunction,
    LargeModal,
    ModalTriggeringButton,
    SmallModal,
} from '../../../../../../Components/Bootstrap/Modal';
import {WarningAlert} from '../../../../../../Components/Bootstrap/Alerts';
import {MODAL_ID} from '../../../../../../Config';
import {View as Checkbox} from '../../../../../../Components/Bootstrap/Checkbox';
import {
    getScreenList,
    getScreenManagementBasicInfo,
    selectScreens,
    unselectAllResourcePacks,
    unselectScreen,
} from '../../../../Function';

class Screen extends Component
{

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: id,
            selectedScreenIdSet,
        } = this.props;
        const $checkbox = document.getElementById(`_${id}`);
        $checkbox.checked = selectedScreenIdSet.has(id);
    }

    onNameWrapperClick = e =>
    {
        e.preventDefault();
        const {
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: id,
        } = this.props;
        const $checkbox = document.getElementById(`_${id}`);

        if ($checkbox.checked)
        {
            unselectScreen(id);
        }
        else
        {
            selectScreens([id]);
        }
        $checkbox.checked = !$checkbox.checked;
    };

    onCheckboxClick = e =>
    {
        this.onNameWrapperClick(e);
    };

    render()
    {
        const {
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: id,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: uuid,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.NAME]: name,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.IS_RUNNING]: isRunning,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_ID]: resourcePackId,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_NAME]: resourcePackName,
        } = this.props;
        return (
            <div className={Style.Screen}>
                <Checkbox id={`_${id}`} onClick={this.onCheckboxClick} />
                <div className={Style.nameWrapper} onClick={this.onNameWrapperClick}>
                    <div className={Style.name}>{name}</div>
                    <div className={Style.uuid}>{uuid}</div>
                </div>
                <div className={`${Style.isRunningInfo} ${isRunning ? Style.isRunning : null}`}>
                    <span className={`${Style.isRunningInfoDot} ${isRunning ? Style.isRunning : null}`} />
                    <span className={`${Style.isRunningInfoText} ${isRunning ? Style.isRunning : null}`}>
                        {isRunning ? '运行中' : '未运行'}
                    </span>
                </div>
                <div className={Style.resourcePackName}>{resourcePackName}</div>
                <div className={Style.buttonWrapper}>
                    {
                        resourcePackId === undefined ?
                            <ModalTriggeringButton modalId={MODAL_ID.BIND_RESOURCE_PACK_MODAL}
                                                   className={Style.batchBindResourcePackButton}>绑定资源包</ModalTriggeringButton> :
                            <ModalTriggeringButton modalId={MODAL_ID.UNBIND_RESOURCE_PACK_MODAL}
                                                   className={Style.batchUnbindResourcePackButton}>解绑资源包</ModalTriggeringButton>
                    }
                </div>

                <LargeModal id={MODAL_ID.BIND_RESOURCE_PACK_MODAL}
                            title={'绑定资源包'}
                            onConfirmButtonClick={async () =>
                            {
                                const {selectedResourcePackId} = this.props;
                                if (selectedResourcePackId === null)
                                {
                                    WarningAlert.pop('请选择资源包');
                                }
                                else
                                {
                                    const {
                                        [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: screenId,
                                        selectedResourcePackId,
                                    } = this.props;
                                    if (await RequestProcessors.sendPostBindResourcePackRequestAsync([screenId], selectedResourcePackId))
                                    {
                                        ModalFunction.hideModal(MODAL_ID.BIND_RESOURCE_PACK_MODAL);
                                        unselectAllResourcePacks();
                                        getScreenManagementBasicInfo();
                                        getScreenList(); // 刷新屏幕列表
                                    }
                                }
                            }}>
                    <ResourcePackList />
                </LargeModal>

                <SmallModal id={MODAL_ID.UNBIND_RESOURCE_PACK_MODAL}
                            title={'解绑资源包'}
                            onConfirmButtonClick={async () =>
                            {
                                const {[NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: screenId} = this.props;
                                if (await RequestProcessors.sendPostUnbindResourcePackRequestAsync([screenId]))
                                {
                                    ModalFunction.hideModal(MODAL_ID.UNBIND_RESOURCE_PACK_MODAL);
                                    unselectAllResourcePacks();
                                    getScreenManagementBasicInfo();
                                    getScreenList(); // 刷新屏幕列表
                                }
                            }}>
                    <span>确认要为屏幕
                        <span style={{color: '#F00'}}>{name}</span>
                          解绑资源包
                        <span style={{color: '#F00'}}>{resourcePackName}</span>？
                    </span>
                </SmallModal>
            </div>
        );
    }
}

Screen.propTypes = {
    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: PropTypes.number.isRequired,
    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: PropTypes.string.isRequired,
    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.NAME]: PropTypes.string.isRequired,
    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.IS_RUNNING]: PropTypes.bool.isRequired,
    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_ID]: PropTypes.number,
    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_NAME]: PropTypes.string,
};

const mapStateToProps = state =>
{
    const {ScreenManagement: {selectedScreenIdSet, selectedResourcePackId}} = state;
    return {
        selectedScreenIdSet,
        selectedResourcePackId,
    };
};

export default connect(mapStateToProps)(Screen);
