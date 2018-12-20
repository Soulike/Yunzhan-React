import React, {Component} from 'react';
import style from './ScreenListCard.module.scss';
import {View as Card} from '../../../../Components/Card';
import Screen from './Components/Screen/View';

class ScreenListCard extends Component
{
    render()
    {
        return (
            <div className={style.ScreenListCard}>
                <Card title={'屏幕列表'}>
                    <div className={style.screenListWrapper}>
                        <Screen id={1} uuid={111111} name={'哈哈哈哈哈'} isRunning={false}/>
                        <Screen id={2} uuid={111111} name={'哈哈哈哈哈'} isRunning={true}/>
                        <Screen id={3} uuid={111111} name={'哈哈哈哈哈'} isRunning={false}/>
                        <Screen id={3} uuid={111111} name={'哈哈哈哈哈'} isRunning={false}/>
                        <Screen id={3} uuid={111111} name={'哈哈哈哈哈'} isRunning={false}/>
                        <Screen id={3} uuid={111111} name={'哈哈哈哈哈'} isRunning={false}/>
                        <Screen id={3} uuid={111111} name={'哈哈哈哈哈'} isRunning={false}/>
                        <Screen id={3} uuid={111111} name={'哈哈哈哈哈'} isRunning={false}/>
                        <Screen id={3} uuid={111111} name={'哈哈哈哈哈'} isRunning={false}/>
                        <Screen id={3} uuid={111111} name={'哈哈哈哈哈'} isRunning={false}/>
                        <Screen id={3} uuid={111111} name={'哈哈哈哈哈'} isRunning={false}/>
                        <Screen id={3} uuid={111111} name={'哈哈哈哈哈'} isRunning={false}/>

                    </div>
                    <div className={style.buttonWrapper}>
                        <button className={style.addScreenButton}>添加屏幕</button>
                        <button className={style.deleteScreenButton}>删除屏幕</button>
                    </div>
                </Card>
            </div>
        );
    }
}

export default ScreenListCard;