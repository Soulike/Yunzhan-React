import React, {Component} from 'react';
import Style from './Style.module.scss';
import Function from '../../../../Functions';
import {View as Card} from '../../../../Components/Card';
import {View as ImageUploader} from './Components/ImageUploader';
import {View as VideoUploader} from './Components/VideoUploader';

class UploaderCard extends Component
{
    static TAB_TYPE = {
        IMAGE_UPLOAD: Function.randomString(),
        VIDEO_UPLOAD: Function.randomString(),
    };

    constructor(props)
    {
        super(props);
        this.state = {
            currentTabType: UploaderCard.TAB_TYPE.IMAGE_UPLOAD,
        };
    }

    setTabType = tabType =>
    {
        return () =>
        {
            this.setState({currentTabType: tabType});
        };
    };

    render()
    {
        const {currentTabType} = this.state;
        const {IMAGE_UPLOAD, VIDEO_UPLOAD} = UploaderCard.TAB_TYPE;
        return (
            <div className={Style.UploaderCard}>
                <Card title={'广告上传'}>
                    <div className={Style.content}>
                        <div className={Style.buttonGroupWrapper}>
                            <div className="btn-group" role="group">
                                <button type="button"
                                        className={`btn ${currentTabType === IMAGE_UPLOAD ? 'btn-primary' : 'btn-secondary'}`}
                                        onClick={this.setTabType(IMAGE_UPLOAD)}>图片上传
                                </button>
                                <button type="button"
                                        className={`btn ${currentTabType === VIDEO_UPLOAD ? 'btn-primary' : 'btn-secondary'}`}
                                        onClick={this.setTabType(VIDEO_UPLOAD)}>视频上传
                                </button>
                            </div>
                        </div>
                        <div className={Style.uploaderWrapper}>
                            {
                                currentTabType === IMAGE_UPLOAD ? <ImageUploader /> : <VideoUploader />
                            }
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default UploaderCard;