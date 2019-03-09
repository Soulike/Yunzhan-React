import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import Style from './Root.module.scss';
import {View as Menu} from './Components/Menu';
import {setActiveItemId} from './Components/Menu/Functions';
import RequestProcessor from '../../RequestProcessor';
import {SmallModal} from '../../Components/Modal';
import {MODAL_ID} from '../../Config';
import Title from './Components/Title/View';
import {ITEM_ID_TO_ICON, ITEM_ID_TO_NAME, ITEM_URL_TO_ID} from '../../Config/MENU_ITEM';
import {Function as SpinnerFunction} from '../../Components/GrowingSpinner';

class Root extends Component
{
    constructor(props)
    {
        super(props);
        SpinnerFunction.addSpinner();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (prevProps.children !== this.props.children)
        {
            const activeItemId = ITEM_URL_TO_ID[this.props.location.pathname];
            setActiveItemId(activeItemId);
        }
    }


    render()
    {
        const {currentActiveItemId} = this.props;
        return (
            <div className={Style.Root}>
                <div className={Style.titleWrapper}>
                    <Title icon={ITEM_ID_TO_ICON[currentActiveItemId]} text={ITEM_ID_TO_NAME[currentActiveItemId]} />
                </div>
                <div className={Style.sidebar}>
                    <div className={Style.iconWrapper}>
                        <Link to={'/'}>
                            <FontAwesomeIcon icon={solidIcon.faDove} className={Style.icon} />
                        </Link>
                    </div>
                    <div className={Style.menuWrapper}>
                        <Menu />
                    </div>
                </div>
                <div className={Style.pageWrapper}>
                    {this.props.children}
                </div>

                <SmallModal id={MODAL_ID.LOGOUT_MODAL}
                            title={'确认退出'}
                            onConfirmButtonClickFunction={RequestProcessor.sendPostLogoutRequestAsync}>
                    您真的要退出云展吗？
                </SmallModal>
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    const {currentActiveItemId} = state.RootMenu;
    return {
        currentActiveItemId,
    };
};

export default connect(mapStateToProps)(Root);
