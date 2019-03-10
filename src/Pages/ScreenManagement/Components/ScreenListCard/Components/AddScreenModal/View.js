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
                    ModalFunction.hideModal(MODAL_ID.ADD_SCREEN_MODAL);
                    getScreenManagementBasicInfo();
                    getScreenList(); // 刷新屏幕列表
                });
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
                    <ToolTip placement={'top'} title={REGEX_TEXT.UUID}>
                        <input type="text"
                               className={Style.uuidInput}
                               placeholder={'被添加屏幕的 UUID'}
                               autoFocus={true}
                               onChange={this.onAddScreenModalInputChange} />
                    </ToolTip>
                </div>
            </SmallModal>
        );
    }
}

export default AddScreenModal;