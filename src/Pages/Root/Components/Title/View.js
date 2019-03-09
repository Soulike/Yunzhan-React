import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Style from './Title.module.scss';

class Title extends Component
{
    render()
    {
        const {icon, text} = this.props;
        return (
            <div className={Style.Title}>
                <FontAwesomeIcon icon={icon} className={Style.icon} />
                <span className={Style.text}>{text}</span>
            </div>
        );
    }
}

Title.propTypes = {
    icon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired
};

export default Title;