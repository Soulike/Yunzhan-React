import React, {Component} from 'react';
import Style from './Style.module.scss';
import {Function as ModalFunction, SmallModal} from '../../../../../../Components/Bootstrap/Modal';
import {MODAL_ID, REGEX, REGEX_TEXT} from '../../../../../../Config';
import {View as ToolTip} from '../../../../../../Components/Bootstrap/Tooltip';
import {WarningAlert} from '../../../../../../Components/Bootstrap/Alerts';
import RequestProcessor from '../../../../../../RequestProcessor';
import {getScreenList, getScreenManagementBasicInfo} from '../../../../Function';

class AddScreenModal extends Component
{
    constructor(props)
    {
        super(props);
        this.uuidInputRef = React.createRef();
        this.screenNameInputRef = React.createRef();
    }


    onAddScreenModalConfirmButtonClick = async () =>
    {
        const uuid = this.uuidInputRef.current.value;
        const screenName = this.screenNameInputRef.current.value;
        if (!REGEX.UUID.test(uuid))
        {
            WarningAlert.pop('UUID 对应的屏幕不存在');
        }
        else if (!REGEX.SCREEN_NAME.test(screenName))
        {
            WarningAlert.pop('屏幕名不合法');
        }
        else
        {
            const requestIsSuccessful = await RequestProcessor.sendPostAddScreenRequestAsync(uuid, screenName);
            if (requestIsSuccessful)
            {
                this.uuidInputRef.current.value = '';
                this.screenNameInputRef.current.value = '';
                ModalFunction.hideModal(MODAL_ID.ADD_SCREEN_MODAL);
                getScreenManagementBasicInfo();
                getScreenList(); // 刷新屏幕列表
            }
        }
    };

    render()
    {
        return (
            <SmallModal id={MODAL_ID.ADD_SCREEN_MODAL}
                        title={'添加屏幕'}
                        onConfirmButtonClick={this.onAddScreenModalConfirmButtonClick}
                        className={Style.AddScreenModal}>
                <div className={Style.addScreenModalContent}>
                    <div className={Style.inputWrapper}>
                        <ToolTip placement={'top'} title={REGEX_TEXT.UUID}>
                            <input type="text"
                                   className={Style.uuidInput}
                                   placeholder={'被添加屏幕的 UUID'}
                                   autoFocus={true}
                                   ref={this.uuidInputRef} />
                        </ToolTip>
                    </div>
                    <div className={Style.inputWrapper}>
                        <ToolTip placement={'top'} title={REGEX_TEXT.SCREEN_NAME}>
                            <input type="text"
                                   className={Style.screenNameInput}
                                   placeholder={'被添加屏幕的名字'}
                                   ref={this.screenNameInputRef} />
                        </ToolTip>
                    </div>
                </div>
            </SmallModal>
        );
    }
}

export default AddScreenModal;