import React, {Component} from 'react';
import Style from './ScreenListCard.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {View as Screen} from './Components/Screen';
import {View as Header} from './Components/Header';
import {connect} from 'react-redux';
import {Function as ModalFunction} from '../../../../Components/Bootstrap/Modal';
import {MODAL_ID} from '../../../../Config';
import {WarningAlert} from '../../../../Components/Bootstrap/Alerts';
import {View as ModalTriggeringButton} from '../../../../Components/Bootstrap/ModalTriggeringButton';
import {unselectAllResourcePacks} from '../../Function';
import {View as ToolTip} from '../../../../Components/Bootstrap/Tooltip';
import {View as ListCard} from '../../../../Components/ListCard';
import {View as AddScreenModal} from './Components/AddScreenModal';
import {View as DeleteScreenModal} from './Components/DeleteScreenModal';
import {View as StartScreenRunningModal} from './Components/StartScreenRunningModal';
import {View as StopScreenRunningModal} from './Components/StopScreenRunningModal';
import BatchBindResourcePackModal from './Components/BatchBindResourcePackModal/View';
import BatchUnbindResourcePackModal from './Components/BatchUnbindResourcePackModal/View';

class ScreenListCard extends Component
{
    onStartRunningButtonClick = e =>
    {
        e.preventDefault();
        const {selectedScreenIdSet} = this.props;
        if (selectedScreenIdSet.size === 0)
        {
            WarningAlert.pop('未选中任何屏幕');
        }
        else
        {
            ModalFunction.showModal(MODAL_ID.START_SCREEN_RUNNING_MODAL);
        }
    };

    onStopRunningButtonClick = e =>
    {
        e.preventDefault();
        const {selectedScreenIdSet} = this.props;
        if (selectedScreenIdSet.size === 0)
        {
            WarningAlert.pop('未选中任何屏幕');
        }
        else
        {
            ModalFunction.showModal(MODAL_ID.STOP_SCREEN_RUNNING_MODAL);
        }
    };

    onDeleteScreenButtonClick = e =>
    {
        e.preventDefault();
        const {selectedScreenIdSet} = this.props;
        if (selectedScreenIdSet.size === 0)
        {
            WarningAlert.pop('未选中任何屏幕');
        }
        else
        {
            ModalFunction.showModal(MODAL_ID.DELETE_SCREEN_MODAL);
        }
    };

    onBatchBindResourcePackButtonClick = e =>
    {
        e.preventDefault();
        const {selectedScreenIdSet} = this.props;
        if (selectedScreenIdSet.size === 0)
        {
            WarningAlert.pop('未选中任何屏幕');
        }
        else
        {
            unselectAllResourcePacks();
            ModalFunction.showModal(MODAL_ID.BATCH_BIND_RESOURCE_PACK_MODAL);
        }
    };

    onBatchUnbindResourcePackButtonClick = e =>
    {
        e.preventDefault();
        const {selectedScreenIdSet} = this.props;
        if (selectedScreenIdSet.size === 0)
        {
            WarningAlert.pop('未选中任何屏幕');
        }
        else
        {
            ModalFunction.showModal(MODAL_ID.BATCH_UNBIND_RESOURCE_PACK_MODAL);
        }
    };

    render()
    {
        const {screenList, selectedScreenIdSet, selectedResourcePackId} = this.props;
        const allScreenIdSet = new Set();
        screenList.forEach(screen =>
        {
            allScreenIdSet.add(screen.id);
        });

        return [
            <ListCard className={Style.ScreenListCard} title={'屏幕列表'} key={Style.ScreenListCard}>
                <div className={Style.headerWrapper}><Header allScreenIdSet={allScreenIdSet} /></div>
                <div className={Style.screenListWrapper}>
                    {screenList.map(screen =>
                    {
                        return <Screen {...screen} key={screen.id} />;
                    })}
                </div>
                <div className={Style.buttonWrapper}>
                    <ToolTip placement={'top'} title={'添加屏幕'}>
                        <ModalTriggeringButton modalId={MODAL_ID.ADD_SCREEN_MODAL}
                                               className={Style.addScreenButton}>
                            <FontAwesomeIcon icon={solidIcon.faPlus} />
                        </ModalTriggeringButton>
                    </ToolTip>
                    <ToolTip placement={'top'} title={'删除屏幕'}>
                        <button className={Style.deleteScreenButton}
                                onClick={this.onDeleteScreenButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faTrash} />
                        </button>
                    </ToolTip>
                    <ToolTip placement={'top'} title={'开始播放'}>
                        <button className={Style.startRunningButton}
                                onClick={this.onStartRunningButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faPlay} />
                        </button>
                    </ToolTip>
                    <ToolTip placement={'top'} title={'停止播放'}>
                        <button className={Style.stopRunningButton}
                                onClick={this.onStopRunningButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faPowerOff} />
                        </button>
                    </ToolTip>
                    <ToolTip placement={'top'} title={'批量绑定资源包'}>
                        <button
                            className={Style.batchBindResourcePackButton}
                            onClick={this.onBatchBindResourcePackButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faFileArchive} />
                        </button>
                    </ToolTip>
                    <ToolTip placement={'top'} title={'批量解绑资源包'}>
                        <button
                            className={Style.batchUnbindResourcePackButton}
                            onClick={this.onBatchUnbindResourcePackButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faTrashAlt} />
                        </button>
                    </ToolTip>
                </div>
            </ListCard>,
            <AddScreenModal key={MODAL_ID.ADD_SCREEN_MODAL} />,
            <DeleteScreenModal selectedScreenIdSet={selectedScreenIdSet} key={MODAL_ID.DELETE_SCREEN_MODAL} />,
            <StartScreenRunningModal selectedScreenIdSet={selectedScreenIdSet}
                                     key={MODAL_ID.START_SCREEN_RUNNING_MODAL} />,
            <StopScreenRunningModal selectedScreenIdSet={selectedScreenIdSet}
                                    key={MODAL_ID.STOP_SCREEN_RUNNING_MODAL} />,
            <BatchBindResourcePackModal selectedResourcePackId={selectedResourcePackId}
                                        selectedScreenIdSet={selectedScreenIdSet}
                                        key={MODAL_ID.BATCH_BIND_RESOURCE_PACK_MODAL} />,
            <BatchUnbindResourcePackModal selectedScreenIdSet={selectedScreenIdSet}
                                          key={MODAL_ID.BATCH_UNBIND_RESOURCE_PACK_MODAL} />,
        ];
    }
}

const mapStateToProps = state =>
{
    const {
        ScreenManagement: {screenList, selectedScreenIdSet, selectedResourcePackId},
    } = state;
    return {
        screenList,
        selectedScreenIdSet,
        selectedResourcePackId,
    };
};

export default connect(mapStateToProps)(ScreenListCard);
