import React, {Component} from 'react';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import style from './TagManagement.scss';
import {View as Title} from '../../Components/Title';
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
                <Title icon={solidIcon.faTags} text={'标签管理'}/>
            </div>
        );
    }
}

export default TagManagement;