import React, {Component} from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {Function as ModalFunction, Modal} from '../../../../../../Components/Bootstrap/Modal';
import {MODAL_ID} from '../../../../../../Config';
import {View as RunningSign} from '../RunningSign';
import RequestProcessor from '../../../../../../RequestProcessor';
import {getScreenList} from '../../../../Function';
import {View as UnbindResourcePackModal} from './Components/UnbindResourcePackModal';
import {View as DeleteScreenModal} from './Components/DeleteScreenModal';
import {View as BindResourcePackModal} from './Components/BindResourcePackModal';

class ChangeScreenModal extends Component
{
    constructor(props)
    {
        super(props);
        this.screenNameInputRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (prevProps.screenName !== this.props.screenName)
        {
            this.screenNameInputRef.current.value = this.props.screenName;
        }
    }

    onConfirmButtonClick = async () =>
    {
        const {screenId, originalScreenName} = this.props;
        const screenName = this.screenNameInputRef.current.value;

        if (screenName !== originalScreenName)
        {
            const requestIsSuccessful = await RequestProcessor.sendPostChangeScreenInfoRequestAsync(screenId, screenName);
            if (requestIsSuccessful)
            {
                getScreenList();
                ModalFunction.hideModal(MODAL_ID.CHANGE_SCREEN_MODAL);
            }
        }
        else
        {
            ModalFunction.hideModal(MODAL_ID.CHANGE_SCREEN_MODAL);
        }
    };

    onStopRunningButtonClick = async () =>
    {
        const {screenId} = this.props;
        const requestIsSuccessful = await RequestProcessor.sendPostStopScreenRequestAsync([screenId]);
        if (requestIsSuccessful)
        {
            getScreenList();
        }
    };

    onStartRunningButtonClick = async () =>
    {
        const {screenId} = this.props;
        const requestIsSuccessful = await RequestProcessor.sendPostStartScreenRequestAsync([screenId]);
        if (requestIsSuccessful)
        {
            getScreenList();
        }
    };

    onBindResourcePackButton = async () =>
    {
        await ModalFunction.hideModalAsync(MODAL_ID.CHANGE_SCREEN_MODAL);
        ModalFunction.showModal(MODAL_ID.BIND_RESOURCE_PACK_MODAL);
    };

    onUnbindResourcePackButtonClick = async () =>
    {
        await ModalFunction.hideModalAsync(MODAL_ID.CHANGE_SCREEN_MODAL);
        ModalFunction.showModal(MODAL_ID.UNBIND_RESOURCE_PACK_MODAL);
    };

    onDeleteScreenButtonClick = async () =>
    {
        await ModalFunction.hideModalAsync(MODAL_ID.CHANGE_SCREEN_MODAL);
        ModalFunction.showModal(MODAL_ID.DELETE_SCREEN_MODAL);
    };

    render()
    {
        const {uuid, screenId, screenName, screenIsRunning, resourcePackNameOfScreen} = this.props;
        return [
            <Modal id={MODAL_ID.CHANGE_SCREEN_MODAL}
                   title={`修改屏幕 ${screenName}`}
                   className={Style.ChangeScreenModal}
                   onConfirmButtonClick={this.onConfirmButtonClick}>
                <div className={Style.changeScreenModalContent}>
                    <div className={Style.item}>
                        <div className={Style.label}>UUID：</div>
                        <div className={Style.content}>{uuid}</div>
                    </div>
                    <div className={Style.item}>
                        <div className={Style.label}>屏幕名：</div>
                        <div className={Style.content}>
                            <input type="text" ref={this.screenNameInputRef} />
                        </div>
                    </div>
                    <div className={Style.item}>
                        <div className={Style.label}>状态：</div>
                        <div className={Style.content}>
                            <div className={Style.screenRunningStateWrapper}>
                                <RunningSign isRunning={screenIsRunning} />
                            </div>
                            <div className={Style.changeScreenRunningStateButtonWrapper}>
                                {
                                    screenIsRunning ?
                                        <button className={Style.stopRunningButton}
                                                onClick={this.onStopRunningButtonClick}>停止运行</button> :
                                        <button className={Style.startRunningButton}
                                                onClick={this.onStartRunningButtonClick}>开始运行</button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={Style.item}>
                        <div className={Style.label}>资源包：</div>
                        <div className={Style.content}>
                            <div className={Style.resourcePackNameOfScreen}>{resourcePackNameOfScreen ? resourcePackNameOfScreen : '未绑定'}</div>
                            <div className={Style.resourcePackButtonWrapper}>
                                {
                                    resourcePackNameOfScreen ?
                                        <button className={Style.unbindResourcePackButton}
                                                onClick={this.onUnbindResourcePackButtonClick}>解绑资源包</button> :
                                        <button className={Style.bindResourcePackButton}
                                                onClick={this.onBindResourcePackButton}>绑定资源包</button>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={Style.deleteScreenButtonWrapper}>
                        <button className={Style.deleteScreenButton}
                                onClick={this.onDeleteScreenButtonClick}>删除该屏幕
                        </button>
                    </div>
                </div>
            </Modal>,
            <BindResourcePackModal screenId={screenId} screenName={screenName} />,
            <UnbindResourcePackModal screenId={screenId}
                                     screenName={screenName}
                                     resourcePackNameOfScreen={resourcePackNameOfScreen} />,
            <DeleteScreenModal screenId={screenId} screenName={screenName} />,
        ];
    }
}

ChangeScreenModal.propTypes = {
    screenId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    uuid: PropTypes.string.isRequired,
    screenName: PropTypes.string.isRequired,
    screenIsRunning: PropTypes.bool.isRequired,
    resourcePackNameOfScreen: PropTypes.string,
};

export default ChangeScreenModal;