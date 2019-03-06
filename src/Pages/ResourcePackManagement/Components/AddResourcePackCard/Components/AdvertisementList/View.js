import React, {Component} from 'react';
import RequestProcessor from '../../../../../../RequestProcessor';
import NAMESPACE from '../../../../../../Namespace';
import Style from './Style.module.scss';
import {Object as AdvertisementObject, View as Advertisement} from './Components/Advertisement';
import {connect} from 'react-redux';
import {selectAdvertisement, unselectAdvertisement} from '../../../../Function';

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
                        const {[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.ID]: id} = advertisement;
                        return (
                            <div className={Style.advertisementWrapper}
                                 key={id}
                                 onClick={this.onAdvertisementWrapperClick(id)}>
                                <Advertisement advertisement={new AdvertisementObject.Advertisement(
                                    advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.ID],
                                    advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.TYPE],
                                    advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.URL],
                                    advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME],
                                )} />
                            </div>);
                    })
                }
                {
                    (() =>
                    {
                        // Flex 最后一行左对齐填充
                        const nodeArray = [];
                        for (let i = 0; i < 3; i++)
                        {
                            nodeArray.push(
                                <div className={`${Style.advertisementWrapper} ${Style.empty}`} key={i} />,
                            );
                        }
                        return nodeArray;
                    })()
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