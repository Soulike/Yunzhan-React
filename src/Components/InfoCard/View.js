import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {View as DividingLine} from './Components/DividingLine';
import {View as Card} from '../Card';

class InfoCard extends Component
{
    render()
    {
        const {title, infoArray} = this.props;
        return (
            <div className={Style.InfoCard}>
                <Card title={title}>
                    <div className={Style.infoWrapper}>
                        {
                            infoArray.map((info, i) =>
                            {
                                const {name, color, value} = info;
                                return [
                                    <div className={Style.info}>
                                        <div className={Style.infoTitle}>{name}</div>
                                        <div className={Style.infoNumber}
                                             style={{color}}>{value || 0}</div>
                                    </div>,
                                    i === infoArray.length - 1 ? null : <DividingLine />,
                                ];
                            })
                        }
                    </div>
                </Card>
            </div>
        );
    }
}

InfoCard.propTypes = {
    title: PropTypes.string.isRequired,
    infoArray: PropTypes.array.isRequired,
};

export default InfoCard;