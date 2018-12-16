import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router';
import style from './Root.module.scss';
import {View as Menu} from './Components/Menu';
import {getItemId, setActiveItemId} from './Components/Menu/Functions';

class Root extends Component
{
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (prevProps.children !== this.props.children)
        {
            setActiveItemId(getItemId(this.props.location.pathname));
        }
    }


    render()
    {
        return (
            <div className={style.Root}>
                <div className={style.sidebar}>
                    <div className={style.iconWrapper}>
                        <Link to={'/'}>
                            <FontAwesomeIcon icon={solidIcon.faDove} className={style.icon}/>
                        </Link>
                    </div>
                    <div className={style.menuWrapper}>
                        <Menu/>
                    </div>
                </div>
                <div className={style.page}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Root;
