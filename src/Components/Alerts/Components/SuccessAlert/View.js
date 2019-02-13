import React, {Component} from 'react';
import Style from './Style.module.scss';
import {popAlert} from '../../Functions';

class SuccessAlert extends Component
{
    static pop(content, durationMilliseconds)
    {
        popAlert(<SuccessAlert>{content}</SuccessAlert>, durationMilliseconds);
    }

    render()
    {
        const {className} = this.props;
        return (
            <div className={`${Style.SuccessAlert} ${className}`}>
                <div className="alert alert-success" role="alert">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default SuccessAlert;