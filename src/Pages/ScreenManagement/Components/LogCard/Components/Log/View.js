import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './Log.module.scss';
import Functions from '../../../../../../Function';
import NAMESPACE from '../../../../../../Namespace';

const {generateDateStr} = Functions;

class Log extends Component
{
    render()
    {
        const {
            [NAMESPACE.SCREEN_MANAGEMENT.LOG.TIME]: time,
            [NAMESPACE.SCREEN_MANAGEMENT.LOG.CONTENT]: content
        } = this.props;
        return (
            <div className={style.Log}>
                <div className={style.time}>{generateDateStr(time)}</div>
                <div className={style.content}>{content}</div>
            </div>
        );
    }
}

Log.propTypes = {
    [NAMESPACE.SCREEN_MANAGEMENT.LOG.TIME]: PropTypes.string.isRequired,
    [NAMESPACE.SCREEN_MANAGEMENT.LOG.CONTENT]: PropTypes.string.isRequired
};

export default Log;
