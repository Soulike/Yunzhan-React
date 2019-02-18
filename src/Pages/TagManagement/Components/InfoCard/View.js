import React, {Component} from 'react';
import style from './InfoCard.module.scss';
import {View as Card} from '../../../../Components/Card';
import {View as DividingLine} from './Components/DividingLine';
//import RequestProcessors from '../../../../RequestProcessors';
//import NAMESPACE from '../../../../Namespace';

class InfoCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {};
    }

    componentDidMount()
    {

    }


    render()
    {
        return (
            <div className={style.InfoCard}>
                <Card title={'标签信息'}>
                    <div className={style.infoWrapper}>
                        <div className={style.info}>
                            <div className={style.infoTitle}>总数量</div>
                            <div className={style.infoNumber} style={{color: '#09C'}}>0</div>
                        </div>
                        <DividingLine />
                        <div className={style.info}>
                            <div className={style.infoTitle}>使用中</div>
                            <div className={style.infoNumber} style={{color: '#090'}}>0</div>
                        </div>
                        <DividingLine />
                        <div className={style.info}>
                            <div className={style.infoTitle}>未使用</div>
                            <div className={style.infoNumber}
                                 style={{color: '#F00'}}>0
                            </div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default InfoCard;
