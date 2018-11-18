import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import style from './Alert.module.scss';

class Alert extends Component
{
    static show = (msg, isSuccess) =>
    {
        const root = document.getElementById('root');
        const node = document.createElement('div');
        node.className = style.alertWrapper;
        const wrapper = root.appendChild(node);
        ReactDOM.render(<Alert msg={msg}
                               isSuccess={isSuccess}/>, wrapper);

        setTimeout(() =>
        {
            ReactDOM.unmountComponentAtNode(wrapper);
            root.removeChild(node);

        }, 1500);
    };

    render()
    {
        const {msg, isSuccess} = this.props;
        return (
            <div className={`${style.Alert} ${style[`alert-${isSuccess ? 'success' : 'danger'}`]}`}>
                {msg}
            </div>
        );
    }
}

Alert.propTypes = {
    msg: PropTypes.string.isRequired,
    isSuccess: PropTypes.bool.isRequired
};

export default Alert;
