import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as ToolTip} from '../../../../Components/Tooltip';
import {REGEX, TEXT} from '../../../../Static/Regex';
import {WarningAlert} from '../../../../Components/Alerts';
import RequestProcessor from '../../../../RequestProcessor';
import {getTagList, getTagManagementBasicInfo} from '../../Function';
import {View as ToolCard} from '../../../../Components/ToolCard';

class TagAdderCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            tagName: '',
        };
    }

    onTagNameInputChange = e =>
    {
        this.setState({
            tagName: e.target.value,
        });
    };

    onSubmitButtonClick = async e =>
    {
        e.preventDefault();
        const {tagName} = this.state;
        if (!REGEX.TAG_NAME.test(tagName))
        {
            WarningAlert.pop('请输入有效的标签名');
        }
        else
        {
            const requestIsSuccessful = await RequestProcessor.sendPostSubmitNewTagRequestAsync(tagName);
            if (requestIsSuccessful)
            {
                this.setState({
                    tagName: '',
                }, () =>
                {
                    const $tagNameInput = document.querySelector(`.${Style.tagNameInput}`);
                    $tagNameInput.value = '';
                });
                getTagManagementBasicInfo(); // 刷新 Tag 数量
                getTagList();// 刷新Tag列表
            }
        }
    };


    render()
    {
        return (
            <ToolCard className={Style.TagAdderCard} title={'添加标签'}>
                <label className={Style.inputWrapper}>
                    <span className={Style.label}>标签名</span>
                    <ToolTip placement={'top'} title={TEXT.TAG_NAME}>
                        <input type="text"
                               className={Style.tagNameInput}
                               onChange={this.onTagNameInputChange}
                               placeholder={'在此输入新标签名'} />
                    </ToolTip>
                </label>
                <div className={Style.submitButtonWrapper}>
                    <button className={Style.submitButton} onClick={this.onSubmitButtonClick}>添加</button>
                </div>
            </ToolCard>
        );
    }
}

export default TagAdderCard;