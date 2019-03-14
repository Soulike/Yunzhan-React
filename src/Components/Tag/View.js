import React, {Component} from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {View as Badge} from '../Bootstrap/Badge';

class Tag extends Component
{
    render()
    {
        const {children, className} = this.props;
        return (
            <Badge className={`${className || null} ${Style.Tag}`}>{children}</Badge>
        );
    }
}

PropTypes.propTypes = {
    className: PropTypes.string,
};

export default Tag;