import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as SolidIcon from '@fortawesome/free-solid-svg-icons';
import ADVERTISEMENT_TYPE from './ADVERTISEMENT_TYPE';
import Style from './Style.module.scss';
import {View as ToolTip} from '../Bootstrap/Tooltip';

class Advertisement extends Component
{
    render()
    {
        const {advertisementType, advertisementPreviewUrl, advertisementName, className} = this.props;
        return (
            <div className={`${className || null} ${Style.Advertisement}`}>
                <div className={Style.advertisementContentWrapper}>
                    <div className={Style.previewWrapper}>
                        {
                            (() =>
                            {
                                if (advertisementType === ADVERTISEMENT_TYPE.IMAGE)
                                {
                                    return <div className={Style.preview}
                                                style={{background: `url(${encodeURI(advertisementPreviewUrl)})`}} />;
                                }
                                else if (advertisementType === ADVERTISEMENT_TYPE.VIDEO)
                                {
                                    return <video className={Style.preview}
                                                  src={encodeURI(advertisementPreviewUrl)}
                                                  controls />;
                                }
                            })()
                        }
                    </div>
                    <div className={Style.advertisementInfoWrapper}>
                        <div className={Style.typeIconWrapper}>
                            {
                                (() =>
                                {
                                    if (advertisementType === ADVERTISEMENT_TYPE.IMAGE)
                                    {
                                        return (
                                            <ToolTip placement={'top'} title={'图片'}>
                                                <FontAwesomeIcon icon={SolidIcon.faImage}
                                                                 className={Style.typeIcon} />
                                            </ToolTip>);
                                    }
                                    else if (advertisementType === ADVERTISEMENT_TYPE.VIDEO)
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
                        <ToolTip placement={'top'} title={advertisementName}>
                            <div className={Style.advertisementName}>
                                {advertisementName}
                            </div>
                        </ToolTip>
                    </div>
                </div>
            </div>
        );
    }
}

Advertisement.propTypes = {
    advertisementType: PropTypes.oneOf(Object.keys(ADVERTISEMENT_TYPE)).isRequired,
    advertisementPreviewUrl: PropTypes.string.isRequired,
    advertisementName: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default Advertisement;