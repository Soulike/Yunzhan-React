import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './Header.module.scss';
import Function from '../../../../../../Function';
import {connect} from 'react-redux';
import {View as Checkbox} from '../../../../../../Components/Checkbox';
import {selectScreens, unselectAllScreens} from '../../../../Function';

class Header extends Component
{
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {selectedScreenIdSet, allScreenIdSet} = this.props;
        const $input = document.getElementById('_0');
        const isEqual = Function.setsEqual(selectedScreenIdSet, allScreenIdSet);
        if (($input.checked && !isEqual) || allScreenIdSet.size === 0)
        {
            $input.checked = false;
        }
        else if (!$input.checked && isEqual)
        {
            $input.checked = true;
        }
    }

    onCheckboxClick = e =>
    {
        e.preventDefault();
        const $input = document.getElementById('_0');
        if ($input.checked)
        {
            unselectAllScreens();
        }
        else
        {
            const {allScreenIdSet} = this.props;
            selectScreens([...allScreenIdSet]);
        }

        $input.checked = !$input.checked;
    };

    render()
    {
        return (
            <div className={style.Header}>
                <Checkbox id={'_0'} onClick={this.onCheckboxClick} />
                <div className={style.name}>屏幕名</div>
                <div className={style.runningInfo}>状态</div>
                <div className={style.resourcePackName}>资源包</div>
                <div className={style.button} />
            </div>
        );
    }
}

Header.propTypes = {
    allScreenIdSet: PropTypes.object.isRequired,
};

const mapStateToProps = state =>
{
    const {ScreenManagement: {selectedScreenIdSet}} = state;
    return {
        selectedScreenIdSet,
    };
};

export default connect(mapStateToProps)(Header);
