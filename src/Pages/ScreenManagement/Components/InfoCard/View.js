import React, {Component} from 'react';
import style from './InfoCard.module.scss';
import {View as Card} from '../../../../Components/Card';
import {View as DividingLine} from './Components/DividingLine';
import {getAsync, requestPrefix} from '../../../../Static/Functions';
import {STATUS_CODE} from '../../../../Static/Constants';
import {View as Alert} from '../../../../Components/Alert';
import {redirectToLogin} from '../../../Login/Functions';

class InfoCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            screenNum: 0,
            runningScreenNum: 0,
            abnormalEventNum: 0
        };
    }

    componentDidMount()
    {
        this.getBasicInfo();
    }

    getBasicInfo = () =>
    {
        getAsync(requestPrefix('/admin/screenManagement/getBasicInfo'), false)
            .then(res =>
            {
                const {code, data} = res;
                if (code === STATUS_CODE.SUCCESS)
                {
                    const {screenNum, runningScreenNum, abnormalEventNum} = data;
                    this.setState({
                        screenNum,
                        runningScreenNum,
                        abnormalEventNum
                    });
                }
                else if (code === STATUS_CODE.INVALID_SESSION)
                {
                    redirectToLogin();
                    Alert.show('请先登录', false);
                }
                else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
                {
                    Alert.show('服务器错误', false);
                }
            })
            .catch(e =>
            {
                Alert.show('获取屏幕基本信息失败', false);
                console.log(e);
            });
    };


    render()
    {
        const {screenNum, runningScreenNum, abnormalEventNum} = this.state;
        return (
            <div className={style.InfoCard}>
                <Card title={'屏幕状态'}>
                    <div className={style.infoWrapper}>
                        <div className={style.info}>
                            <div className={style.infoTitle}>总数量</div>
                            <div className={style.infoNumber} style={{color: '#09C'}}>{screenNum}</div>
                        </div>
                        <DividingLine/>
                        <div className={style.info}>
                            <div className={style.infoTitle}>运行中</div>
                            <div className={style.infoNumber} style={{color: '#090'}}>{runningScreenNum}</div>
                        </div>
                        <DividingLine/>
                        <div className={style.info}>
                            <div className={style.infoTitle}>已停止</div>
                            <div className={style.infoNumber}
                                 style={{color: '#F00'}}>{screenNum - runningScreenNum}</div>
                        </div>
                        <DividingLine/>
                        <div className={style.info}>
                            <div className={style.infoTitle}>异常事件</div>
                            <div className={style.infoNumber} style={{color: '#F00'}}>{abnormalEventNum}</div>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }
}

export default InfoCard;
