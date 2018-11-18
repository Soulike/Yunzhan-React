import React, {Component} from 'react';
import style from './Root.module.scss';

class Root extends Component
{
    render()
    {
        return (
            <div className={style.Root}>
                {this.props.children}
            </div>
        );
    }
}

export default Root;
