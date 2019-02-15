import React, {Component} from 'react';
import style from './ResourceManagement.module.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';
import {MENU_ITEM_ID} from '../../Config/MenuItem';

class ResourceManagement extends Component
{
    componentDidMount()
    {
        document.title = '资源包管理 - 云展';
        MenuFunctions.setActiveItemId(MENU_ITEM_ID.RESOURCE_MANAGEMENT);
    }

    render()
    {
        return (
            <div className={style.ResourceManagement}>

            </div>
        );
    }
}

export default ResourceManagement;