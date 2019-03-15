import React, {Component} from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';

class RunningSign extends Component
{
    render()
    {
        const {isRunning} = this.props;
        return (
            <div className={Style.RunningSign}>
                {
                    isRunning ?
                        <div className={Style.runningSign}><span className={Style.circle} />
                            <span className={Style.text}>运行中</span></div> :
                        <div className={Style.notRunningSign}><span className={Style.circle} />
                            <span className={Style.text}>未运行</span></div>
                }
            </div>);
    }
}

RunningSign.propTypes = {
    isRunning: PropTypes.bool.isRequired,
};

export default RunningSign;