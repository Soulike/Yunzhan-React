import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import style from './Item.module.scss';

class Item extends Component
{
    render()
    {
        const {icon, text, href, isActive} = this.props;
        return (
            <div className={`${style.Item} ${isActive ? style.active : null}`}>
                <Link to={href}>
                    <FontAwesomeIcon icon={icon} className={style.icon}/>
                    <div className={style.text}>{text}</div>
                </Link>
            </div>
        );
    }
}

Item.propTypes = {
    icon: PropTypes.object.isRequired,
    text: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired
};

export default Item;