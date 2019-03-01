import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import Function from '../../Function';

class Checkbox extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            stateId: `checkbox_${Function.randomString()}`,
        };
    }

    render()
    {
        const {className, label, id, onClick, ...rest} = this.props;
        const {stateId} = this.state;
        return (
            <div className={`custom-control custom-checkbox ${Style.Checkbox}`} onClick={onClick}>
                <input type={'checkbox'}
                       id={id ? id : stateId}
                       className={`custom-control-input ${className}`}
                       {...rest} />
                <label className="custom-control-label" htmlFor={id ? id : stateId}>{label}</label>
            </div>
        );
    }
}

Checkbox.propTypes = {
    className: PropTypes.string,
    label: PropTypes.node,
    id: PropTypes.string,
    onClick: PropTypes.func,
};

export default Checkbox;