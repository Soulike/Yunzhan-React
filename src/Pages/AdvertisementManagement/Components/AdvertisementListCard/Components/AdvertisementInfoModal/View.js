import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {MODAL_ID, REGEX} from '../../../../../../Config';
import {ADVERTISEMENT_TYPE} from '../../../../../../Components/Advertisement';
import {QR_CODE_POSITION_ID, QR_CODE_POSITION_ID_TO_NAME} from '../../../UploaderCard/Components/ImageUploader';
import {Function as ModalFunction, Modal} from '../../../../../../Components/Bootstrap/Modal';
import {WarningAlert} from '../../../../../../Components/Bootstrap/Alerts';
import {QRCodePositionId} from '../../../UploaderCard/Components/ImageUploader/QRCodePosition';
import RequestProcessor from '../../../../../../RequestProcessor';
import {getAdvertisementList} from '../../../../Function';
import {View as DeleteAdvertisementModal} from './Components/DeleteAdvertisementModal';

class AdvertisementInfoModal extends Component
{
    constructor(props)
    {
        super(props);

        this.advertisementTypeInputRef = React.createRef();
        this.advertisementNameInputRef = React.createRef();
        this.QRCodeUrlInputRef = React.createRef();
        this.QRCodePositionSelectRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {advertisementName, advertisementType, advertisementQRCodeUrl, advertisementQRCodePosition} = this.props;
        this.advertisementNameInputRef.current.value = advertisementName;
        if (advertisementType === ADVERTISEMENT_TYPE.IMAGE)// 如果是图片，开启二维码相关设置
        {
            this.advertisementTypeInputRef.current.value = '图片';

            this.QRCodeUrlInputRef.current.value = advertisementQRCodeUrl;
            this.QRCodePositionSelectRef.current.value = advertisementQRCodePosition;
        }
        else if (advertisementType === ADVERTISEMENT_TYPE.VIDEO)// 如果是视频，关闭二维码相关设置
        {
            this.advertisementTypeInputRef.current.value = '视频';
        }
    }

    onAdvertisementInfoModalConfirmClick = async () =>
    {
        const {advertisementId, advertisementType} = this.props;
        const advertisementName = this.advertisementNameInputRef.current.value;
        const advertisementQRCodeUrl = advertisementType === ADVERTISEMENT_TYPE.IMAGE ? this.QRCodeUrlInputRef.current.value : '';
        const advertisementQRCodePosition = advertisementType === ADVERTISEMENT_TYPE.IMAGE ? this.QRCodePositionSelectRef.current.value : QR_CODE_POSITION_ID.TOP_LEFT;


        if (!REGEX.ADVERTISEMENT_NAME.test(advertisementName))
        {
            WarningAlert.pop('请输入正确的文件名');
        }
        else if (advertisementType === ADVERTISEMENT_TYPE.IMAGE && !REGEX.URL.test(advertisementQRCodeUrl))
        {
            WarningAlert.pop('请输入有效的网址');
        }
        else if (advertisementType === ADVERTISEMENT_TYPE.IMAGE && !Object.values(QRCodePositionId).includes(parseInt(advertisementQRCodePosition)))
        {
            WarningAlert.pop('选择的位置无效');
        }
        else
        {
            const requestIsSuccessful = await RequestProcessor.sendPostUpdateAdvertisementInfoRequestAsync(
                advertisementId,
                advertisementName,
                advertisementQRCodeUrl,
                advertisementQRCodePosition);
            if (requestIsSuccessful)
            {
                ModalFunction.hideModal(MODAL_ID.ADVERTISEMENT_INFO_MODAL);
                getAdvertisementList();
            }
        }
    };

    onDeleteAdvertisementModalTriggerButtonClick = async () =>
    {
        await ModalFunction.hideModalAsync(MODAL_ID.ADVERTISEMENT_INFO_MODAL);
        ModalFunction.showModal(MODAL_ID.DELETE_ADVERTISEMENT_MODAL);
    };

    render()
    {
        const {advertisementType, advertisementId, advertisementName} = this.props;
        return [
            <Modal id={MODAL_ID.ADVERTISEMENT_INFO_MODAL}
                   title={'广告信息'}
                   className={Style.AdvertisementInfoModal}
                   key={MODAL_ID.ADVERTISEMENT_INFO_MODAL}
                   onConfirmButtonClick={this.onAdvertisementInfoModalConfirmClick}>
                <label className={Style.inputWrapper}>
                    <span className={Style.label}>广告类型</span>
                    <input type="text"
                           className={Style.advertisementTypeInput}
                           ref={this.advertisementTypeInputRef}
                           disabled />
                </label>
                <label className={Style.inputWrapper}>
                    <span className={Style.label}>广告名</span>
                    <input type="text"
                           className={Style.advertisementNameInput}
                           ref={this.advertisementNameInputRef} />
                </label>
                {
                    advertisementType === ADVERTISEMENT_TYPE.IMAGE ? [
                        <label className={Style.inputWrapper} key={`${Style.inputWrapper}_1`}>
                            <span className={Style.label}>二维码链接</span>
                            <input type="text"
                                   className={Style.QRCodeUrlInput}
                                   ref={this.QRCodeUrlInputRef}
                                   placeholder={'http://example.com/'} />
                        </label>,
                        <label className={Style.inputWrapper} key={`${Style.inputWrapper}_2`}>
                            <span className={Style.label}>二维码位置</span>
                            <select className={`custom-select ${Style.QRCodePositionSelect}`}
                                    ref={this.QRCodePositionSelectRef}>
                                {
                                    Object.values(QR_CODE_POSITION_ID).map(id =>
                                        <option key={id} value={id}>{QR_CODE_POSITION_ID_TO_NAME[id]}</option>)
                                }
                            </select>
                        </label>,
                    ] : null
                }
                <div className={Style.deleteAdvertisementModalTriggerButtonWrapper}>
                    <button className={Style.deleteAdvertisementModalTriggerButton}
                            onClick={this.onDeleteAdvertisementModalTriggerButtonClick}>
                        删除该广告
                    </button>
                </div>
            </Modal>,
            <DeleteAdvertisementModal advertisementId={advertisementId}
                                      advertisementName={advertisementName}
                                      key={MODAL_ID.DELETE_ADVERTISEMENT_MODAL} />,
        ];
    }
}

AdvertisementInfoModal.propTypes = {
    advertisementId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    advertisementType: PropTypes.number.isRequired,
    advertisementName: PropTypes.string.isRequired,
    advertisementQRCodeUrl: PropTypes.string,
    advertisementQRCodePosition: PropTypes.number,
};

export default AdvertisementInfoModal;