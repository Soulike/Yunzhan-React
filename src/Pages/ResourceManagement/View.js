import React, {Component} from 'react';
import style from './ResourceManagement.module.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';

class ResourceManagement extends Component
{
    componentDidMount()
    {
        document.title = '资源包管理 - 云展';
        MenuFunctions.setActiveItemId(4);
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