import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as FileInput} from '../../../../../../Components/Bootstrap/FileInput';
import {View as ProgressBar} from '../../../../../../Components/Bootstrap/ProgressBar';
import {Function as ModalFunction, Modal} from '../../../../../../Components/Bootstrap/Modal';
import {MODAL_ID, REGEX} from '../../../../../../Config';
import {WarningAlert} from '../../../../../../Components/Bootstrap/Alerts';
import RequestProcessor from '../../../../../../RequestProcessor';
import {QRCodePositionId, QRCodePositionIdToName} from './QRCodePosition';
import {getAdvertisementList, getAdvertisementManagementBasicInfo} from '../../../../Function';

class ImageUploader extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            imageFileObject: null,
            imageSrc: '',
            imageName: '',
            QRCodeUrl: '',
            QRCodePosition: QRCodePositionId.TOP_LEFT,
            uploadProgress: 0,
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {imageFileObject} = this.state;
        if (prevState.imageFileObject !== imageFileObject) // 只要文件变化了，重设表单所有值
        {
            this.setState({
                QRCodeUrl: '',
                QRCodePosition: QRCodePositionId.TOP_LEFT,
                uploadProgress: 0,
            }, () =>
            {
                const {imageName, QRCodeUrl, QRCodePosition} = this.state;
                //所有输入框的值与state时刻保持一致
                const $imageNameInput = document.querySelector(`.${Style.imageNameInput}`);
                const $QRCodeUrlInput = document.querySelector(`.${Style.QRCodeUrlInput}`);
                const $QRCodePositionSelect = document.querySelector(`.${Style.QRCodePositionSelect}`);
                $imageNameInput.value = imageName;
                $QRCodeUrlInput.value = QRCodeUrl;
                $QRCodePositionSelect.value = QRCodePosition;
            });
        }
    }

    onFileInputChange = e =>
    {
        this.setState({
            imageFileObject: e.target.files[0],
            imageSrc: URL.createObjectURL(e.target.files[0]),
            imageName: e.target.files[0].name,
        });
    };

    onUploadButtonClick = e =>
    {
        e.preventDefault();
        const {imageFileObject} = this.state;
        if (imageFileObject === null)
        {
            WarningAlert.pop('请选择要上传的图片');
        }
        else
        {
            ModalFunction.showModal(MODAL_ID.UPLOAD_IMAGE_INFO_MODAL);
        }
    };

    onImageNameInputChange = e =>
    {
        this.setState({
            imageName: e.target.value,
        });
    };

    onQRCodeInputChange = e =>
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

    onImageInfoModalConfirmButtonClick = async e =>
    {
        e.preventDefault();
        const {imageFileObject, imageName, QRCodeUrl, QRCodePosition} = this.state;
        if (!REGEX.ADVERTISEMENT_NAME.test(imageName))
        {
            WarningAlert.pop('请输入正确的图片名');
        }
        else if (!REGEX.URL.test(QRCodeUrl))
        {
            WarningAlert.pop('请输入有效的网址');
        }
        else if (!Object.values(QRCodePositionId).includes(parseInt(QRCodePosition)))
        {
            WarningAlert.pop('选择的位置无效');
        }
        else
        {
            const uploadIsSuccessful = await RequestProcessor.sendPostUploadImageRequestAsync.apply(this, [imageFileObject, imageName, QRCodeUrl, QRCodePosition]);// 需要访问 uploadProgress 状态，因此需要传入 this
            if (!uploadIsSuccessful)
            {
                this.setState({
                    uploadProgress: 0,
                });
            }
            else
            {
                getAdvertisementManagementBasicInfo();
                getAdvertisementList();
            }
        }
    };

    render()
    {
        const {imageSrc, uploadProgress} = this.state;
        return (
            <div className={Style.ImageUploader}>
                <div className={Style.imagePreviewerWrapper}>
                    <div className={Style.imagePreviewer} style={{background: `url(${imageSrc})`}}>
                        {imageSrc.length === 0 ? '预览' : null}
                    </div>
                </div>
                <div className={Style.fileInputWrapper}>
                    <FileInput labelText={'选择图片'}
                               accept={'image/*'}
                               onChange={this.onFileInputChange} />
                </div>
                <div className={Style.progressBarWrapper}>
                    <ProgressBar percentProgress={uploadProgress} />
                </div>
                <div className={Style.buttonWrapper}>
                    <button className={Style.uploadButton} onClick={this.onUploadButtonClick}>开始上传</button>
                </div>
                <Modal id={MODAL_ID.UPLOAD_IMAGE_INFO_MODAL}
                       title={'图片详细信息填写'}
                       onConfirmButtonClick={this.onImageInfoModalConfirmButtonClick}>
                    <label className={Style.inputWrapper}>
                        <span className={Style.label}>图片名</span>
                        <input type="text"
                               className={Style.imageNameInput}
                               onChange={this.onImageNameInputChange}
                               placeholder={'图片名'} />
                    </label>
                    <label className={Style.inputWrapper}>
                        <span className={Style.label}>二维码链接</span>
                        <input type="text"
                               className={Style.QRCodeUrlInput}
                               onChange={this.onQRCodeInputChange}
                               placeholder={'http://example.com/'} />
                    </label>
                    <label className={Style.inputWrapper}>
                        <span className={Style.label}>二维码位置</span>
                        <select className={`custom-select ${Style.QRCodePositionSelect}`}
                                onChange={this.onQRCodePositionSelectChange}>
                            {
                                Object.values(QRCodePositionId).map(id =>
                                    <option key={id} value={id}>{QRCodePositionIdToName[id]}</option>)
                            }
                        </select>
                    </label>
                </Modal>
            </div>
        );
    }
}

export default ImageUploader;