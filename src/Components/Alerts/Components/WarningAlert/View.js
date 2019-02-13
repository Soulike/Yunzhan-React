import React, {Component} from 'react';
import Style from './Style.module.scss';
import {popAlert} from '../../Functions';

class WarningAlert extends Component
{
    static pop(content, durationMilliseconds)
    {
        popAlert(<WarningAlert>{content}</WarningAlert>, durationMilliseconds);
    }

    render()
    {
        const {className} = this.props;
        return (
            <div className={`${Style.WarningAlert} ${className}`}>
                <div className="alert alert-warning" role="alert">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default WarningAlert;