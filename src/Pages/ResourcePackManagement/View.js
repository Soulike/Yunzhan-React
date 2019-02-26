import React, {Component} from 'react';
import Style from './Style.module.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';
import {MENU_ITEM_ID} from '../../Config/MenuItem';
import {View as ResourcePackManagementInfoCard} from './Components/ResourcePackManagementInfoCard';
import {getResourcePackManagementBasicInfo} from './Function';

class ResourceManagement extends Component
{
    componentDidMount()
    {
        document.title = '资源包管理 - 云展';
        MenuFunctions.setActiveItemId(MENU_ITEM_ID.RESOURCE_MANAGEMENT);
        getResourcePackManagementBasicInfo();
    }

    render()
    {
        return (
            <div className={Style.ResourceManagement}>
                <div className={Style.leftWrapper}>
                    <ResourcePackManagementInfoCard />
                </div>
                <div className={Style.rightWrapper}>
                </div>
            </div>
        );
    }
}

export default ResourceManagement;