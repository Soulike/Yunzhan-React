import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Screen.module.scss';
import {connect} from 'react-redux';
import NAMESPACE from '../../../../../../Namespace';
import {ModalTriggeringButton} from '../../../../../../Components/Bootstrap/Modal';
import {MODAL_ID} from '../../../../../../Config';
import {View as Checkbox} from '../../../../../../Components/Bootstrap/Checkbox';
import {selectScreens, unselectScreen} from '../../../../Function';
import BindResourcePackModal from './Components/BindResourcePackModal/View';
import UnbindResourcePackModal from './Components/UnbindResourcePackModal/View';

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
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: screenId,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: uuid,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.NAME]: screenName,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.IS_RUNNING]: isRunning,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_ID]: resourcePackId,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_NAME]: resourcePackName,
            selectedResourcePackId,
        } = this.props;
        return [
            <div className={Style.Screen}>
                <Checkbox id={`_${screenId}`} onClick={this.onCheckboxClick} />
                <div className={Style.nameWrapper} onClick={this.onNameWrapperClick}>
                    <div className={Style.name}>{screenName}</div>
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
                            <ModalTriggeringButton modalId={`${MODAL_ID.BIND_RESOURCE_PACK_MODAL}_${screenId}`}
                                                   className={Style.batchBindResourcePackButton}>绑定资源包</ModalTriggeringButton> :
                            <ModalTriggeringButton modalId={`${MODAL_ID.UNBIND_RESOURCE_PACK_MODAL}_${screenId}`}
                                                   className={Style.batchUnbindResourcePackButton}>解绑资源包</ModalTriggeringButton>
                    }
                </div>
            </div>,

            <BindResourcePackModal screenId={screenId} selectedResourcePackId={selectedResourcePackId} />,

            <UnbindResourcePackModal screenId={screenId} screenName={screenName} resourcePackName={resourcePackName} />,

        ];
    }
}

Screen.propTypes = {
    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired,
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
