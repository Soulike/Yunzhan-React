import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import style from './Log.module.scss';
import {generateDateStr} from '../../../../../../Static/Functions';

class Log extends Component
{
    render()
    {
        const {time, text} = this.props;
        return (
            <div className={style.Log}>
                <div className={style.dot}>
                    <FontAwesomeIcon icon={solidIcons.faTag}/>
                </div>
                <div className={style.time}>{generateDateStr(time)}</div>
                <div className={style.text}>{text}</div>
            </div>
        );
    }
}

Log.propTypes = {
    time: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};

export default Log;