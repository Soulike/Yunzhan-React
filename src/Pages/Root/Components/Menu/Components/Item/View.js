import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import style from './Item.module.scss';

class Item extends Component
{
    render()
    {
        const {icon, text, href, isActive, func, isLink} = this.props;
        return (
            <div className={`${style.Item} ${isActive ? style.active : null}`}>
                {
                    isLink ? (<Link to={href}>
                        <FontAwesomeIcon icon={icon} className={style.icon}/>
                        <div className={style.text}>{text}</div>
                    </Link>) : (<span onClick={func}>
                        <FontAwesomeIcon icon={icon} className={style.icon}/>
                        <div className={style.text}>{text}</div>
                    </span>)
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
