import React, {Component} from 'react';
import style from './InfoCard.module.scss';
import {View as Card} from '../../../../Components/Card';
import {View as DividingLine} from './Components/DividingLine';

class InfoCard extends Component
{
    render()
    {
        return (
            <div className={style.InfoCard}>
                <Card title={'屏幕状态'}>
                    <div className={style.infoWrapper}>
                        <div className={style.info}>
                            <div className={style.infoTitle}>总数量</div>
                            <div className={style.infoNumber} style={{color: '#09C'}}>10</div>
                        </div>
                        <DividingLine/>
                        <div className={style.info}>
                            <div className={style.infoTitle}>运行中</div>
                            <div className={style.infoNumber} style={{color: '#090'}}>9</div>
                        </div>
                        <DividingLine/>
                        <div className={style.info}>
                            <div className={style.infoTitle}>已停止</div>
                            <div className={style.infoNumber} style={{color: '#F00'}}>1</div>
                        </div>
                        <DividingLine/>
                        <div className={style.info}>
                            <div className={style.infoTitle}>异常事件</div>
                            <div className={style.infoNumber} style={{color: '#F00'}}>0</div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default InfoCard;