import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as Card} from '../../../../Components/Card';
import {ADVERTISEMENT_TYPE, Object as AdvertisementObject, View as Advertisement} from './Components/Advertisement';
import {QR_CODE_POSITION_ID, QR_CODE_POSITION_ID_TO_NAME} from '../UploaderCard/Components/ImageUploader';
import {MODAL_ID} from '../../../../Static/Constants';
import {Functions as ModalFunction, Modal} from '../../../../Components/Modal';
import {QRCodePositionId} from '../UploaderCard/Components/ImageUploader/QRCodePosition';
import NAMESPACE from '../../../../Namespace';
import RequestProcessor from '../../../../RequestProcessors';

class AdvertisementListCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.LIST.ADVERTISEMENT]: {},
            currentIdOfAdvertisementInModal: 0,
            advertisementName: '',
            QRCodeUrl: '',
            QRCodePosition: QRCodePositionId.TOP_LEFT,
        };
    }

    componentDidMount()
    {
        RequestProcessor.sendGetAdvertisementListRequest.apply(this);
    }

    onAdvertisementClick = id =>
    {
        return () =>
        {
            this.setState({
                currentIdOfAdvertisementInModal: id,
            }, () =>
            {
                // 根据被点击广告的信息，设置模态框中输入框的值
                const {advertisementList} = this.state;
                const advertisement = advertisementList[id];
                const {
                    [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.TYPE]: type,
                    [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME]: name,
                    [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_URL]: QRCodeUrl,
                    [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_POSITION]: QRCodePosition,
                } = advertisement;

                const $advertisementNameInput = document.querySelector(`.${Style.advertisementNameInput}`);
                const $advertisementTypeInput = document.querySelector(`.${Style.advertisementTypeInput}`);
                const $QRCodeUrlInput = document.querySelector(`.${Style.QRCodeUrlInput}`);

                const $QRCodePositionSelect = document.querySelector(`.${Style.QRCodePositionSelect}`);
                $advertisementNameInput.value = name;
                this.setState({
                    advertisementName: name,
                });

                if (type === ADVERTISEMENT_TYPE.IMAGE)// 如果是图片，开启二维码相关设置
                {
                    $advertisementTypeInput.value = '图片';
                    $QRCodeUrlInput.removeAttribute('disabled');
                    $QRCodePositionSelect.removeAttribute('disabled');

                    $QRCodeUrlInput.value = QRCodeUrl;
                    $QRCodePositionSelect.value = QRCodePosition;
                    this.setState({
                        QRCodeUrl,
                        QRCodePosition,
                    });
                }
                else if (type === ADVERTISEMENT_TYPE.VIDEO)// 如果是视频，关闭二维码相关设置
                {
                    $advertisementTypeInput.value = '视频';
                    $QRCodeUrlInput.disabled = true;
                    $QRCodePositionSelect.disabled = true;
                }
                ModalFunction.showModal(MODAL_ID.ADVERTISEMENT_INFO_MODAL);
            });
        };
    };

    onAdvertisementNameInputChange = e =>
    {
        this.setState({
            advertisementName: e.target.value,
        });
    };

    onQRCodeUrlInputChange = e =>
    {
        this.setState({
            QRCodeUrl: e.target.value,
        });
    };

    onQRCodePositionSelectChange = e =>
    {
        this.setState({
            QRCodePosition: e.target.value,
        });
    };

    onAdvertisementInfoModalConfirmClick = () =>
    {
        RequestProcessor.sendPostUpdateAdvertisementInfoRequest.apply(this);
    };


    render()
    {
        const {[NAMESPACE.ADVERTISEMENT_MANAGEMENT.LIST.ADVERTISEMENT]: advertisementList} = this.state;
        return (
            <div className={Style.AdvertisementListCard}>
                <Card title={'广告列表'}>
                    <div className={Style.content}>
                        {
                            Object.keys(advertisementList).map(id =>
                            {
                                const advertisement = advertisementList[id];
                                return (
                                    <div className={Style.advertisementWrapper}
                                         key={id}
                                         onClick={this.onAdvertisementClick(id)}>
                                        <Advertisement advertisement={new AdvertisementObject.Advertisement(
                                            advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.TYPE],
                                            advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.URL],
                                            advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME],
                                        )} key={advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.URL]} />
                                    </div>);
                            })
                        }
                    </div>
                </Card>

                <Modal id={MODAL_ID.ADVERTISEMENT_INFO_MODAL}
                       title={'广告信息'}
                       onConfirmButtonClickFunction={this.onAdvertisementInfoModalConfirmClick}>
                    <label className={Style.inputWrapper}>
                        <span className={Style.label}>广告类型</span>
                        <input type="text" className={Style.advertisementTypeInput} disabled />
                    </label>
                    <label className={Style.inputWrapper}>
                        <span className={Style.label}>广告名</span>
                        <input type="text"
                               className={Style.advertisementNameInput}
                               onChange={this.onAdvertisementNameInputChange} />
                    </label>
                    <label className={Style.inputWrapper}>
                        <span className={Style.label}>二维码链接</span>
                        <input type="text"
                               className={Style.QRCodeUrlInput}
                               onChange={this.onQRCodeUrlInputChange}
                               placeholder={'http://example.com/'} />
                    </label>
                    <label className={Style.inputWrapper}>
                        <span className={Style.label}>二维码位置</span>
                        <select className={`custom-select ${Style.QRCodePositionSelect}`}
                                onChange={this.onQRCodePositionSelectChange}>
                            {
                                Object.values(QR_CODE_POSITION_ID).map(id =>
                                    <option key={id} value={id}>{QR_CODE_POSITION_ID_TO_NAME[id]}</option>)
                            }
                        </select>
                    </label>
                </Modal>
            </div>
        );
    }
}

export default AdvertisementListCard;