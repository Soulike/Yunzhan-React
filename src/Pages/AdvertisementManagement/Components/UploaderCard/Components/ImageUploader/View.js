import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as FileInput} from '../../../../../../Components/FileInput';
import {View as ProgressBar} from '../../../../../../Components/ProgressBar';
import {Functions as ModalFunction, Modal} from '../../../../../../Components/Modal';
import {MODAL_ID} from '../../../../../../Static/Constants';
import {WarningAlert} from '../../../../../../Components/Alerts';
import RequestProcessor from '../../../../../../RequestProcessors';
import {QRCodePositionId, QRCodePositionIdToName} from './QRCodePosition';

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

    onImageInfoModalConfirmButtonClick = e =>
    {
        e.preventDefault();
        RequestProcessor.sendPostUploadImageRequestAsync.apply(this)
            .then(res =>
            {
                if (res === false)
                {
                    this.setState({
                        uploadProgress: 0,
                    });
                }
            });
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
                               onFileInputChangeFunction={this.onFileInputChange} />
                </div>
                <div className={Style.progressBarWrapper}>
                    <ProgressBar percentProgress={uploadProgress} />
                </div>
                <div className={Style.buttonWrapper}>
                    <button className={Style.uploadButton} onClick={this.onUploadButtonClick}>开始上传</button>
                </div>
                <Modal id={MODAL_ID.UPLOAD_IMAGE_INFO_MODAL}
                       title={'图片详细信息填写'}
                       onConfirmButtonClickFunction={this.onImageInfoModalConfirmButtonClick}>
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
                                    <option value={id}>{QRCodePositionIdToName[id]}</option>)
                            }
                        </select>
                    </label>
                </Modal>
            </div>
        );
    }
}

export default ImageUploader;