import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Function from '../../Function';
import $ from 'jquery';
import Style from './Style.module.scss';

class ToolTip extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            id: `tooltip_${Function.randomString()}`,
        };
    }


    componentDidMount()
    {
        const {id} = this.state;
        $(`#${id}`).tooltip();
    }

    render()
    {
        const {placement, title, children, className} = this.props;
        const {id} = this.state;
        return (
            <div className={`${Style.Tooltip} ${className}`}
                 id={id}
                 data-toggle="tooltip"
                 data-placement={placement}
                 title={title}>
                {children}
            </div>
        );
    }
}

ToolTip.propTypes = {
    placement: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default ToolTip;