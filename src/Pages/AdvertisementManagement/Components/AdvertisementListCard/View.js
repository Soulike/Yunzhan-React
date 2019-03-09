import React, {Component} from 'react';
import Style from './Style.module.scss';
import {ADVERTISEMENT_TYPE, Object as AdvertisementObject, View as Advertisement} from './Components/Advertisement';
import {QR_CODE_POSITION_ID, QR_CODE_POSITION_ID_TO_NAME} from '../UploaderCard/Components/ImageUploader';
import {MODAL_ID, REGEX} from '../../../../Config';
import {Function as ModalFunction, Modal} from '../../../../Components/Modal';
import {QRCodePositionId} from '../UploaderCard/Components/ImageUploader/QRCodePosition';
import NAMESPACE from '../../../../Namespace';
import RequestProcessor from '../../../../RequestProcessor';
import {WarningAlert} from '../../../../Components/Alerts';
import {connect} from 'react-redux';
import {View as ListCard} from '../../../../Components/ListCard';
import Function from '../../../../Function';
import {getAdvertisementList} from '../../Function';

class AdvertisementListCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentIdOfAdvertisementInModal: 0,
            currentTypeOfAdvertisementInModal: null,
            advertisementName: '',
            QRCodeUrl: '',
            QRCodePosition: QRCodePositionId.TOP_LEFT,
        };
    }

    onAdvertisementClick = (id, type) =>
    {
        return async () =>
        {
            this.setState({
                currentIdOfAdvertisementInModal: id,
                currentTypeOfAdvertisementInModal: type,
            }, async () =>
            {
                // 根据被点击广告的信息，设置模态框中输入框的值
                const advertisementInfo = await RequestProcessor.sendGetAdvertisementInfoRequestAsync(id);
                if (advertisementInfo)
                {
                    const {
                        [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.TYPE]: type,
                        [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME]: name,
                        [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_URL]: QRCodeUrl,
                        [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_POSITION]: QRCodePosition,
                    } = advertisementInfo;

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
                    }
                    ModalFunction.showModal(MODAL_ID.ADVERTISEMENT_INFO_MODAL);
                }
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

    onAdvertisementInfoModalConfirmClick = async () =>
    {
        const {currentTypeOfAdvertisementInModal, currentIdOfAdvertisementInModal, advertisementName, QRCodeUrl, QRCodePosition} = this.state;
        if (!REGEX.ADVERTISEMENT_NAME.test(advertisementName))
        {
            WarningAlert.pop('请输入正确的文件名');
        }
        else if (currentTypeOfAdvertisementInModal === ADVERTISEMENT_TYPE.IMAGE && !REGEX.URL.test(QRCodeUrl))
        {
            WarningAlert.pop('请输入有效的网址');
        }
        else if (currentTypeOfAdvertisementInModal === ADVERTISEMENT_TYPE.IMAGE && !Object.values(QRCodePositionId).includes(parseInt(QRCodePosition)))
        {
            WarningAlert.pop('选择的位置无效');
        }
        else
        {
            const requestIsSuccessful = await RequestProcessor.sendPostUpdateAdvertisementInfoRequestAsync(currentIdOfAdvertisementInModal, advertisementName, QRCodeUrl, QRCodePosition);
            if (requestIsSuccessful)
            {
                getAdvertisementList();
            }
        }
    };


    render()
    {
        const {advertisementList} = this.props;
        const {currentTypeOfAdvertisementInModal} = this.state;
        return [
            <ListCard className={Style.AdvertisementListCard} title={'广告列表'} subTitle={'可点击查看详细信息'}>
                <div className={Style.advertisementListWrapper}>
                    {
                        advertisementList.map(advertisement =>
                        {
                            const {
                                [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.ID]: id,
                                [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.TYPE]: type,
                            } = advertisement;
                            return (
                                <div className={Style.advertisementWrapper}
                                     key={id}
                                     onClick={this.onAdvertisementClick(id, type)}>
                                    <Advertisement advertisement={new AdvertisementObject.Advertisement(
                                        advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.TYPE],
                                        advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.URL],
                                        advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME],
                                    )} key={advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.URL]} />
                                </div>);
                        })
                    }
                    {

                        Function.padFlexLastRow(<div className={`${Style.advertisementWrapper} ${Style.empty}`} />, 3)
                    }
                </div>
            </ListCard>
            ,
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
                {
                    currentTypeOfAdvertisementInModal === ADVERTISEMENT_TYPE.IMAGE ? [
                        <label className={Style.inputWrapper}>
                            <span className={Style.label}>二维码链接</span>
                            <input type="text"
                                   className={Style.QRCodeUrlInput}
                                   onChange={this.onQRCodeUrlInputChange}
                                   placeholder={'http://example.com/'} />
                        </label>,
                        <label className={Style.inputWrapper}>
                            <span className={Style.label}>二维码位置</span>
                            <select className={`custom-select ${Style.QRCodePositionSelect}`}
                                    onChange={this.onQRCodePositionSelectChange}>
                                {
                                    Object.values(QR_CODE_POSITION_ID).map(id =>
                                        <option key={id} value={id}>{QR_CODE_POSITION_ID_TO_NAME[id]}</option>)
                                }
                            </select>
                        </label>,
                    ] : null
                }
            </Modal>,
        ];
    }
}

const mapStateToProps = state =>
{
    const {AdvertisementManagement: {advertisementList}} = state;
    return {advertisementList};
};

export default connect(mapStateToProps)(AdvertisementListCard);