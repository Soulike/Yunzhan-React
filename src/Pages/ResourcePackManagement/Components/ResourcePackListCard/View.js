import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as ListCard} from '../../../../Components/ListCard';
import RequestProcessor from '../../../../RequestProcessor';
import NAMESPACE from '../../../../Namespace';
import ResourcePack from './Components/ResourcePack/View';
import {MODAL_ID} from '../../../../Static/Constants';
import {View as Tag} from './Components/Tag';
import {ExtraLargeModal, Function as ModalFunction, LargeModal, Modal} from '../../../../Components/Modal';
import {
    Object as AdvertisementObject,
    View as Advertisement,
} from '../../../AdvertisementManagement/Components/AdvertisementListCard/Components/Advertisement';
import ToolTip from '../../../../Components/Tooltip/View';
import {TEXT} from '../../../../Static/Regex';
import {
    resourcePackSelectAdvertisements,
    resourcePackSelectTags,
    resourcePackUnselectAllAdvertisements,
    resourcePackUnselectAllTags,
} from '../../Function';
import {View as TagList} from './Components/TagList';
import {View as AdvertisementList} from './Components/AdvertisementList';
import {connect} from 'react-redux';
import {Function as SpinnerFunction} from '../../../../Components/GrowingSpinner';

class ResourcePackListCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            resourcePackList: [],// 所有资源包列表

            resourcePackTagList: [],// 特定资源包标签列表
            resourcePackAdvertisementList: [],// 特定资源包广告列表
            resourcePackScreenList: [],// 特定资源包屏幕列表

            currentOperatingResourcePackId: 0,// 当前查看/操作资源包ID
            currentOperatingResourcePackName: '',// 当前查看/操作资源包名
            currentOperatingResourcePackDescription: '',// 当前查看/操作资源包备注

            allAdvertisementList: [],// 所有广告列表
        };

        this.resourcePackNameInputRef = React.createRef();
        this.resourcePackDescriptionRef = React.createRef();
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

    showTagListModal = async (resourcePackId, resourcePackName) =>
    {
        SpinnerFunction.showSpinner();
        const resourcePackTagListWrapper = await RequestProcessor.sendGetResourcePackTagListRequestAsync(resourcePackId);
        if (resourcePackTagListWrapper)
        {
            this.setState({
                resourcePackTagList: resourcePackTagListWrapper[NAMESPACE.TAG_MANAGEMENT.LIST.TAG],
                currentOperatingResourcePackName: resourcePackName,
            }, () =>
            {
                ModalFunction.showModal(MODAL_ID.RESOURCE_PACK_TAG_NAME_LIST_MODAL);
                SpinnerFunction.hideSpinner();
            });
        }
    };

    showAdvertisementListModal = async (resourcePackId, resourcePackName) =>
    {
        SpinnerFunction.showSpinner();
        const resourcePackAdvertisementListWrapper = await RequestProcessor.sendGetResourcePackAdvertisementListRequestAsync(resourcePackId);
        if (resourcePackAdvertisementListWrapper)
        {
            this.setState({
                resourcePackAdvertisementList: resourcePackAdvertisementListWrapper[NAMESPACE.ADVERTISEMENT_MANAGEMENT.LIST.ADVERTISEMENT],
                currentOperatingResourcePackName: resourcePackName,
            }, () =>
            {
                ModalFunction.showModal(MODAL_ID.RESOURCE_PACK_ADVERTISEMENT_LIST_MODAL);
                SpinnerFunction.hideSpinner();
            });
        }
    };

    showScreenNameListModal = async (resourcePackId, resourcePackName) =>
    {
        SpinnerFunction.showSpinner();
        const screenListWrapper = await RequestProcessor.sendGetResourcePackScreenListRequestAsync(resourcePackId);
        if (screenListWrapper)
        {
            this.setState({
                resourcePackScreenList: screenListWrapper[NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN],
                currentOperatingResourcePackName: resourcePackName,
            }, () =>
            {
                ModalFunction.showModal(MODAL_ID.RESOURCE_PACK_SCREEN_LIST_MODAL);
                SpinnerFunction.hideSpinner();
            });
        }
    };

    onChangeResourcePackButtonClick = async (resourcePackId, resourcePackName, resourcePackDescription) =>
    {
        SpinnerFunction.showSpinner();
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
                this.resourcePackNameInputRef.current.value = resourcePackName;
                this.resourcePackDescriptionRef.current.value = resourcePackDescription;
                ModalFunction.showModal(MODAL_ID.RESOURCE_PACK_CHANGE_MODAL);
                SpinnerFunction.hideSpinner();
            });

        }
    };

    onResourcePackNameInputChange = e =>
    {
        this.setState({
            currentOperatingResourcePackName: e.target.value,
        });
    };

    onResourcePackDescriptionChange = e =>
    {
        this.setState({
            currentOperatingResourcePackDescription: e.target.value,
        });
    };

    onResourcePackChangeModalConfirmButtonClick = async () =>
    {
        const {resourcePackSelectedTagIdSet, resourcePackSelectedAdvertisementIdSet} = this.props;
        const {
            currentOperatingResourcePackId,// 当前查看/操作资源包ID
            currentOperatingResourcePackName,// 当前查看/操作资源包名
            currentOperatingResourcePackDescription,// 当前查看/操作资源包备注
        } = this.state;

        const requestIsSuccessful = await RequestProcessor.sendPostChangeResourcePackInfoRequestAsync(
            currentOperatingResourcePackId,
            currentOperatingResourcePackName,
            currentOperatingResourcePackDescription,
            Array.from(resourcePackSelectedTagIdSet),
            Array.from(resourcePackSelectedAdvertisementIdSet),
        );
        if (requestIsSuccessful)
        {
            resourcePackUnselectAllTags();
            resourcePackUnselectAllAdvertisements();
        }
    };

    render()
    {
        const {
            resourcePackList,
            currentOperatingResourcePackName,
            resourcePackTagList,
            resourcePackAdvertisementList,
            resourcePackScreenList,
        } = this.state;
        return [
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
                                                 description={description}
                                                 showTagListModalFunction={this.showTagListModal}
                                                 showAdvertisementListModalFunction={this.showAdvertisementListModal}
                                                 showScreenNameListModalFunction={this.showScreenNameListModal}
                                                 onChangeResourcePackButtonClickFunction={this.onChangeResourcePackButtonClick}
                                                 key={id} />;
                        })
                    }
                    </tbody>
                </table>
            </ListCard>,
            <Modal id={MODAL_ID.RESOURCE_PACK_TAG_NAME_LIST_MODAL}
                   title={`资源包 ${currentOperatingResourcePackName} 绑定标签列表`}
                   className={Style.resourcePackTagListModal}>
                <div className={Style.tagList}>
                    {
                        resourcePackTagList.length === 0 ?
                            <div style={{
                                width: '100%',
                                textAlign: 'center',
                            }}>该资源包没有绑定标签</div> :
                            resourcePackTagList.map(tag =>
                            {
                                const {[NAMESPACE.TAG_MANAGEMENT.TAG.NAME]: tagName, [NAMESPACE.TAG_MANAGEMENT.TAG.ID]: tagId} = tag;
                                return (
                                    <div className={Style.tagWrapper} key={tagId}>
                                        <Tag name={tagName} />
                                    </div>);
                            })
                    }
                    {
                        (() =>
                        {
                            const nodeArray = [];
                            for (let i = 0; i < 5; i++)
                            {
                                nodeArray.push(
                                    <div className={`${Style.tagWrapper} ${Style.empty}`} key={0 - i} />,
                                );
                            }
                            return nodeArray;
                        })()
                    }
                </div>
            </Modal>,
            <LargeModal id={MODAL_ID.RESOURCE_PACK_ADVERTISEMENT_LIST_MODAL}
                        title={`资源包 ${currentOperatingResourcePackName} 绑定广告列表`}
                        className={Style.resourcePackAdvertisementListModal}>
                <div className={Style.advertisementList}>
                    {
                        resourcePackAdvertisementList.map(advertisement =>
                        {
                            const advertisementObj = new AdvertisementObject.Advertisement(
                                advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.TYPE],
                                advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.URL],
                                advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME],
                            );
                            return (
                                <div className={Style.advertisementWrapper}
                                     key={advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.ID]}>
                                    <Advertisement advertisement={advertisementObj} />
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
            </LargeModal>,
            <Modal id={MODAL_ID.RESOURCE_PACK_SCREEN_LIST_MODAL}
                   title={`资源包 ${currentOperatingResourcePackName} 绑定屏幕列表`}
                   className={Style.resourcePackScreenList}>
                <div className={Style.screenList}>
                    <table className="table table-striped">
                        <thead className={'thead-dark'}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">屏幕名</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            resourcePackScreenList.map((screen, i) =>
                            {
                                const {[NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: screenId, [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.NAME]: screenName} = screen;
                                return <tr key={screenId}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{screenName}</td>
                                </tr>;
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </Modal>,
            <ExtraLargeModal id={MODAL_ID.RESOURCE_PACK_CHANGE_MODAL}
                             title={`编辑资源包 ${currentOperatingResourcePackName}`}
                             className={Style.resourcePackChangeModal}
                             onConfirmButtonClickFunction={this.onResourcePackChangeModalConfirmButtonClick}>
                <div className={Style.resourcePackChangeModalContentWrapper}>
                    <div className={Style.topWrapper}>
                        <div className={Style.leftPart}>
                            <span className={Style.label}>标签<small className={Style.subLabel}>红色为选中，蓝色为未选中</small></span>
                            <div className={Style.tagListWrapper}>
                                <TagList />
                            </div>
                        </div>
                        <div className={Style.rightPart}>
                            <span className={Style.label}>广告<small className={Style.subLabel}>深色背景为选中，浅色背景为未选中</small></span>
                            <div className={Style.advertisementListWrapper}>
                                <AdvertisementList />
                            </div>
                        </div>
                    </div>
                    <div className={Style.bottomWrapper}>
                        <label className={Style.inputWrapper}>
                            <span className={Style.label}>资源包名</span>
                            <ToolTip placement={'top'} title={TEXT.RESOURCE_PACK_NAME}>
                                <input type="text"
                                       placeholder={'请在此输入资源包名'}
                                       ref={this.resourcePackNameInputRef}
                                       onChange={this.onResourcePackNameInputChange} />
                            </ToolTip>
                        </label>
                        <label className={Style.inputWrapper}>
                            <span className={Style.label}>备注</span>
                            <textarea placeholder={'请在此输入备注'}
                                      ref={this.resourcePackDescriptionRef}
                                      onChange={this.onResourcePackDescriptionChange} />
                        </label>
                    </div>
                </div>
            </ExtraLargeModal>,
        ];
    }
}

const mapStateToProps = state =>
{
    const {ResourcePackManagement: {resourcePackSelectedTagIdSet, resourcePackSelectedAdvertisementIdSet}} = state;
    return {
        resourcePackSelectedTagIdSet,
        resourcePackSelectedAdvertisementIdSet,
    };
};

export default connect(mapStateToProps)(ResourcePackListCard);