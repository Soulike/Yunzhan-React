import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Card.module.scss';

/* 用来放置内容的容器，内容通过 children 传入
 * 只保证自身样式，大小通过外部盒保证
 * */
class Card extends Component
{
    render()
    {
        const {title, subTitle, children, className, ...rest} = this.props;
        return (
            <div className={`card ${Style.Card} ${className}`} {...rest}>
                {title ? <div className="card-header">{title}
                    <small className={Style.subTitle}>{subTitle}</small>
                </div> : null}
                <div className="card-body">
                    {children}
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};

export default Card;
