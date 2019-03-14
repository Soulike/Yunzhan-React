import React, {Component} from 'react';
import Style from './Style.module.scss';
import {connect} from 'react-redux';
import {View as Advertisement} from '../../../../../../../../Components/Advertisement';
import PropTypes from 'prop-types';

class AdvertisementContainer extends Component
{
    render()
    {
        const {advertisementId, advertisementType, advertisementPreviewUrl, advertisementName, selectedAdvertisementIdSet} = this.props;
        return <Advertisement
            className={`${Style.Advertisement} ${selectedAdvertisementIdSet.has(advertisementId) ? Style.selected : null}`}
            advertisementType={advertisementType}
            advertisementPreviewUrl={advertisementPreviewUrl}
            advertisementName={advertisementName} />;
    }
}

AdvertisementContainer.propTypes = {
    ...Advertisement.propTypes,
    advertisementId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

const mapStateToProps = state =>
{
    const {ResourcePackManagement: {selectedAdvertisementIdSet}} = state;
    return {
        selectedAdvertisementIdSet,
    };
};

export default connect(mapStateToProps)(AdvertisementContainer);