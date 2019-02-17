import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as SolidIcon from '@fortawesome/free-solid-svg-icons';
import ADVERTISEMENT_TYPE from './AdvertisementType';
import Style from './Style.module.scss';
import {View as ToolTip} from '../../../../../../Components/Tooltip';

class Advertisement extends Component
{
    render()
    {
        const {advertisement: {type, src, name}} = this.props;
        return (
            <div className={Style.Advertisement}>
                <ToolTip placement={'top'} title={'点击查看详细信息'}>
                    <div className={Style.advertisementContentWrapper}>
                        <div className={Style.previewWrapper}>
                            {
                                (() =>
                                {
                                    if (type === ADVERTISEMENT_TYPE.IMAGE)
                                    {
                                        return <div className={Style.preview} style={{background: `url(${src})`}} />;
                                    }
                                    else if (type === ADVERTISEMENT_TYPE.VIDEO)
                                    {
                                        return <video className={Style.preview} src={src} controls />;
                                    }
                                })()
                            }
                        </div>
                        <div className={Style.advertisementInfoWrapper}>
                            <div className={Style.typeIconWrapper}>
                                {
                                    (() =>
                                    {
                                        if (type === ADVERTISEMENT_TYPE.IMAGE)
                                        {
                                            return (
                                                <ToolTip placement={'top'} title={'图片'}>
                                                    <FontAwesomeIcon icon={SolidIcon.faImage}
                                                                     className={Style.typeIcon} />
                                                </ToolTip>);
                                        }
                                        else if (type === ADVERTISEMENT_TYPE.VIDEO)
                                        {
                                            return (
                                                <ToolTip placement={'top'} title={'视频'}>
                                                    <FontAwesomeIcon icon={SolidIcon.faVideo}
                                                                     className={Style.typeIcon} />
                                                </ToolTip>);
                                        }
                                    })()
                                }
                            </div>
                            <div className={Style.advertisementName}>
                                <ToolTip placement={'top'} title={name}>
                                    {name}
                                </ToolTip>
                            </div>
                        </div>
                    </div>
                </ToolTip>
            </div>
        );
    }
}

Advertisement.propTypes = {
    advertisement: PropTypes.object.isRequired,
};

export default Advertisement;