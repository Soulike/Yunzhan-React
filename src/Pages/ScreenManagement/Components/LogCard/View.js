import React, {Component} from 'react';
import style from './LogCard.module.scss';
import {View as Card} from '../../../../Components/Card';
import {View as Log} from './Components/Log/';
import RequestProcessors from '../../../../RequestProcessor';
import NAMESPACE from '../../../../Namespace';


class LogCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.SCREEN_MANAGEMENT.LIST.LOG]: [],
        };
    }

    componentDidMount()
    {
        RequestProcessors.sendGetScreenLogListRequestAsync()
            .then(logList =>
            {
                this.setState({...logList});
            });
    }


    render()
    {
        const {[NAMESPACE.SCREEN_MANAGEMENT.LIST.LOG]: logList} = this.state;
        return (
            <div className={style.LogCard}>
                <Card title={'最新消息'}>
                    <div className={style.logList}>
                        {logList.map(log =>
                        {
                            return <Log {...log} key={log[NAMESPACE.SCREEN_MANAGEMENT.LOG.TIME]} />;
                        })}
                    </div>
                </Card>
            </div>
        );
    }
}

export default LogCard;
