import React, {Component} from 'react';
import Style from './Style.module.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';
import {MENU_ITEM_ID} from '../../Config/MenuItem';
import {View as ResourcePackManagementInfoCard} from './Components/ResourcePackManagementInfoCard';
import {getResourcePackList, getResourcePackManagementBasicInfo, unselectAllTags} from './Function';
import {View as AddResourcePackCard} from './Components/AddResourcePackCard';
import {View as ResourcePackListCard} from './Components/ResourcePackListCard';

class ResourceManagement extends Component
{
    componentDidMount()
    {
        document.title = '资源包管理 - 云展';
        MenuFunctions.setActiveItemId(MENU_ITEM_ID.RESOURCE_MANAGEMENT);
        unselectAllTags();
        getResourcePackManagementBasicInfo();
        getResourcePackList();
    }

    render()
    {
        return (
            <div className={Style.ResourceManagement}>
                <div className={Style.leftWrapper}>
                    <ResourcePackManagementInfoCard />
                    <AddResourcePackCard />
                </div>
                <div className={Style.rightWrapper}>
                    <ResourcePackListCard />
                </div>
            </div>
        );
    }
}

export default ResourceManagement;