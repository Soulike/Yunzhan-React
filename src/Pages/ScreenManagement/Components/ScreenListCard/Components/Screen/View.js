import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './Screen.module.scss';

class Screen extends Component
{
    render()
    {
        const {id, uuid, name, isRunning} = this.props;
        return (
            <div className={style.Screen}>
                <input type="checkbox" className={style.checkbox} id={id}/>
                <label htmlFor={id} className={style.checkboxLabel}/>
                <div className={style.nameWrapper}>
                    <div className={style.name}>{name}</div>
                    <div className={style.uuid}>{uuid}</div>
                </div>
                <div className={`${style.isRunningInfo} ${isRunning ? style.isRunning : null}`}>
                    <span className={`${style.isRunningInfoDot} ${isRunning ? style.isRunning : null}`}/>
                    <span className={`${style.isRunningInfoText} ${isRunning ? style.isRunning : null}`}>
                        {isRunning ? '运行中' : '未运行'}
                    </span>
                </div>
            </div>
        );
    }
}

Screen.propTypes = {
    id: PropTypes.number.isRequired,
    uuid: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isRunning: PropTypes.bool.isRequired
};

export default Screen;