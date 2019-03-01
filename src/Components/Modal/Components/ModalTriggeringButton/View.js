import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';

class ModalTriggerButton extends Component
{
    render()
    {
        const {children, modalId, className, ...rest} = this.props;
        return (
            <button className={`${Style.ModalTriggeringButton} ${className}`}
                    data-toggle="modal"
                    data-target={`#${modalId}`} {...rest}>
                {children}
            </button>
        );
    }
}

ModalTriggerButton.propTypes = {
    modalId: PropTypes.string.isRequired,
    className: PropTypes.string,
    onClick: PropTypes.func,
};

export default ModalTriggerButton;