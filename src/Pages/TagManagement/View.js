import React, {Component} from 'react';
import style from './TagManagement.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';
import {MENU_ITEM_ID} from '../../Config/MenuItem';

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
            <div className={style.TagManagement}>

            </div>
        );
    }
}

export default TagManagement;