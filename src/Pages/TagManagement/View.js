import React, {Component} from 'react';
import Style from './TagManagement.module.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';
import {MENU_ITEM_ID} from '../../Config/MenuItem';
import {View as InfoCard} from './Components/InfoCard';
import {View as TagAdderCard} from './Components/TagAdderCard';
import {View as TagListCard} from './Components/TagListCard';

class TagManagement extends Component
{
    componentDidMount()
    {
        document.title = '标签管理 - 云展';
        MenuFunctions.setActiveItemId(MENU_ITEM_ID.TAG_MANAGEMENT);
    }

    render()
    {
        return (
            <div className={Style.TagManagement}>
                <div className={Style.cardWrapper}>
                    <div className={Style.leftWrapper}>
                        <InfoCard />
                        <TagAdderCard />
                    </div>
                    <div className={Style.rightWrapper}>
                        <TagListCard />
                    </div>
                </div>
            </div>
        );
    }
}

export default TagManagement;