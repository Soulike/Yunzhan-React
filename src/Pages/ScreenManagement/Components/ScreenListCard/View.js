import React, {Component} from 'react';
import style from './ScreenListCard.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {View as Card} from '../../../../Components/Card';
import {View as Screen} from './Components/Screen';
import {View as Header} from './Components/Header';
import * as Actions from './Actions/Actions';
import Store from '../../../../Store';
import {connect} from 'react-redux';
import {Functions as ModalFunctions, LargeModal, SmallModal} from '../../../../Components/Modal';
import REGEX from '../../../../Static/Regex';
import {MODAL_ID} from '../../../../Static/Constants';
import {View as ResourcePackList} from './Components/ResourcePackList';
import NAMESPACE from '../../../../Namespace';
import RequestProcessor from '../../../../RequestProcessor';
import {WarningAlert} from '../../../../Components/Alerts';
import {View as ModalTriggeringButton} from '../../../../Components/Modal/Components/ModalTriggeringButton';

class ScreenListCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: '',
        };
    }


    componentDidMount()
    {
        Store.dispatch(Actions.getScreenList());
    }

    onAddScreenModalInputChange = e =>
    {
        this.setState({[NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: e.target.value});
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

        const screenIdSet = new Set();
        screenList.forEach(screen =>
        {
            screenIdSet.add(screen.id);
        });

        return (
            <div className={style.ScreenListCard}>

                <Card title={'屏幕列表'}>
                    <div className={style.headerWrapper}><Header screenIdSet={screenIdSet} /></div>
                    <div className={style.screenListWrapper}>
                        {screenList.map(screen =>
                        {
                            return <Screen {...screen} key={screen.id} />;
                        })}
                    </div>
                    <div className={style.buttonWrapper}>
                        <ModalTriggeringButton modalId={MODAL_ID.ADD_SCREEN_MODAL}
                                               className={style.addScreenButton}
                                               title={'添加屏幕'}>
                            <FontAwesomeIcon icon={solidIcon.faPlus} />
                        </ModalTriggeringButton>
                        <button className={style.deleteScreenButton}
                                title={'删除屏幕'}
                                onClick={this.onDeleteScreenButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faTrash} />
                        </button>
                        <button className={style.startRunningButton} title={'开始播放'}
                                onClick={this.onStartRunningButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faPlay} />
                        </button>
                        <button className={style.stopRunningButton} title={'停止播放'}
                                onClick={this.onStopRunningButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faPowerOff} />
                        </button>
                        <button
                            className={style.batchBindResourcePackButton}
                            title={'批量绑定资源包'}
                            onClick={this.onBatchBindResourcePackButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faFileArchive} />
                        </button>
                        <button
                            className={style.batchUnbindResourcePackButton}
                            title={'批量解绑资源包'}
                            onClick={this.onBatchUnbindResourcePackButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faTrashAlt} />
                        </button>
                    </div>
                </Card>

                <SmallModal id={MODAL_ID.ADD_SCREEN_MODAL}
                            title={'添加屏幕'}
                            onConfirmButtonClickFunction={async () =>
                            {
                                const {[NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: uuid} = this.state;
                                if (!REGEX.UUID.test(uuid))
                                {
                                    WarningAlert.pop('UUID 对应的屏幕不存在');
                                }
                                else
                                {
                                    const {[NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: uuid} = this.state;
                                    await RequestProcessor.sendPostAddScreenRequestAsync(uuid);
                                }
                            }}>
                    <div className={style.addScreenModalContent}>
                        <input type="text"
                               className={style.uuidInput}
                               placeholder={'被添加屏幕的 UUID'}
                               autoFocus={true}
                               onChange={this.onAddScreenModalInputChange} />
                    </div>
                </SmallModal>
                <SmallModal id={MODAL_ID.DELETE_SCREEN_MODAL}
                            title={'删除屏幕'}
                            onConfirmButtonClickFunction={async () =>
                            {
                                const {selectedScreenIdSet} = this.props;
                                await RequestProcessor.sendPostDeleteScreenRequestAsync(Array.from(selectedScreenIdSet.keys()));
                            }}>
                    <span>确认删除选中的 {selectedScreenIdSet.size} 个屏幕吗？<span style={{color: '#F00'}}>此操作不可逆！</span></span>
                </SmallModal>
                <SmallModal id={MODAL_ID.START_SCREEN_RUNNING_MODAL}
                            title={'开始播放'}
                            onConfirmButtonClickFunction={async () =>
                            {
                                const {selectedScreenIdSet} = this.props;
                                await RequestProcessor.sendPostStartScreenRequestAsync(Array.from(selectedScreenIdSet.keys()));
                            }}>
                    <span>确认使选中的 {selectedScreenIdSet.size} 个屏幕开始播放吗？</span>
                </SmallModal>
                <SmallModal id={MODAL_ID.STOP_SCREEN_RUNNING_MODAL}
                            title={'停止播放'}
                            onConfirmButtonClickFunction={async () =>
                            {
                                const {selectedScreenIdSet} = this.props;
                                await RequestProcessor.sendPostStopScreenRequestAsync(Array.from(selectedScreenIdSet.keys()));
                            }}>
                    <span>确认使选中的 {selectedScreenIdSet.size} 个屏幕停止播放吗？</span>
                </SmallModal>
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
                                    await RequestProcessor.sendPostBindResourcePackRequestAsync(Array.from(selectedScreenIdSet.keys()), selectedResourcePackId);
                                }
                            }}>
                    <ResourcePackList />
                </LargeModal>
                <SmallModal id={MODAL_ID.BATCH_UNBIND_RESOURCE_PACK_MODAL}
                            title={'批量解绑资源包'}
                            onConfirmButtonClickFunction={async () =>
                            {
                                await RequestProcessor.sendPostUnbindResourcePackRequestAsync(Array.from(selectedScreenIdSet.keys()));
                            }}>
                    <span>确认要为选中的 {selectedScreenIdSet.size} 个屏幕解绑资源包吗？</span>
                </SmallModal>
            </div>
        );
    }
}

const mapStateToProps = state =>
{
    const {[NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN]: screenList, selectedScreenIdSet} = state.ScreenListCard;
    const {selectedResourcePackId} = state.ScreenManagementResourcePackList;
    return {
        [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN]: screenList,
        selectedScreenIdSet,
        selectedResourcePackId,
    };
};

export default connect(mapStateToProps)(ScreenListCard);
