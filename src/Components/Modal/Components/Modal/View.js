import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';

class Modal extends Component
{
    render()
    {
        const {id, title, children} = this.props;
        return (
            <div className={Style.Modal}>
                <div className="modal fade"
                     id={id}
                     tabIndex="-1"
                     role="dialog"
                     aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {children}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" data-dismiss="modal">确定</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    onConfirmButtonClickFunction: PropTypes.func,
};

export default Modal;