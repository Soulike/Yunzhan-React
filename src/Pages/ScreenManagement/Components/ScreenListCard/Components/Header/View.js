import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as Actions from '../../Actions/Actions';
import style from './Header.module.scss';
import Store from '../../../../../../Store';
import {setsEqual} from '../../../../../../Static/Functions';
import {connect} from 'react-redux';

class Header extends Component
{
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {selectedScreenSet, screenIdSet} = this.props;
        const $input = document.querySelector(`#_0`);
        const isEqual = setsEqual(selectedScreenSet, screenIdSet);
        if ($input.checked && !isEqual)
        {
            $input.checked = false;
        }
        else if (!$input.checked && isEqual)
        {
            $input.checked = true;
        }
    }

    onInputLabelClick = e =>
    {
        e.preventDefault();
        const $input = document.querySelector(`#_0`);
        if ($input.checked)
        {
            Store.dispatch(Actions.unselectAllScreens());
        }
        else
        {
            const {screenIdSet} = this.props;
            Store.dispatch(Actions.selectAllScreens(screenIdSet));
        }

        $input.checked = !$input.checked;
    };

    render()
    {
        return (
            <div className={style.Header}>
                <input type="checkbox" id={'_0'} className={style.checkbox}/>
                <label htmlFor="_0" className={style.checkboxLabel} title={'全选'} onClick={this.onInputLabelClick}/>
                <div className={style.name}>屏幕名</div>
                <div className={style.runningInfo}>状态</div>
                <div className={style.resourcePackName}>资源包</div>
                <div className={style.button}/>
            </div>
        );
    }
}

Header.propTypes = {
    screenIdSet: PropTypes.object.isRequired
};

const mapStateToProps = state =>
{
    const {selectedScreenSet} = state.ScreenListCard;
    return {
        selectedScreenSet
    };
};

export default connect(mapStateToProps)(Header);