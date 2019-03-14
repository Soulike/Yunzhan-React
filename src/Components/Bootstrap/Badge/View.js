import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';

class Badge extends Component
{
    render()
    {
        const {children, className} = this.props;
        return (
            <span className={`badge ${Style.Badge} ${className || null}`}>
                {children}
            </span>
        );
    }
}

Badge.propTypes = {
    className: PropTypes.string,
};

export default Badge;