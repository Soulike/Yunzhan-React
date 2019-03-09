import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Log.module.scss';
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
            <div className={Style.Log}>
                <div className={Style.time}>{generateDateStr(time)}</div>
                <div className={Style.content}>{content}</div>
            </div>
        );
    }
}

Log.propTypes = {
    [NAMESPACE.SCREEN_MANAGEMENT.LOG.TIME]: PropTypes.string.isRequired,
    [NAMESPACE.SCREEN_MANAGEMENT.LOG.CONTENT]: PropTypes.string.isRequired
};

export default Log;
