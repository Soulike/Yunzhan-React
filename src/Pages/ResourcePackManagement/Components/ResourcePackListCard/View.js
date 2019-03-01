import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as ListCard} from '../../../../Components/ListCard';
import RequestProcessor from '../../../../RequestProcessor';
import NAMESPACE from '../../../../Namespace';
import ResourcePack from './Components/ResourcePack/View';

class ResourcePackListCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            resourcePackList: [],
        };
    }

    componentDidMount()
    {
        RequestProcessor.sendGetResourcePackListRequestAsync()
            .then(resourcePackListWrapper =>
            {
                if (resourcePackListWrapper)
                {
                    this.setState({resourcePackList: resourcePackListWrapper[NAMESPACE.RESOURCE_PACK_MANAGEMENT.LIST.RESOURCE_PACK]});
                }
            });
    }


    render()
    {
        const {resourcePackList} = this.state;
        return (
            <ListCard className={Style.ResourcePackListCard} title={'资源包列表'}>
                <table className="table table-hover">
                    <thead className={'thead-dark'}>
                    <tr>
                        <th scope="col" className={Style.resourcePackNameHeader}>包名</th>
                        <th scope="col" className={Style.tagNameHeader}>标签</th>
                        <th scope="col" className={Style.advertisementAmountHeader}>广告数</th>
                        <th scope="col" className={Style.screenAmountHeader}>屏幕数</th>
                        <th scope="col" className={Style.descriptionHeader}>备注</th>
                        <th scope="col" className={Style.buttonHeader} />
                    </tr>
                    </thead>
                    <tbody>
                    {
                        resourcePackList.map(resourcePack =>
                        {
                            const {
                                [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: id,// 资源包 ID
                                [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.NAME]: name,// 资源包名
                                [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.TAG_NAME]: tagName,
                                [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ADVERTISEMENT_AMOUNT]: bindingAdvertisementAmount,// 内含广告数量
                                [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.SCREEN_AMOUNT]: bindingScreenAmount,// 绑定屏幕数量
                                [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.DESCRIPTION]: description,// 资源包备注
                            } = resourcePack;
                            return <ResourcePack id={id}
                                                 name={name}
                                                 tagName={tagName}
                                                 bindingAdvertisementAmount={bindingAdvertisementAmount}
                                                 bindingScreenAmount={bindingScreenAmount}
                                                 description={description} />;
                        })
                    }
                    </tbody>
                </table>
            </ListCard>
        );
    }
}

export default ResourcePackListCard;