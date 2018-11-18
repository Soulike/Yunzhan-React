import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import style from './Modal.module.scss';

class Modal extends Component
{
    static show = (title, content, onConfirm) =>
    {
        const root = document.getElementById('root');
        const node = document.createElement('div');
        node.className = style.modalWrapper;
        const wrapper = root.appendChild(node);
        ReactDOM.render(<Modal {...{
            title,
            content,
            onConfirm,
            node,
            wrapper
        }}/>, wrapper);
    };

    onConfirmButtonClick = () =>
    {
        const {onConfirm} = this.props;
        onConfirm();
        this.onCancelButtonClick();
    };

    onCancelButtonClick = () =>
    {
        const root = document.getElementById('root');
        const {wrapper, node} = this.props;
        ReactDOM.unmountComponentAtNode(wrapper);
        root.removeChild(node);
    };

    render()
    {
        const {title, content} = this.props;
        return (
            <div className={style.Modal}>
                <div className={style.title}>{title}</div>
                <div className={style.content}>{content}</div>
                <div className={style.buttonArea}>
                    <button className={style.confirmButton} onClick={this.onConfirmButtonClick}>确定</button>
                    <button className={style.cancelButton} onClick={this.onCancelButtonClick}>取消</button>
                </div>
            </div>
        );
    }
}

Modal.PropTypes = {
    wrapper: PropTypes.object.isRequired,
    node: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired
};

export default Modal;
