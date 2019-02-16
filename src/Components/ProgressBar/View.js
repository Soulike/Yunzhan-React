import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';

class ProgressBar extends Component
{
    render()
    {
        const {className, percentProgress} = this.props;
        return (
            <div className={`progress ${Style.ProgressBar}`}>
                <div className={`progress-bar progress-bar-striped progress-bar-animated ${className}`}
                     role="progressbar"
                     aria-valuenow={percentProgress}
                     aria-valuemin="0"
                     aria-valuemax="100"
                     style={{width: percentProgress / 100}}>{percentProgress}%
                </div>
            </div>
        );
    }
}

ProgressBar.propTypes = {
    percentProgress: PropTypes.number.isRequired,
    className: PropTypes.string,
};

export default ProgressBar;