import React, {Component} from 'react';
import Style from './LogCard.module.scss';
import {View as Log} from './Components/Log';
import NAMESPACE from '../../../../Namespace';
import {connect} from 'react-redux';
import {View as ToolCard} from '../../../../Components/ToolCard';

class LogCard extends Component
{
    render()
    {
        const {logList} = this.props;
        return (
            <ToolCard title={'最新消息'} className={Style.LogCard}>
                <div className={Style.logList}>
                    {logList.map(log =>
                    {
                        return <Log {...log} key={log[NAMESPACE.SCREEN_MANAGEMENT.LOG.TIME]} />;
                    })}
                </div>
            </ToolCard>
        );
    }
}

const mapStateToProps = state =>
{
    const {ScreenManagement: {logList}} = state;
    return {logList};
};

export default connect(mapStateToProps)(LogCard);
