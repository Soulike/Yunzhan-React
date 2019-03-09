import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as FileInput} from '../../../../../../Components/FileInput';
import {View as ProgressBar} from '../../../../../../Components/ProgressBar';
import {MODAL_ID} from '../../../../../../Static/Constants';
import {Function as ModalFunction, Modal} from '../../../../../../Components/Modal';
import {WarningAlert} from '../../../../../../Components/Alerts';
import RequestProcessor from '../../../../../../RequestProcessor';
import {REGEX} from '../../../../../../Static/Regex';
import {getAdvertisementList, getAdvertisementManagementBasicInfo} from '../../../../Function';

class VideoUploader extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            videoFileObject: null,
            videoSrc: '',
            videoName: '',
            uploadProgress: 0,
        };
    }

    onFileInputChange = e =>
    {
        this.setState({
            videoFileObject: e.target.files[0],
            videoSrc: URL.createObjectURL(e.target.files[0]),
            videoName: e.target.files[0].name,
        });
        const $videoNameInput = document.querySelector(`.${Style.videoNameInput}`);
        $videoNameInput.value = e.target.files[0].name;
    };

    onUploadButtonClick = e =>
    {
        e.preventDefault();
        const {videoFileObject} = this.state;
        if (videoFileObject === null)
        {
            WarningAlert.pop('请选择要上传的视频');
        }
        else
        {
            ModalFunction.showModal(MODAL_ID.UPLOAD_VIDEO_INFO_MODAL);
        }
    };

    onVideoNameInputChange = e =>
    {
        this.setState({
            videoName: e.target.value,
        });
    };

    onVideoInfoModalConfirmButtonClick = async e =>
    {
        e.preventDefault();
        const {videoFileObject, videoName} = this.state;
        if (!REGEX.ADVERTISEMENT_NAME.test(videoName))
        {
            WarningAlert.pop('请输入正确的视频名');
        }
        else
        {
            const uploadIsSuccessful = await RequestProcessor.sendPostUploadVideoRequestAsync.apply(this, [videoFileObject, videoName]);
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
        const {videoSrc, uploadProgress} = this.state;
        return (
            <div className={Style.VideoUploader}>
                <div className={Style.videoWrapper}>
                    <video controls className={Style.video} src={videoSrc} autoPlay />
                </div>
                <div className={Style.fileInputWrapper}>
                    <FileInput labelText={'选择视频'}
                               accept={'video/*'}
                               onFileInputChangeFunction={this.onFileInputChange} />
                </div>
                <div className={Style.progressBarWrapper}>
                    <ProgressBar percentProgress={uploadProgress} />
                </div>
                <div className={Style.buttonWrapper}>
                    <button className={Style.uploadButton} onClick={this.onUploadButtonClick}>开始上传</button>
                </div>
                <Modal id={MODAL_ID.UPLOAD_VIDEO_INFO_MODAL}
                       title={'视频详细信息填写'}
                       onConfirmButtonClickFunction={this.onVideoInfoModalConfirmButtonClick}>
                    <label className={Style.inputWrapper}>
                        <span className={Style.label}>视频名</span>
                        <input type="text" className={Style.videoNameInput} onChange={this.onVideoNameInputChange} />
                    </label>
                </Modal>
            </div>
        );
    }
}

export default VideoUploader;