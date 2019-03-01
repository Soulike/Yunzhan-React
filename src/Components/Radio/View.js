import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import Function from '../../Function';

class Radio extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            stateId: `radio_${Function.randomString()}`,
        };
    }


    render()
    {
        const {className, label, id, onClick, ...rest} = this.props;
        const {stateId} = this.state;
        return (
            <div className={`custom-control custom-radio ${Style.Radio}`} onClick={onClick}>
                <input type="radio"
                       id={id ? id : stateId}
                       className={`custom-control-input ${className}`}
                       {...rest} />
                <label className="custom-control-label" htmlFor={id ? id : stateId}>{label}</label>
            </div>
        );
    }
}

Radio.propTypes = {
    className: PropTypes.string,
    label: PropTypes.node,
    id: PropTypes.string,
    onClick: PropTypes.func,
};


export default Radio;