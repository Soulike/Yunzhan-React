import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {popAlert} from '../../Functions';

class DangerAlert extends Component
{
    static pop(content, durationMilliseconds)
    {
        popAlert(<DangerAlert>{content}</DangerAlert>, durationMilliseconds);
    }

    render()
    {
        const {className} = this.props;
        return (
            <div className={`${Style.DangerAlert} ${className}`}>
                <div className="alert alert-danger" role="alert">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

DangerAlert.propTypes = {
    className: PropTypes.string,
};

export default DangerAlert;