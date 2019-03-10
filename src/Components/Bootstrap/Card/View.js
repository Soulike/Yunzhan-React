import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';

/* 用来放置内容的容器，内容通过 children 传入
 * 只保证自身样式，大小通过外部盒保证
 * */
class Card extends Component
{
    render()
    {
        const {title, subTitle, children, className} = this.props;
        return (
            <div className={`card ${Style.Card} ${className}`}>
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
    className: PropTypes.string,
};

export default Card;
