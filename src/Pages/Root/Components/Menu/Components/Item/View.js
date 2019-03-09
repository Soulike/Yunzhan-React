import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import Style from './Item.module.scss';

class Item extends Component
{
    render()
    {
        const {icon, text, href, isActive, func, isLink} = this.props;
        return (
            <div className={`${Style.Item} ${isActive ? Style.active : null}`}>
                {
                    isLink ? (<Link to={href}>
                        <FontAwesomeIcon icon={icon} className={Style.icon} />
                        <div className={Style.text}>{text}</div>
                    </Link>) : (<div onClick={func}>
                        <FontAwesomeIcon icon={icon} className={Style.icon} />
                        <div className={Style.text}>{text}</div>
                    </div>)
                }
            </div>
        );
    }
}

Item.propTypes = {
    icon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    href: PropTypes.string,
    func: PropTypes.func,
    isLink: PropTypes.bool.isRequired,
    isActive: PropTypes.bool.isRequired
};

export default Item;
