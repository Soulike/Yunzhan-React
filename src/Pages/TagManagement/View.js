import React, {Component} from 'react';
import style from './TagManagement.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';

class TagManagement extends Component
{
    componentDidMount()
    {
        document.title = '标签管理 - 云展';
        MenuFunctions.setActiveItemId(3);
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