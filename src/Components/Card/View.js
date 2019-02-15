import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './Card.module.scss';

/* 用来放置内容的容器，内容通过 children 传入
 * 只保证自身样式，大小通过外部盒保证
 * */
class Card extends Component
{
    render()
    {
        const {title, children, className, ...rest} = this.props;
        return (
            <div className={`card ${style.Card} ${className}`} {...rest}>
                {title ? <div className="card-header">{title}</div> : null}
                <div className="card-body">
                    {children}
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    title: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Card;
