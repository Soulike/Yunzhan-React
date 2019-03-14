import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {MODAL_ID, REGEX, REGEX_TEXT} from '../../../../../../Config';
import {View as ToolTip} from '../../../../../../Components/Bootstrap/Tooltip';
import Function from '../../../../../../Function';
import {Function as ModalFunction, Modal} from '../../../../../../Components/Bootstrap/Modal';
import {WarningAlert} from '../../../../../../Components/Bootstrap/Alerts';
import RequestProcessor from '../../../../../../RequestProcessor';
import {getTagList} from '../../../../Function';
import {View as DeleteTagModal} from './Components/DeleteTagModal';

class TagInfoModal extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            tagName: '',
            tagNameIsChanged: false,
        };

        this.tagNameInputRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (prevProps.tagName !== this.props.tagName)
        {
            this.setState({
                tagName: this.props.tagName,
            }, () =>
            {
                this.tagNameInputRef.current.value = this.props.tagName;
            });
        }
    }

    onTagNameInputChange = e =>
    {
        this.setState({
            tagNameIsChanged: true,
            tagName: e.target.value,
        });
    };

    onTagInfoModalConfirmButtonClick = async () =>
    {
        const {tagNameIsChanged} = this.state;
        if (tagNameIsChanged)
        {
            const {tagName} = this.state;
            const {tagId} = this.props;
            if (!REGEX.TAG_NAME.test(tagName))
            {
                WarningAlert.pop('请输入有效的标签名');
            }
            else
            {
                const requestIsSuccessful = await RequestProcessor.sendPostChangeTagInfoRequestAsync(tagId, tagName);
                if (requestIsSuccessful)
                {
                    this.setState({
                        tagNameIsChanged: false,
                    }, () =>
                    {
                        ModalFunction.hideModal(MODAL_ID.TAG_INFO_MODAL);
                        getTagList();
                    });

                }
            }
        }
        else
        {
            ModalFunction.hideModal(MODAL_ID.TAG_INFO_MODAL);
        }
    };

    onDeleteTagButtonClick = async () =>
    {
        const {tagBindingResourcePackNameList} = this.props;
        if (tagBindingResourcePackNameList.length === 0)
        {
            await ModalFunction.hideModalAsync(MODAL_ID.TAG_INFO_MODAL);
            ModalFunction.showModal(MODAL_ID.DELETE_TAG_MODAL);
        }
        else
        {
            WarningAlert.pop('不能删除绑定资源包的标签');
        }
    };

    render()
    {
        const {tagId, tagName, tagCreationTime, tagBindingResourcePackNameList} = this.props;
        return [
            <Modal id={MODAL_ID.TAG_INFO_MODAL}
                   title={'标签信息'}
                   className={Style.TagInfoModal}
                   onConfirmButtonClick={this.onTagInfoModalConfirmButtonClick}>
                <div className={Style.modalContent}>
                    <label className={Style.item}>
                        <span className={Style.label}>标签名</span>
                        <ToolTip placement={'top'} title={REGEX_TEXT.TAG_NAME}>
                            <input type="text"
                                   className={Style.tagNameInput}
                                   ref={this.tagNameInputRef}
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
                    <div className={Style.deleteTagButtonWrapper}>
                        <button className={Style.deleteTagButton} onClick={this.onDeleteTagButtonClick}>删除该标签</button>
                    </div>
                </div>
            </Modal>,
            <DeleteTagModal tagId={tagId} tagName={tagName} />,
        ];
    }
}

TagInfoModal.propTypes = {
    tagId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    tagName: PropTypes.string.isRequired,
    tagCreationTime: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    tagBindingResourcePackNameList: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TagInfoModal;