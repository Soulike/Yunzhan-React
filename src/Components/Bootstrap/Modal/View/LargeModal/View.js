import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ModalBase from '../../View';
import MODAL_TYPE from '../../MODAL_TYPE';

class LargeModal extends Component
{
    render()
    {
        return (
            <ModalBase modalType={MODAL_TYPE.LARGE_MODAL} {...this.props} />
        );
    }
}

LargeModal.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    className: PropTypes.string,
    onConfirmButtonClick: PropTypes.func,
};

export default LargeModal;