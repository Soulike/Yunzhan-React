import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';

class Tag extends Component
{
    render()
    {
        const {name} = this.props;
        return (
            <span className={`${Style.Tag} badge badge-primary`}>
                {name}
            </span>
        );
    }
}

Tag.propTypes = {
    name: PropTypes.string.isRequired,
};

export default Tag;