import React, {Component} from 'react';
import Style from './ScreenListCard.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {View as Screen} from './Components/Screen';
import {View as Header} from './Components/Header';
import {connect} from 'react-redux';
import {Function as ModalFunctions, LargeModal, SmallModal} from '../../../../Components/Modal';
import {REGEX, TEXT} from '../../../../Static/Regex';
import {MODAL_ID} from '../../../../Static/Constants';
import {View as ResourcePackList} from './Components/ResourcePackList';
import RequestProcessor from '../../../../RequestProcessor';
import {WarningAlert} from '../../../../Components/Alerts';
import {View as ModalTriggeringButton} from '../../../../Components/Modal/Components/ModalTriggeringButton';
import {getScreenList, getScreenManagementBasicInfo, unselectAllResourcePacks} from '../../Function';
import {View as ToolTip} from '../../../../Components/Tooltip';
import {View as ListCard} from '../../../../Components/ListCard';

class ScreenListCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            uuid: '',
        };
    }

    onAddScreenModalInputChange = e =>
    {
        this.setState({uuid: e.target.value});
    };

    onAddScreenModalConfirmButtonClick = async () =>
    {
        const {uuid} = this.state;
        if (!REGEX.UUID.test(uuid))
        {
            WarningAlert.pop('UUID 对应的屏幕不存在');
        }
        else
        {
            const requestIsSuccessful = await RequestProcessor.sendPostAddScreenRequestAsync(uuid);
            if (requestIsSuccessful)
            {
                this.setState({uuid: ''}, () =>
                {
                    const $uuidInput = document.getElementsByClassName(Style.uuidInput);
                    $uuidInput.value = '';
                    getScreenManagementBasicInfo();
                    getScreenList(); // 刷新屏幕列表
                });
            }
        }
    };

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
            ModalFunctions.showModal(MODAL_ID.START_SCREEN_RUNNING_MODAL);
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
            ModalFunctions.showModal(MODAL_ID.STOP_SCREEN_RUNNING_MODAL);
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
            ModalFunctions.showModal(MODAL_ID.DELETE_SCREEN_MODAL);
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
            ModalFunctions.showModal(MODAL_ID.BATCH_BIND_RESOURCE_PACK_MODAL);
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
            ModalFunctions.showModal(MODAL_ID.BATCH_UNBIND_RESOURCE_PACK_MODAL);
        }
    };

    render()
    {
        const {screenList, selectedScreenIdSet} = this.props;

        const allScreenIdSet = new Set();
        screenList.forEach(screen =>
        {
            allScreenIdSet.add(screen.id);
        });

        return [
            <ListCard className={Style.ScreenListCard} title={'屏幕列表'}>
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

            <SmallModal id={MODAL_ID.ADD_SCREEN_MODAL}
                        title={'添加屏幕'}
                        onConfirmButtonClickFunction={this.onAddScreenModalConfirmButtonClick}>
                <div className={Style.addScreenModalContent}>
                    <ToolTip placement={'top'} title={TEXT.UUID}>
                        <input type="text"
                               className={Style.uuidInput}
                               placeholder={'被添加屏幕的 UUID'}
                               autoFocus={true}
                               onChange={this.onAddScreenModalInputChange} />
                    </ToolTip>
                </div>
            </SmallModal>,
            <SmallModal id={MODAL_ID.DELETE_SCREEN_MODAL}
                        title={'删除屏幕'}
                        onConfirmButtonClickFunction={async () =>
                        {
                            const {selectedScreenIdSet} = this.props;
                            if (await RequestProcessor.sendPostDeleteScreenRequestAsync(Array.from(selectedScreenIdSet.keys())))
                            {
                                getScreenManagementBasicInfo();
                                getScreenList(); // 刷新屏幕列表
                            }
                        }}>
                <span>确认删除选中的 {selectedScreenIdSet.size} 个屏幕吗？<span style={{color: '#F00'}}>此操作不可逆！</span></span>
            </SmallModal>,
            <SmallModal id={MODAL_ID.START_SCREEN_RUNNING_MODAL}
                        title={'开始播放'}
                        onConfirmButtonClickFunction={async () =>
                        {
                            const {selectedScreenIdSet} = this.props;
                            if (await RequestProcessor.sendPostStartScreenRequestAsync(Array.from(selectedScreenIdSet.keys())))
                            {
                                getScreenManagementBasicInfo();
                                getScreenList(); // 刷新屏幕列表
                            }
                        }}>
                <span>确认使选中的 {selectedScreenIdSet.size} 个屏幕开始播放吗？</span>
            </SmallModal>,
            <SmallModal id={MODAL_ID.STOP_SCREEN_RUNNING_MODAL}
                        title={'停止播放'}
                        onConfirmButtonClickFunction={async () =>
                        {
                            const {selectedScreenIdSet} = this.props;
                            if (await RequestProcessor.sendPostStopScreenRequestAsync(Array.from(selectedScreenIdSet.keys())))
                            {
                                getScreenManagementBasicInfo();
                                getScreenList(); // 刷新屏幕列表
                            }
                        }}>
                <span>确认使选中的 {selectedScreenIdSet.size} 个屏幕停止播放吗？</span>
            </SmallModal>,
            <LargeModal id={MODAL_ID.BATCH_BIND_RESOURCE_PACK_MODAL}
                        title={'批量绑定资源包'}
                        onConfirmButtonClickFunction={async () =>
                        {
                            const {selectedResourcePackId} = this.props;
                            if (selectedResourcePackId === null)
                            {
                                WarningAlert.pop('请选择资源包');
                            }
                            else
                            {
                                const {selectedResourcePackId, selectedScreenIdSet} = this.props;
                                if (await RequestProcessor.sendPostBindResourcePackRequestAsync(Array.from(selectedScreenIdSet.keys()), selectedResourcePackId))
                                {
                                    getScreenManagementBasicInfo();
                                    getScreenList(); // 刷新屏幕列表
                                }
                            }
                        }}>
                <ResourcePackList />
            </LargeModal>,
            <SmallModal id={MODAL_ID.BATCH_UNBIND_RESOURCE_PACK_MODAL}
                        title={'批量解绑资源包'}
                        onConfirmButtonClickFunction={async () =>
                        {
                            if (await RequestProcessor.sendPostUnbindResourcePackRequestAsync(Array.from(selectedScreenIdSet.keys())))
                            {
                                getScreenManagementBasicInfo();
                                getScreenList(); // 刷新屏幕列表
                            }
                        }}>
                <span>确认要为选中的 {selectedScreenIdSet.size} 个屏幕解绑资源包吗？</span>
            </SmallModal>,
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
