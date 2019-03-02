import React, {Component} from 'react';
import Style from './Style.module.scss';
import {connect} from 'react-redux';
import RequestProcessor from '../../../../../../RequestProcessor';
import NAMESPACE from '../../../../../../Namespace';
import {
    Object as AdvertisementObject,
    View as Advertisement,
} from '../../../../../AdvertisementManagement/Components/AdvertisementListCard/Components/Advertisement';
import {resourcePackSelectAdvertisement, resourcePackUnselectAdvertisement} from '../../../../Function';

class AdvertisementList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            allAdvertisementList: [],// 所有广告列表
        };
    }

    componentDidMount()
    {
        RequestProcessor.sendGetAdvertisementListRequestAsync()
            .then(allAdvertisementListWrapper =>
            {
                if (allAdvertisementListWrapper)
                {
                    this.setState({
                        allAdvertisementList: allAdvertisementListWrapper[NAMESPACE.ADVERTISEMENT_MANAGEMENT.LIST.ADVERTISEMENT],// 所有广告列表
                    });
                }
            });
    }

    onAdvertisementWrapperClick = advertisementId =>
    {
        return () =>
        {
            const {resourcePackSelectedAdvertisementIdSet} = this.props;
            if (resourcePackSelectedAdvertisementIdSet.has(advertisementId))
            {
                resourcePackUnselectAdvertisement(advertisementId);
            }
            else
            {
                resourcePackSelectAdvertisement(advertisementId);
            }
        };
    };

    render()
    {
        const {allAdvertisementList} = this.state;
        const {resourcePackSelectedAdvertisementIdSet} = this.props;
        return (
            <div className={Style.AdvertisementList}>
                {
                    allAdvertisementList.map(advertisement =>
                    {
                        const {
                            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.ID]: id, // 广告的 ID
                            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.TYPE]: type, // 广告类型，枚举值
                            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME]: name, // 文件名
                            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.URL]: url, // 预览 URL
                        } = advertisement;
                        return (
                            <div className={`${Style.advertisementWrapper} ${resourcePackSelectedAdvertisementIdSet.has(id) ? Style.selected : null}`}
                                 onClick={this.onAdvertisementWrapperClick(id)}>
                                <Advertisement advertisement={new AdvertisementObject.Advertisement(type, url, name)} />
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state =>
{
    const {ResourcePackManagement: {resourcePackSelectedAdvertisementIdSet}} = state;
    return {
        resourcePackSelectedAdvertisementIdSet,
    };
};

export default connect(mapStateToProps)(AdvertisementList);