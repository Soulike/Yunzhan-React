import React, {Component} from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {View as Card} from '../Bootstrap/Card';

class ListCard extends Component
{
    render()
    {
        const {title, subTitle, children, className} = this.props;
        return (
            <Card title={title} subTitle={subTitle} className={`${className} ${Style.ListCard}`}>
                <div className={Style.content}>
                    {children}
                </div>
            </Card>
        );
    }
}

ListCard.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    className: PropTypes.string,
};

export default ListCard;