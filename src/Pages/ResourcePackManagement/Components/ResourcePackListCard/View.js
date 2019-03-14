import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as ListCard} from '../../../../Components/ListCard';
import RequestProcessor from '../../../../RequestProcessor';
import NAMESPACE from '../../../../Namespace';
import ResourcePack from './Components/ResourcePack/View';
import {MODAL_ID} from '../../../../Config';
import {Function as ModalFunction} from '../../../../Components/Bootstrap/Modal';
import {resourcePackSelectAdvertisements, resourcePackSelectTags} from '../../Function';
import {connect} from 'react-redux';
import {View as ResourcePackTagNameListModal} from './Components/ResourcePackTagNameListModal';
import {View as ResourcePackAdvertisementListModal} from './Components/ResourcePackAdvertisementListModal';
import {View as ResourcePackChangeModal} from './Components/ResourcePackChangeModal';
import ResourcePackScreenListModal from './Components/ResourcePackScreenListModal/View';

class ResourcePackListCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            resourcePackTagList: [],// 特定资源包标签列表
            resourcePackAdvertisementList: [],// 特定资源包广告列表
            resourcePackScreenList: [],// 特定资源包屏幕列表

            currentOperatingResourcePackId: 0,// 当前查看/操作资源包ID
            currentOperatingResourcePackName: '',// 当前查看/操作资源包名
            currentOperatingResourcePackDescription: '',// 当前查看/操作资源包备注

            allAdvertisementList: [],// 所有广告列表
        };
    }

    showTagListModal = (resourcePackId, resourcePackName) =>
    {
        return async () =>
        {
            const resourcePackTagListWrapper = await RequestProcessor.sendGetResourcePackTagListRequestAsync(resourcePackId);
            if (resourcePackTagListWrapper)
            {
                this.setState({
                    resourcePackTagList: resourcePackTagListWrapper[NAMESPACE.TAG_MANAGEMENT.LIST.TAG],
                    currentOperatingResourcePackName: resourcePackName,
                }, () =>
                {
                    ModalFunction.showModal(MODAL_ID.RESOURCE_PACK_TAG_NAME_LIST_MODAL);
                });
            }
        };
    };

    showAdvertisementListModal = (resourcePackId, resourcePackName) =>
    {
        return async () =>
        {
            const resourcePackAdvertisementListWrapper = await RequestProcessor.sendGetResourcePackAdvertisementListRequestAsync(resourcePackId);
            if (resourcePackAdvertisementListWrapper)
            {
                this.setState({
                    resourcePackAdvertisementList: resourcePackAdvertisementListWrapper[NAMESPACE.ADVERTISEMENT_MANAGEMENT.LIST.ADVERTISEMENT],
                    currentOperatingResourcePackName: resourcePackName,
                }, () =>
                {
                    ModalFunction.showModal(MODAL_ID.RESOURCE_PACK_ADVERTISEMENT_LIST_MODAL);
                });
            }
        };
    };

    showScreenNameListModal = (resourcePackId, resourcePackName) =>
    {
        return async () =>
        {
            const screenListWrapper = await RequestProcessor.sendGetResourcePackScreenListRequestAsync(resourcePackId);
            if (screenListWrapper)
            {
                this.setState({
                    resourcePackScreenList: screenListWrapper[NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN],
                    currentOperatingResourcePackName: resourcePackName,
                }, () =>
                {
                    ModalFunction.showModal(MODAL_ID.RESOURCE_PACK_SCREEN_LIST_MODAL);
                });
            }
        };
    };

    onChangeResourcePackButtonClick = (resourcePackId, resourcePackName, resourcePackDescription) =>
    {
        return async () =>
        {
            const [resourcePackTagListWrapper, resourcePackAdvertisementListWrapper] = await Promise.all([
                RequestProcessor.sendGetResourcePackTagListRequestAsync(resourcePackId),
                RequestProcessor.sendGetResourcePackAdvertisementListRequestAsync(resourcePackId),
            ]);
            if (resourcePackTagListWrapper && resourcePackAdvertisementListWrapper)
            {
                // 把已选的资源包和广告ID添加到Store里
                const resourcePackTagList = resourcePackTagListWrapper[NAMESPACE.TAG_MANAGEMENT.LIST.TAG];
                const resourcePackTagIdList = [];
                resourcePackTagList.forEach(tag =>
                {
                    resourcePackTagIdList.push(tag[NAMESPACE.TAG_MANAGEMENT.TAG.ID]);
                });
                resourcePackSelectTags(resourcePackTagIdList);

                const resourcePackAdvertisementList = resourcePackAdvertisementListWrapper[NAMESPACE.ADVERTISEMENT_MANAGEMENT.LIST.ADVERTISEMENT];
                const resourcePackAdvertisementIdList = [];
                resourcePackAdvertisementList.forEach(advertisement =>
                {
                    resourcePackAdvertisementIdList.push(advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.ID]);
                });
                resourcePackSelectAdvertisements(resourcePackAdvertisementIdList);

                this.setState({
                    currentOperatingResourcePackId: resourcePackId,// 当前查看/操作资源包ID
                    currentOperatingResourcePackName: resourcePackName,// 当前查看/操作资源包名
                    currentOperatingResourcePackDescription: resourcePackDescription,
                }, () =>
                {
                    ModalFunction.showModal(MODAL_ID.RESOURCE_PACK_CHANGE_MODAL);
                });

            }
        };
    };

    render()
    {
        const {
            currentOperatingResourcePackId,
            currentOperatingResourcePackName,
            currentOperatingResourcePackDescription,
            resourcePackTagList,
            resourcePackAdvertisementList,
            resourcePackScreenList,
        } = this.state;
        const {resourcePackList} = this.props;
        return [
            <ListCard className={Style.ResourcePackListCard} title={'资源包列表'} key={Style.ResourcePackListCard}>
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
                                                 description={description}
                                                 showTagListModalFunction={this.showTagListModal(id, name)}
                                                 showAdvertisementListModalFunction={this.showAdvertisementListModal(id, name)}
                                                 showScreenNameListModalFunction={this.showScreenNameListModal(id, name)}
                                                 onChangeResourcePackButtonClickFunction={this.onChangeResourcePackButtonClick(id, name, description)}
                                                 key={id} />;
                        })
                    }
                    </tbody>
                </table>
            </ListCard>,
            <ResourcePackTagNameListModal resourcePackName={currentOperatingResourcePackName}
                                          resourcePackTagList={resourcePackTagList}
                                          key={MODAL_ID.RESOURCE_PACK_TAG_NAME_LIST_MODAL} />,
            <ResourcePackAdvertisementListModal resourcePackName={currentOperatingResourcePackName}
                                                resourcePackAdvertisementList={resourcePackAdvertisementList}
                                                key={MODAL_ID.RESOURCE_PACK_ADVERTISEMENT_LIST_MODAL} />,
            <ResourcePackScreenListModal resourcePackName={currentOperatingResourcePackName}
                                         resourcePackScreenList={resourcePackScreenList}
                                         key={MODAL_ID.RESOURCE_PACK_SCREEN_LIST_MODAL} />,
            <ResourcePackChangeModal resourcePackName={currentOperatingResourcePackName}
                                     resourcePackId={currentOperatingResourcePackId}
                                     resourcePackDescription={currentOperatingResourcePackDescription}
                                     key={MODAL_ID.RESOURCE_PACK_CHANGE_MODAL} />,
        ];
    }
}

const mapStateToProps = state =>
{
    const {ResourcePackManagement: {resourcePackList}} = state;
    return {
        resourcePackList,
    };
};

export default connect(mapStateToProps)(ResourcePackListCard);