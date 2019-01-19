import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './Screen.module.scss';
import Store from '../../../../../../Store';
import * as Actions from '../../Actions/Actions';
import {connect} from 'react-redux';
import {View as Modal} from '../../../../../../Components/Modal';
import {View as Alert} from '../../../../../../Components/Alert';
import {View as ResourcePackList} from '../ResourcePackList';
import NAMESPACE from '../../../../../../Namespace';
import RequestProcessors from '../../../../../../RequestProcessors';

class Screen extends Component
{
    constructor()
    {
        super(...arguments);
        const {[NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: screenId} = this.props;
        this.state = {
            [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN]: [screenId]
        };
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: id,
            selectedScreenIdSet
        } = this.props;
        const $checkbox = document.querySelector(`#_${id}`);
        $checkbox.checked = selectedScreenIdSet.has(id);
    }

    onNameWrapperClick = e =>
    {
        e.preventDefault();
        this.dispatchCheckboxSwitchAction();
        const {
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: id
        } = this.props;
        const $checkbox = document.querySelector(`#_${id}`);
        $checkbox.checked = !$checkbox.checked;
    };

    onCheckboxLabelClick = e =>
    {
        this.onNameWrapperClick(e);
    };

    dispatchCheckboxSwitchAction = () =>
    {
        const {
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: id
        } = this.props;
        const $checkbox = document.querySelector(`#_${id}`);

        if ($checkbox.checked)
        {
            Store.dispatch(Actions.unselectScreen(id));
        }
        else
        {
            Store.dispatch(Actions.selectScreen(id));
        }
    };

    onBindResourcePackButtonClick = e =>
    {
        e.preventDefault();
        Modal.show('绑定资源包', (<ResourcePackList/>), () =>
        {
            const {selectedResourcePackId} = this.props;
            if (selectedResourcePackId === null)
            {
                Alert.show('请选择资源包', false);
            }
            else
            {
                RequestProcessors.sendPostBindResourcePackRequest.apply(this);
            }
        });
    };

    onUnbindResourcePackButtonClick = e =>
    {
        e.preventDefault();
        const {
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.NAME]: name,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_NAME]: resourcePackName
        } = this.props;
        Modal.show('解绑资源包',
            (<span>确认要为屏幕 <span style={{color: '#F00'}}>{name}</span> 解绑资源包 <span
                style={{color: '#F00'}}>{resourcePackName}</span>？</span>),
            () =>
            {
                RequestProcessors.sendPostUnbindResourcePackRequest.apply(this);
            });
    };

    render()
    {
        const {
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: id,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: uuid,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.NAME]: name,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.IS_RUNNING]: isRunning,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_ID]: resourcePackId,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_NAME]: resourcePackName
        } = this.props;
        return (
            <div className={style.Screen}>
                <input type="checkbox" className={style.checkbox} id={`_${id}`}/>
                <label htmlFor={`_${id}`} className={style.checkboxLabel} onClick={this.onCheckboxLabelClick}/>
                <div className={style.nameWrapper} onClick={this.onNameWrapperClick}>
                    <div className={style.name}>{name}</div>
                    <div className={style.uuid}>{uuid}</div>
                </div>
                <div className={`${style.isRunningInfo} ${isRunning ? style.isRunning : null}`}>
                    <span className={`${style.isRunningInfoDot} ${isRunning ? style.isRunning : null}`}/>
                    <span className={`${style.isRunningInfoText} ${isRunning ? style.isRunning : null}`}>
                        {isRunning ? '运行中' : '未运行'}
                    </span>
                </div>
                <div className={style.resourcePackName}>{resourcePackName}</div>
                <div className={style.buttonWrapper}>
                    {resourcePackId === undefined ?
                        <button className={style.bindResourcePackButton}
                                onClick={this.onBindResourcePackButtonClick}>绑定资源包</button> :
                        <button className={style.unbindResourcePackButton}
                                onClick={this.onUnbindResourcePackButtonClick}>解绑资源包</button>}
                </div>
            </div>
        );
    }
}

Screen.propTypes = {
    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: PropTypes.number.isRequired,
    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: PropTypes.string.isRequired,
    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.NAME]: PropTypes.string.isRequired,
    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.IS_RUNNING]: PropTypes.bool.isRequired,
    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_ID]: PropTypes.number,
    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_NAME]: PropTypes.string
};

const mapStateToProps = state =>
{
    const {selectedScreenIdSet} = state.ScreenListCard;
    const {selectedResourcePackId} = state.ScreenManagementResourcePackList;
    return {
        selectedScreenIdSet,
        selectedResourcePackId
    };
};

export default connect(mapStateToProps)(Screen);
