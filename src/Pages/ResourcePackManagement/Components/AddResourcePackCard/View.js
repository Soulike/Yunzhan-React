import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as ToolCard} from '../../../../Components/ToolCard';
import {View as ToolTip} from '../../../../Components/Bootstrap/Tooltip';
import {MODAL_ID, REGEX, REGEX_TEXT} from '../../../../Config';
import {View as TagList} from './Components/TagList';
import {connect} from 'react-redux';
import {Function as ModalFunction} from '../../../../Components/Bootstrap/Modal';
import ResourcePackManagementSelectAdvertisementModal
    from './Components/ResourePackManagementSelectAdvertisementModal/View';
import {WarningAlert} from '../../../../Components/Bootstrap/Alerts';

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

    onCreateResourcePackButtonClick = () =>
    {
        const resourcePackName = this.resourcePackNameInputRef.current.value;
        if (!REGEX.RESOURCE_PACK_NAME.test(resourcePackName))
        {
            WarningAlert.pop('请输入有效的资源包名');
        }
        else
        {
            this.setState({
                resourcePackName,
            }, () =>
            {
                ModalFunction.showModal(MODAL_ID.RESOURCE_PACK_MANAGEMENT_SELECT_ADVERTISEMENT_MODAL);
            });
        }
    };

    render()
    {
        const {resourcePackName} = this.state;
        return [
            <ToolCard className={Style.AddResourcePackCard} title={'添加资源包'} key={Style.AddResourcePackCard}>
                <label className={Style.inputWrapper}>
                    <span className={Style.label}>资源包名</span>
                    <ToolTip placement={'top'} title={REGEX_TEXT.RESOURCE_PACK_NAME}>
                        <input type="text"
                               placeholder={'请在此输入新资源包名'}
                               ref={this.resourcePackNameInputRef} />
                    </ToolTip>
                </label>
                <span className={Style.tagListTitle}>选择标签</span>
                <ToolTip placement={'top'} title={'点击选择标签'}>
                    <div className={Style.tagListWrapper}>
                        <TagList />
                    </div>
                </ToolTip>
                <div className={Style.submitButtonWrapper}>
                    <button className={Style.submitButton} onClick={this.onCreateResourcePackButtonClick}>创建资源包</button>
                </div>
            </ToolCard>,
            <ResourcePackManagementSelectAdvertisementModal resourcePackName={resourcePackName}
                                                            key={MODAL_ID.RESOURCE_PACK_MANAGEMENT_SELECT_ADVERTISEMENT_MODAL} />,
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