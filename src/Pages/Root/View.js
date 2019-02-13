import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router';
import style from './Root.module.scss';
import {View as Menu} from './Components/Menu';
import {getItemId, setActiveItemId} from './Components/Menu/Functions';
import RequestProcessors from '../../RequestProcessors';
import {Modal} from '../../Components/Modal';
import {MODAL_ID} from '../../Static/Constants';

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
                            <FontAwesomeIcon icon={solidIcon.faDove} className={style.icon} />
                        </Link>
                    </div>
                    <div className={style.menuWrapper}>
                        <Menu />
                    </div>
                </div>
                <div className={style.page}>
                    {this.props.children}
                </div>

                <Modal id={MODAL_ID.LOGOUT_MODAL}
                       title={'确认退出'}
                       onConfirmButtonClickFunction={RequestProcessors.sendPostLogoutRequest}>
                    您真的要退出云展吗？
                </Modal>
            </div>
        );
    }
}

export default Root;
