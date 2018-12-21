import React, {Component} from 'react';
import style from './LogCard.module.scss';
import {View as Card} from '../../../../Components/Card';
import {View as Log} from './Components/Log/';
import {getAsync, requestPrefix} from '../../../../Static/Functions';
import {STATUS_CODE} from '../../../../Static/Constants';
import {View as Alert} from '../../../../Components/Alert';
import {redirectToLogin} from '../../../Login/Functions';

class LogCard extends Component
{
    constructor()
    {
        const date = new Date();
        super(...arguments);
        this.state = {
            logList: [
                {
                    time: date.toISOString(),
                    text: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
                },
                {time: date.toISOString(), text: 'aaaaaaaaaaaaaaaaaaaaaaaa'},
                {time: date.toISOString(), text: 'aaaaaaaaaaaaaaaaaaaaaaaa'},
                {time: date.toISOString(), text: 'aaaaaaaaaaaaaaaaaaaaaaaa'},
                {time: date.toISOString(), text: 'aaaaaaaaaaaaaaaaaaaaaaaa'},
            ]
        };
    }

    componentDidMount()
    {
        getAsync(requestPrefix('/admin/screenManagement/getLogList'), false)
            .then(res =>
            {
                const {code, data} = res;
                if (code === STATUS_CODE.SUCCESS)
                {
                    this.setState({logList: data});
                }
                else if (code === STATUS_CODE.INVALID_SESSION)
                {
                    Alert.show('请先登录', false);
                    redirectToLogin();
                }
                else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
                {
                    Alert.show('服务器错误', false);
                }
            })
            .catch(e =>
            {
                Alert.show('获取最新消息失败', false);
                console.log(e);
            });
    }


    render()
    {
        const {logList} = this.state;
        return (
            <div className={style.LogCard}>
                <Card title={'最新消息'}>
                    <div className={style.logList}>
                        {logList.map(log =>
                        {
                            return <Log {...log} key={log.time}/>;
                        })}
                    </div>
                </Card>
            </div>
        );
    }
}

export default LogCard;