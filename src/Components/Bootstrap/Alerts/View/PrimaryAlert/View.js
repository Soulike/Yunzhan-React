import React, {Component} from 'react';
import Style from './Style.module.scss';
import {popAlert} from '../../Functions';
import PropTypes from 'prop-types';

class PrimaryAlert extends Component
{
    static pop(content, durationMilliseconds)
    {
        popAlert(<PrimaryAlert>{content}</PrimaryAlert>, durationMilliseconds);
    }

    render()
    {
        const {className} = this.props;
        return (
            <div className={`${Style.PrimaryAlert} ${className}`}>
                <div className="alert alert-primary" role="alert">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

PrimaryAlert.propTypes = {
    className: PropTypes.string,
};

export default PrimaryAlert;