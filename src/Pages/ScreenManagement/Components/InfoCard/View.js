import React, {Component} from 'react';
import style from './InfoCard.module.scss';
import {View as Card} from '../../../../Components/Card';
import {View as DividingLine} from './Components/DividingLine';
import RequestProcessors from '../../../../RequestProcessors';
import NAMESPACE from '../../../../Namespace';

class InfoCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.SCREEN_MANAGEMENT.BASIC_INFO.SCREEN_AMOUNT]: 0,
            [NAMESPACE.SCREEN_MANAGEMENT.BASIC_INFO.RUNNING_SCREEN_AMOUNT]: 0,
            [NAMESPACE.SCREEN_MANAGEMENT.BASIC_INFO.ABNORMAL_EVENT_AMOUNT]: 0
        };
    }

    componentDidMount()
    {
        RequestProcessors.sendGetScreenBasicInfoRequest.apply(this);
    }


    render()
    {
        const {
            [NAMESPACE.SCREEN_MANAGEMENT.BASIC_INFO.SCREEN_AMOUNT]: screenAmount,
            [NAMESPACE.SCREEN_MANAGEMENT.BASIC_INFO.RUNNING_SCREEN_AMOUNT]: runningScreenAmount,
            [NAMESPACE.SCREEN_MANAGEMENT.BASIC_INFO.ABNORMAL_EVENT_AMOUNT]: abnormalEventAmount
        } = this.state;
        return (
            <div className={style.InfoCard}>
                <Card title={'屏幕状态'}>
                    <div className={style.infoWrapper}>
                        <div className={style.info}>
                            <div className={style.infoTitle}>总数量</div>
                            <div className={style.infoNumber} style={{color: '#09C'}}>{screenAmount}</div>
                        </div>
                        <DividingLine/>
                        <div className={style.info}>
                            <div className={style.infoTitle}>运行中</div>
                            <div className={style.infoNumber} style={{color: '#090'}}>{runningScreenAmount}</div>
                        </div>
                        <DividingLine/>
                        <div className={style.info}>
                            <div className={style.infoTitle}>已停止</div>
                            <div className={style.infoNumber}
                                 style={{color: '#F00'}}>{screenAmount - runningScreenAmount}</div>
                        </div>
                        <DividingLine/>
                        <div className={style.info}>
                            <div className={style.infoTitle}>异常事件</div>
                            <div className={style.infoNumber} style={{color: '#F00'}}>{abnormalEventAmount}</div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default InfoCard;
