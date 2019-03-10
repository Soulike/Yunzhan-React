import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as ToolCard} from '../../../../Components/ToolCard';
import {View as ToolTip} from '../../../../Components/Bootstrap/Tooltip';
import {MODAL_ID, REGEX, REGEX_TEXT} from '../../../../Config';
import {View as TagList} from './Components/TagList';
import {View as ModalTriggerButton} from '../../../../Components/Bootstrap/ModalTriggeringButton';
import {LargeModal} from '../../../../Components/Bootstrap/Modal';
import {View as AdvertisementList} from './Components/AdvertisementList';
import {connect} from 'react-redux';
import {WarningAlert} from '../../../../Components/Bootstrap/Alerts';
import RequestProcessor from '../../../../RequestProcessor';
import {getResourcePackList, unselectAllAdvertisements, unselectAllTags} from '../../Function';

class AddResourcePackCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            resourcePackName: '',
        };

        this.resourcePackNameInputRef = React.createRef();
    }

    onResourcePackNameInputChange = e =>
    {
        this.setState({
            resourcePackName: e.target.value,
        });
    };

    onSelectAdvertisementModalConfirmButtonClick = async () =>
    {
        const {resourcePackName} = this.state;
        const {selectedTagIdSet, selectedAdvertisementIdSet} = this.props;
        if (!REGEX.RESOURCE_PACK_NAME.test(resourcePackName))
        {
            WarningAlert.pop('请输入有效的资源包名');
        }
        else
        {
            const RequestIsSuccessful = await RequestProcessor.sendPostSubmitNewResourcePackRequestAsync(
                resourcePackName, Array.from(selectedAdvertisementIdSet), Array.from(selectedTagIdSet));
            if (RequestIsSuccessful)
            {
                this.setState({
                    resourcePackName: '',
                }, () =>
                {
                    this.resourcePackNameInputRef.current.value = '';
                });
                unselectAllTags();
                unselectAllAdvertisements();
                getResourcePackList();
            }
        }
    };


    render()
    {
        return [
            <ToolCard className={Style.AddResourcePackCard} title={'添加资源包'}>
                <label className={Style.inputWrapper}>
                    <span className={Style.label}>资源包名</span>
                    <ToolTip placement={'top'} title={REGEX_TEXT.RESOURCE_PACK_NAME}>
                        <input type="text"
                               placeholder={'请在此输入新资源包名'}
                               ref={this.resourcePackNameInputRef}
                               onChange={this.onResourcePackNameInputChange} />
                    </ToolTip>
                </label>
                <span className={Style.tagListTitle}>选择标签</span>
                <ToolTip placement={'top'} title={'点击选择标签'}>
                    <div className={Style.tagListWrapper}>
                        <TagList />
                    </div>
                </ToolTip>
                <div className={Style.submitButtonWrapper}>
                    <ModalTriggerButton className={Style.submitButton}
                                        modalId={MODAL_ID.RESOURCE_PACK_MANAGEMENT_SELECT_ADVERTISEMENT_MODAL}>创建资源包</ModalTriggerButton>
                </div>
            </ToolCard>,
            <LargeModal id={MODAL_ID.RESOURCE_PACK_MANAGEMENT_SELECT_ADVERTISEMENT_MODAL}
                        title={'选择广告'}
                        subTitle={'点击选择资源包中要包含的广告'}
                        onConfirmButtonClick={this.onSelectAdvertisementModalConfirmButtonClick}>
                <div className={Style.advertisementListWrapper}>
                    <AdvertisementList />
                </div>
            </LargeModal>,
        ];
    }
}

const mapStateToProps = state =>
{
    const {ResourcePackManagement: {selectedTagIdSet, selectedAdvertisementIdSet}} = state;
    return {
        selectedTagIdSet,
        selectedAdvertisementIdSet,
    };
};

export default connect(mapStateToProps)(AddResourcePackCard);