import React, {Component} from 'react';
import Style from './Style.module.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';
import {MENU_ITEM_ID} from '../../Config/MenuItem';
import {View as TagManagementInfoCard} from './Components/TagManagementInfoCard';
import {View as TagAdderCard} from './Components/TagAdderCard';
import {View as TagListCard} from './Components/TagListCard';
import {getTagList, getTagManagementBasicInfo} from './Function';

class TagManagement extends Component
{
    componentDidMount()
    {
        document.title = '标签管理 - 云展';
        MenuFunctions.setActiveItemId(MENU_ITEM_ID.TAG_MANAGEMENT);
        getTagManagementBasicInfo();
        getTagList();
    }

    render()
    {
        return (
            <div className={Style.TagManagement}>
                <div className={Style.leftWrapper}>
                    <TagManagementInfoCard />
                    <TagAdderCard />
                </div>
                <div className={Style.rightWrapper}>
                    <TagListCard />
                </div>
            </div>
        );
    }
}

export default TagManagement;