import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';

class ModalBase extends Component
{
    render()
    {
        const {id, title, children, onConfirmButtonClick, className, subTitle} = this.props;
        return (
            <div className={`${Style.Modal} ${className}  modal fade`}
                 id={id}
                 tabIndex="-1"
                 role="dialog"
                 aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{title}
                                <small className={Style.subTitle}>{subTitle}</small>
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={`modal-body ${Style.body}`}>
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button type="button"
                                    className="btn btn-primary"
                                    onClick={onConfirmButtonClick}>确定
                            </button>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ModalBase.propTypes = {
    modalType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    className: PropTypes.string,
    onConfirmButtonClick: PropTypes.func,
};

export default ModalBase;