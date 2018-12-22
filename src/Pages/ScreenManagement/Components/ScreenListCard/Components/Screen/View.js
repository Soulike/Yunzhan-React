import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './Screen.module.scss';
import Store from '../../../../../../Store';
import * as Actions from '../../Actions/Actions';
import {connect} from 'react-redux';
import {View as Modal} from '../../../../../../Components/Modal';
import {postAsync, requestPrefix} from '../../../../../../Static/Functions';
import {STATUS_CODE} from '../../../../../../Static/Constants';
import {View as Alert} from '../../../../../../Components/Alert';
import {refreshScreenList} from '../../Functions';
import {redirectToLogin} from '../../../../../Login/Functions';

class Screen extends Component
{
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {id, selectedScreenSet} = this.props;
        const $checkbox = document.querySelector(`#_${id}`);
        $checkbox.checked = selectedScreenSet.has(id);
    }

    onNameWrapperClick = e =>
    {
        e.preventDefault();
        this.dispatchCheckboxSwitchAction();
        const {id} = this.props;
        const $checkbox = document.querySelector(`#_${id}`);
        $checkbox.checked = !$checkbox.checked;
    };

    onCheckboxLabelClick = e =>
    {
        this.onNameWrapperClick(e);
    };

    dispatchCheckboxSwitchAction = () =>
    {
        const {id} = this.props;
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

    onUnbindResourcePackButtonClick = e =>
    {
        e.preventDefault();
        const {id, name, resourcePackName} = this.props;
        Modal.show('解绑资源包',
            (<span>确认要为屏幕 <span style={{color: '#F00'}}>{name}</span> 解绑资源包 <span
                style={{color: '#F00'}}>{resourcePackName}</span>？</span>),
            () =>
            {
                postAsync(requestPrefix('/admin/screenManagement/unbindResourcePacks'), [id])
                    .then(res =>
                    {
                        const {code} = res;
                        if (code === STATUS_CODE.SUCCESS)
                        {
                            Alert.show('解绑成功', true);
                            refreshScreenList();
                        }
                        else if (code === STATUS_CODE.INVALID_SESSION)
                        {
                            Alert.show('请先登录', false);
                            redirectToLogin();
                        }
                        else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
                        {
                            Alert.show('屏幕不存在', false);
                            refreshScreenList();
                        }
                        else if (code === STATUS_CODE.REJECTION)
                        {
                            Alert.show('你无权解绑该屏幕的资源包', false);
                            refreshScreenList();
                        }
                    })
                    .catch(e =>
                    {
                        Alert.show('解绑失败', false);
                        console.log(e);
                    });
            });
    };

    //TODO: 绑定资源包模态框

    render()
    {
        const {id, uuid, name, isRunning, resourcePackId, resourcePackName} = this.props;
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
                        <button className={style.bindResourcePackButton}>绑定资源包</button> :
                        <button className={style.unbindResourcePackButton}
                                onClick={this.onUnbindResourcePackButtonClick}>解绑资源包</button>}
                </div>
            </div>
        );
    }
}

Screen.propTypes = {
    id: PropTypes.number.isRequired,
    uuid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    isRunning: PropTypes.bool.isRequired,
    resourcePackId: PropTypes.number,
    resourcePackName: PropTypes.string
};

const mapStateToProps = state =>
{
    const {selectedScreenSet} = state.ScreenListCard;
    return {
        selectedScreenSet
    };
};

export default connect(mapStateToProps)(Screen);