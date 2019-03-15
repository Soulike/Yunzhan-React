import React, {Component} from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {Function as ModalFunction, Modal} from '../../../../../../Components/Bootstrap/Modal';
import {MODAL_ID} from '../../../../../../Config';
import {View as RunningSign} from '../RunningSign';
import RequestProcessor from '../../../../../../RequestProcessor';
import {getScreenList} from '../../../../Function';
import UnbindResourcePackModal from './Components/UnbindResourcePackModal/View';

class ChangeScreenModal extends Component
{
    constructor(props)
    {
        super(props);
        this.screenNameInputRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (prevProps.screenId !== this.props.screenId)
        {
            this.screenNameInputRef.current.value = this.props.screenName;
        }
    }

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

    onUnbindResourcePackButtonClick = async () =>
    {
        await ModalFunction.hideModalAsync(MODAL_ID.CHANGE_SCREEN_MODAL);
        ModalFunction.showModal(MODAL_ID.UNBIND_RESOURCE_PACK_MODAL);
    };

    render()
    {
        const {uuid, screenId, screenName, screenIsRunning, resourcePackNameOfScreen} = this.props;
        return [
            <Modal id={MODAL_ID.CHANGE_SCREEN_MODAL} title={`修改屏幕 ${screenName}`} className={Style.ChangeScreenModal}>
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
                                        <button className={Style.bindResourcePackButton}>绑定资源包</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>,
            <UnbindResourcePackModal screenId={screenId}
                                     screenName={screenName}
                                     resourcePackNameOfScreen={resourcePackNameOfScreen} />,
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