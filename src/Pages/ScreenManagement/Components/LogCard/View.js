import React, {Component} from 'react';
import style from './LogCard.module.scss';
import {View as Card} from '../../../../Components/Card';
import {View as Log} from './Components/Log';
import NAMESPACE from '../../../../Namespace';
import {connect} from 'react-redux';

class LogCard extends Component
{
    render()
    {
        const {logList} = this.props;
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

const mapStateToProps = state =>
{
    const {ScreenManagement: {logList}} = state;
    return {logList};
};

export default connect(mapStateToProps)(LogCard);
