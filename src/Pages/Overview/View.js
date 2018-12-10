import React, {Component} from 'react';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import style from './Overview.module.scss';
import {View as Title} from '../../Components/Title';
import {Functions as MenuFunctions} from '../Root/Components/Menu';
import {View as Card} from '../../Components/Card';

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
                <div className={style.cardWrapper}>
                    <div className={style.cardRow}>
                        <div className={style.card}>
                            <Card title={'登录信息'}>
                                <div>上午好，<span>316413310@qq.com</span></div>
                                <div>上次登录 IP：<span>192.168.1.1 中国北京市</span></div>
                                <div>本次登录 IP：<span>192.168.1.1 中国辽宁省大连市</span></div>
                                <div>上次登录时间：<span>2018 年 11 月 11 日 12:00</span></div>
                            </Card>
                        </div>
                        <div className={style.card}>
                            <Card title={'登录信息'}>
                                <div>上午好，<span>316413310@qq.com</span></div>
                                <div>上次登录 IP：<span>192.168.1.1 中国北京市</span></div>
                                <div>本次登录 IP：<span>192.168.1.1 中国辽宁省大连市</span></div>
                                <div>上次登录时间：<span>2018 年 11 月 11 日 12:00</span></div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Overview;
