import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as ToolCard} from '../../../../Components/ToolCard';
import {View as ToolTip} from '../../../../Components/Bootstrap/Tooltip';
import {MODAL_ID, REGEX_TEXT} from '../../../../Config';
import {View as TagList} from './Components/TagList';
import {View as ModalTriggerButton} from '../../../../Components/Bootstrap/ModalTriggeringButton';
import {connect} from 'react-redux';
import ResourcePackManagementSelectAdvertisementModal
    from './Components/ResourePackManagementSelectAdvertisementModal/View';

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

    render()
    {
        const {resourcePackName} = this.state;
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
            <ResourcePackManagementSelectAdvertisementModal resourcePackName={resourcePackName} />,
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