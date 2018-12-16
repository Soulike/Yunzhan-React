import React, {Component} from 'react';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import style from './ResourceManagement.module.scss';
import Title from '../../Components/Title/View';
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
                <Title icon={solidIcon.faFileArchive} text={'资源包管理'}/>
            </div>
        );
    }
}

export default ResourceManagement;