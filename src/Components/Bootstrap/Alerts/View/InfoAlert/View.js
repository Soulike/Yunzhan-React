import React, {Component} from 'react';
import Style from './Style.module.scss';
import {popAlert} from '../../Functions';
import PropTypes from 'prop-types';

class InfoAlert extends Component
{
    static pop(content, durationMilliseconds)
    {
        popAlert(<InfoAlert>{content}</InfoAlert>, durationMilliseconds);
    }

    render()
    {
        const {className} = this.props;
        return (
            <div className={`${Style.InfoAlert} ${className}`}>
                <div className="alert alert-info" role="alert">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

InfoAlert.propTypes = {
    className: PropTypes.string,
};

export default InfoAlert;