import React, {Component} from 'react';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import style from './Overview.module.scss';
import {View as Title} from '../../Components/Title';
import {Functions as MenuFunctions} from '../Root/Components/Menu';

class Overview extends Component
{
    componentDidMount()
    {
        document.title = '概览 - 云展';
        MenuFunctions.setActiveItemIndex(0);
    }

    render()
    {
        return (
            <div className={style.Overview}>
                <Title icon={solidIcon.faList} text={'概览'}/>
            </div>
        );
    }
}

export default Overview;