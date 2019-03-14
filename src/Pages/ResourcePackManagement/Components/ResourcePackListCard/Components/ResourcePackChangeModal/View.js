import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {MODAL_ID, REGEX_TEXT} from '../../../../../../Config';
import {View as TagList} from './Components/TagList';
import {View as AdvertisementList} from './Components/AdvertisementList';
import {View as ToolTip} from '../../../../../../Components/Bootstrap/Tooltip';
import {ExtraLargeModal, Function as ModalFunction} from '../../../../../../Components/Bootstrap/Modal';
import RequestProcessor from '../../../../../../RequestProcessor';
import {
    getResourcePackList,
    resourcePackUnselectAllAdvertisements,
    resourcePackUnselectAllTags,
} from '../../../../Function';
import {connect} from 'react-redux';

class ResourcePackChangeModal extends Component
{
    constructor(props)
    {
        super(props);
        this.resourcePackNameInputRef = React.createRef();
        this.resourcePackDescriptionRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {resourcePackId: prevResourcePackId} = prevProps;
        const {resourcePackId, resourcePackName, resourcePackDescription} = this.props;
        if (prevResourcePackId !== resourcePackId)
        {
            this.resourcePackNameInputRef.current.value = resourcePackName;
            this.resourcePackDescriptionRef.current.value = resourcePackDescription;
        }
    }

    onResourcePackChangeModalConfirmButtonClick = async () =>
    {
        const {resourcePackSelectedTagIdSet, resourcePackSelectedAdvertisementIdSet, resourcePackId} = this.props;

        const resourcePackNameInInput = this.resourcePackNameInputRef.current.value;
        const resourcePackDescriptionInInput = this.resourcePackDescriptionRef.current.value;

        const requestIsSuccessful = await RequestProcessor.sendPostChangeResourcePackInfoRequestAsync(
            resourcePackId,
            resourcePackNameInInput,
            resourcePackDescriptionInInput,
            Array.from(resourcePackSelectedTagIdSet),
            Array.from(resourcePackSelectedAdvertisementIdSet),
        );
        if (requestIsSuccessful)
        {
            ModalFunction.hideModal(MODAL_ID.RESOURCE_PACK_CHANGE_MODAL);
            resourcePackUnselectAllTags();
            resourcePackUnselectAllAdvertisements();
            getResourcePackList();
        }
    };

    render()
    {
        const {resourcePackName} = this.props;
        return (
            <ExtraLargeModal id={MODAL_ID.RESOURCE_PACK_CHANGE_MODAL}
                             title={`编辑资源包 ${resourcePackName}`}
                             className={Style.ResourcePackChangeModal}
                             onConfirmButtonClick={this.onResourcePackChangeModalConfirmButtonClick}>
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
                    {<div className={Style.bottomWrapper}>
                        <label className={Style.inputWrapper}>
                            <span className={Style.label}>资源包名</span>
                            <ToolTip placement={'top'} title={REGEX_TEXT.RESOURCE_PACK_NAME}>
                                <input type="text"
                                       placeholder={'请在此输入资源包名'}
                                       ref={this.resourcePackNameInputRef} />
                            </ToolTip>
                        </label>
                        <label className={Style.inputWrapper}>
                            <span className={Style.label}>备注</span>
                            <textarea placeholder={'请在此输入备注'}
                                      ref={this.resourcePackDescriptionRef} />
                        </label>
                    </div>}
                </div>
            </ExtraLargeModal>
        );
    }
}

ResourcePackChangeModal.propTypes = {
    resourcePackId: PropTypes.oneOfType([PropTypes.number, PropTypes.number]).isRequired,
    resourcePackName: PropTypes.string.isRequired,
    resourcePackDescription: PropTypes.string.isRequired,
};

const mapStateToProps = state =>
{
    const {ResourcePackManagement: {resourcePackSelectedTagIdSet, resourcePackSelectedAdvertisementIdSet}} = state;
    return {
        resourcePackSelectedTagIdSet,
        resourcePackSelectedAdvertisementIdSet,
    };
};

export default connect(mapStateToProps)(ResourcePackChangeModal);