import React, {Component} from 'react';
import RequestProcessor from '../../../../../../RequestProcessor';
import NAMESPACE from '../../../../../../Namespace';
import Style from './Style.module.scss';
import {connect} from 'react-redux';
import {selectAdvertisement, unselectAdvertisement} from '../../../../Function';
import Function from '../../../../../../Function';
import {View as AdvertisementContainer} from './Components/AdvertisementContainer';

class AdvertisementList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            advertisementList: [],
        };
    }

    componentDidMount()
    {
        RequestProcessor.sendGetAdvertisementListRequestAsync()
            .then(advertisementListWrapper =>
            {
                if (advertisementListWrapper)
                {
                    this.setState({advertisementList: advertisementListWrapper[NAMESPACE.ADVERTISEMENT_MANAGEMENT.LIST.ADVERTISEMENT]});
                }
            });
    }

    onAdvertisementWrapperClick = id =>
    {
        return () =>
        {
            const {selectedAdvertisementIdSet} = this.props;
            if (selectedAdvertisementIdSet.has(id))
            {
                unselectAdvertisement(id);
            }
            else
            {
                selectAdvertisement(id);
            }
        };
    };

    render()
    {
        const {advertisementList} = this.state;
        return (
            <div className={Style.AdvertisementList}>
                {
                    advertisementList.map(advertisement =>
                    {
                        const {
                            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.ID]: advertisementId,
                            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.TYPE]: advertisementType,
                            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.URL]: advertisementPreviewUrl,
                            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME]: advertisementName,
                        } = advertisement;
                        return (
                            <div className={Style.advertisementWrapper}
                                 key={advertisementId}
                                 onClick={this.onAdvertisementWrapperClick(advertisementId)}>
                                <AdvertisementContainer advertisementId={advertisementId}
                                                        advertisementType={advertisementType}
                                                        advertisementPreviewUrl={advertisementPreviewUrl}
                                                        advertisementName={advertisementName} />
                            </div>);
                    })
                }
                {
                    Function.padFlexLastRow(<div className={`${Style.advertisementWrapper} ${Style.empty}`} />, 3)
                }
            </div>
        );
    }

}

const mapStateToProps = state =>
{
    const {ResourcePackManagement: {selectedAdvertisementIdSet}} = state;
    return {
        selectedAdvertisementIdSet,
    };
};

export default connect(mapStateToProps)(AdvertisementList);