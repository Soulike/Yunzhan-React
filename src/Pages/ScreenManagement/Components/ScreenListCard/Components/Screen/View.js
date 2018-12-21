import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './Screen.module.scss';

class Screen extends Component
{
    onNameWrapperClick = () =>
    {
        const {id} = this.props;
        const $checkbox = document.querySelector(`#_${id}`);
        $checkbox.checked = !$checkbox.checked;
    };

    render()
    {
        const {id, uuid, name, isRunning, resourcePackId, resourcePackName} = this.props;
        return (
            <div className={style.Screen}>
                <input type="checkbox" className={style.checkbox} id={`_${id}`}/>
                <label htmlFor={`_${id}`} className={style.checkboxLabel}/>
                <div className={style.nameWrapper} onClick={this.onNameWrapperClick}>
                    <div className={style.name}>{name}</div>
                    <div className={style.uuid}>{uuid}</div>
                </div>
                <div className={`${style.isRunningInfo} ${isRunning ? style.isRunning : null}`}>
                    <span className={`${style.isRunningInfoDot} ${isRunning ? style.isRunning : null}`}/>
                    <span className={`${style.isRunningInfoText} ${isRunning ? style.isRunning : null}`}>
                        {isRunning ? '运行中' : '未运行'}
                    </span>
                </div>
                <div className={style.resourcePackName}>{resourcePackName}</div>
                <div className={style.buttonWrapper}>
                    {resourcePackId === undefined ?
                        <button className={style.bindResourcePackButton}>绑定资源包</button> :
                        <button className={style.unBindResourcePackButton}>解绑资源包</button>}
                </div>
            </div>
        );
    }
}

Screen.propTypes = {
    id: PropTypes.number.isRequired,
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isRunning: PropTypes.bool.isRequired,
    resourcePackId: PropTypes.number,
    resourcePackName: PropTypes.string
};

export default Screen;