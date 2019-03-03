import React, {Component} from 'react';
import Style from './Style.module.scss';

class GrowingSpinner extends Component
{
    render()
    {
        return (
            <div className={`spinner-grow text-primary ${Style.GrowingSpinner}`} role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }
}

export default GrowingSpinner;
