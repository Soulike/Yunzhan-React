import React, {Component} from 'react';
import Style from './Style.module.scss';
import RequestProcessor from '../../../../RequestProcessor';
import NAMESPACE from '../../../../Namespace';
import {View as Tag} from './Components/Tag';
import {Function as ModalFunction, Modal} from '../../../../Components/Bootstrap/Modal';
import {MODAL_ID, REGEX, REGEX_TEXT} from '../../../../Config';
import Function from '../../../../Function';
import {WarningAlert} from '../../../../Components/Bootstrap/Alerts';
import {View as ToolTip} from '../../../../Components/Bootstrap/Tooltip';
import {connect} from 'react-redux';
import {View as ListCard} from '../../../../Components/ListCard';
import {getTagList} from '../../Function';

class TagListCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentTagIdInModal: 0,
            tagNameIsChanged: false,
            [NAMESPACE.TAG_MANAGEMENT.TAG.NAME]: '',
            [NAMESPACE.TAG_MANAGEMENT.TAG.CREATION_TIME]: Date.now(),
            [NAMESPACE.TAG_MANAGEMENT.TAG.BINDING_RESOURCE_PACK_NAME_LIST]: [],
        };
    }

    onTagClick = id =>
    {
        return async () =>
        {
            const tagInfo = await RequestProcessor.sendGetTagInfoRequestAsync(id);
            if (tagInfo)
            {
                this.setState({
                    tagNameIsChanged: false,
                    currentTagIdInModal: id,
                    ...tagInfo,
                }, () =>
                {
                    const $tagNameInput = document.querySelector(`.${Style.tagNameInput}`);
                    $tagNameInput.value = tagInfo[NAMESPACE.TAG_MANAGEMENT.TAG.NAME];
                    ModalFunction.showModal(MODAL_ID.TAG_INFO_MODAL);
                });
            }
        };
    };

    onTagNameInputChange = e =>
    {
        this.setState({
            tagNameIsChanged: true,
            [NAMESPACE.TAG_MANAGEMENT.TAG.NAME]: e.target.value,
        });
    };

    onTagInfoModalConfirmButtonClick = async () =>
    {
        const {tagNameIsChanged} = this.state;
        if (tagNameIsChanged)
        {
            const {currentTagIdInModal, [NAMESPACE.TAG_MANAGEMENT.TAG.NAME]: tagName} = this.state;
            if (!REGEX.TAG_NAME.test(tagName))
            {
                WarningAlert.pop('请输入有效的标签名');
            }
            else
            {
                const requestIsSuccessful = await RequestProcessor.sendPostChangeTagInfoRequestAsync(currentTagIdInModal, tagName);
                if (requestIsSuccessful)
                {
                    ModalFunction.hideModal(MODAL_ID.TAG_INFO_MODAL);
                    getTagList();
                }
            }
        }
    };

    render()
    {
        const {
            [NAMESPACE.TAG_MANAGEMENT.TAG.CREATION_TIME]: tagCreationTime,
            [NAMESPACE.TAG_MANAGEMENT.TAG.BINDING_RESOURCE_PACK_NAME_LIST]: tagBindingResourcePackNameList,
        } = this.state;
        const {tagList} = this.props;
        return [
            <ListCard title={'标签列表'} subTitle={'可点击查看详细信息'} className={Style.TagListCard}>
                <div className={Style.tagListWrapper}>
                    {
                        // TODO: 排序方式
                        tagList.map(tag =>
                        {
                            const {[NAMESPACE.TAG_MANAGEMENT.TAG.ID]: id, [NAMESPACE.TAG_MANAGEMENT.TAG.NAME]: tagName} = tag;
                            return (
                                <div className={Style.tagWrapper} key={id} onClick={this.onTagClick(id)}>
                                    <Tag name={tagName} />
                                </div>);
                        })
                    }
                    {
                        Function.padFlexLastRow(<div className={`${Style.tagWrapper} ${Style.empty}`} />, 5)
                    }
                </div>
            </ListCard>,
            <Modal id={MODAL_ID.TAG_INFO_MODAL}
                   title={'标签信息'}
                   onConfirmButtonClick={this.onTagInfoModalConfirmButtonClick}>
                <div className={Style.modalContent}>
                    <label className={Style.item}>
                        <span className={Style.label}>标签名</span>
                        <ToolTip placement={'top'} title={REGEX_TEXT.TAG_NAME}>
                            <input type="text"
                                   className={Style.tagNameInput}
                                   onChange={this.onTagNameInputChange} />
                        </ToolTip>
                    </label>
                    <div className={Style.item}>
                        <span className={Style.label}>添加时间</span>
                        <div className={Style.itemInfoContent}>{Function.generateDateStr(tagCreationTime)}</div>
                    </div>
                    <div className={Style.bindingResourcePackListWrapper}>
                            <span className={Style.bindingResourcePackListTitle}>
                                <div>绑定资源包</div>
                                <div>(共 {tagBindingResourcePackNameList.length} 个)</div>
                            </span>
                        <ul className={Style.bindingResourcePackList}>
                            {
                                tagBindingResourcePackNameList.map(resourcePackName =>
                                    <li className={Style.resourcePackName}
                                        key={resourcePackName}>{resourcePackName}</li>)
                            }
                        </ul>
                    </div>
                </div>
            </Modal>,
        ];
    }
}

const mapStateToProps = state =>
{
    const {TagManagement: {tagList}} = state;
    return {tagList};
};

export default connect(mapStateToProps)(TagListCard);