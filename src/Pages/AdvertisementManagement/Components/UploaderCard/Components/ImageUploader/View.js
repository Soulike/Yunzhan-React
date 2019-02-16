import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as FileInput} from '../../../../../../Components/FileInput';
import {View as ProgressBar} from '../../../../../../Components/ProgressBar';
import {Functions as ModalFunction, Modal} from '../../../../../../Components/Modal';
import {MODAL_ID} from '../../../../../../Static/Constants';
import {WarningAlert} from '../../../../../../Components/Alerts';
import RequestProcessor from '../../../../../../RequestProcessors';

class ImageUploader extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            imageFileObject: null,
            imageSrc: '',
            imageName: '',
            uploadProgress: 0,
        };
    }

    onFileInputChange = e =>
    {
        this.setState({
            imageFileObject: e.target.files[0],
            imageSrc: URL.createObjectURL(e.target.files[0]),
            imageName: e.target.files[0].name,
        });
        const $imageNameInput = document.querySelector(`.${Style.imageNameInput}`);
        $imageNameInput.value = e.target.files[0].name;
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
        return (
            <div className={Style.ImageUploader}>
                <div className={Style.fileInputWrapper}>
                    <FileInput labelText={'选择图片'}
                               accept={'image/*'}
                               onFileInputChangeFunction={this.onFileInputChange} />
                </div>
                <div className={Style.progressBarWrapper}>
                    <ProgressBar percentProgress={0} />
                </div>
                <div className={Style.buttonWrapper}>
                    <button className={Style.uploadButton} onClick={this.onUploadButtonClick}>开始上传</button>
                </div>
                <Modal id={MODAL_ID.UPLOAD_IMAGE_INFO_MODAL}
                       title={'图片详细信息填写'}
                       onConfirmButtonClickFunction={this.onImageInfoModalConfirmButtonClick}>
                    <label className={Style.inputWrapper}>
                        <span className={Style.label}>图片名</span>
                        <input type="text" className={Style.imageNameInput} onChange={this.onImageNameInputChange} />
                    </label>
                </Modal>
            </div>
        );
    }
}

export default ImageUploader;