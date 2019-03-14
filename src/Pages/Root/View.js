import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import Style from './Root.module.scss';
import {View as Menu} from './Components/Menu';
import {setActiveItemId} from './Components/Menu/Functions';
import Title from './Components/Title/View';
import {ITEM_ID_TO_ICON, ITEM_ID_TO_NAME, ITEM_URL_TO_ID} from '../../Config/MENU_ITEM';
import {Function as SpinnerFunction} from '../../Components/Bootstrap/GrowingSpinner';
import {View as LogoutModal} from './Components/LogoutModal';
import {MODAL_ID} from '../../Config';

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
            <div className={Style.Root} key={Style.Root}>
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
            </div>,
            <LogoutModal key={MODAL_ID.LOGOUT_MODAL} />,
        ];
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
