import React, {Component} from 'react';
import style from './InfoCard.module.scss';
import {View as Card} from '../../../../Components/Card';
import {View as DividingLine} from './Components/DividingLine';
import RequestProcessor from '../../../../RequestProcessor';
import NAMESPACE from '../../../../Namespace';

class InfoCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.TAG_MANAGEMENT.BASIC_INFO.TAG_AMOUNT]: 0,
            [NAMESPACE.TAG_MANAGEMENT.BASIC_INFO.USING_TAG_AMOUNT]: 0,
        };
    }

    componentDidMount()
    {
        RequestProcessor.sendGetTagBasicInfoRequest.apply(this);
    }


    render()
    {
        const {
            [NAMESPACE.TAG_MANAGEMENT.BASIC_INFO.TAG_AMOUNT]: tagAmount,
            [NAMESPACE.TAG_MANAGEMENT.BASIC_INFO.USING_TAG_AMOUNT]: usingTagAmount,
        } = this.state;
        return (
            <div className={style.InfoCard}>
                <Card title={'标签信息'}>
                    <div className={style.infoWrapper}>
                        <div className={style.info}>
                            <div className={style.infoTitle}>总数量</div>
                            <div className={style.infoNumber} style={{color: '#09C'}}>{tagAmount}</div>
                        </div>
                        <DividingLine />
                        <div className={style.info}>
                            <div className={style.infoTitle}>使用中</div>
                            <div className={style.infoNumber} style={{color: '#090'}}>{usingTagAmount}</div>
                        </div>
                        <DividingLine />
                        <div className={style.info}>
                            <div className={style.infoTitle}>未使用</div>
                            <div className={style.infoNumber}
                                 style={{color: '#F00'}}>{tagAmount - usingTagAmount}
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default InfoCard;
