import React, {Component} from 'react';
import style from './ScreenListCard.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {View as Card} from '../../../../Components/Card';
import Screen from './Components/Screen/View';
import {View as Header} from './Components/Header';
import * as Actions from './Actions/Actions';
import Store from '../../../../Store';
import {connect} from 'react-redux';
import {View as Modal} from '../../../../Components/Modal';
import {postAsync, requestPrefix} from '../../../../Static/Functions';
import REGEX from '../../../../Static/Regex';
import Alert from '../../../../Components/Alert/View';
import {STATUS_CODE} from '../../../../Static/Constants';
import {refreshScreenList} from './Functions';
import {redirectToLogin} from '../../../Login/Functions';

class ScreenListCard extends Component
{
    componentDidMount()
    {
        Store.dispatch(Actions.getScreenList());
    }

    onAddScreenButtonClick = e =>
    {
        e.preventDefault();
        Modal.show('添加屏幕',
            (<div className={style.addScreenModalContent}>
                <input type="text" className={style.uuidInput} placeholder={'被添加屏幕的 UUID'} autoFocus={true}/>
            </div>),
            () =>
            {
                const $input = document.querySelector(`.${style.uuidInput}`);
                const uuid = $input.value;
                if (!REGEX.UUID.test(uuid))
                {
                    Alert.show('UUID 对应的屏幕不存在', false);
                }
                else
                {
                    postAsync('/admin/screenManagement/addScreen', {uuid})
                        .then(res =>
                        {
                            const {code} = res;
                            if (code === STATUS_CODE.SUCCESS)
                            {
                                Alert.show('添加成功', true);
                                refreshScreenList();
                            }
                            else if (code === STATUS_CODE.WRONG_PARAMETER)
                            {
                                Alert.show('参数无效', false);
                            }
                            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
                            {
                                Alert.show('UUID 对应的屏幕不存在', false);
                            }
                            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
                            {
                                Alert.show('服务器错误', false);
                            }
                        })
                        .catch(e =>
                        {
                            Alert.show('添加失败', false);
                            console.log(e);
                        });
                }
            });
    };

    onDeleteScreenButtonClick = e =>
    {
        e.preventDefault();
        const {selectedScreenSet} = this.props;
        if (selectedScreenSet.size === 0)
        {
            Alert.show('未选中任何屏幕', false);
        }
        else
        {
            Modal.show('删除屏幕', (
                    <span>确认删除选中的 {selectedScreenSet.size} 个屏幕吗？<span style={{color: '#F00'}}>此操作不可逆！</span></span>),
                () =>
                {
                    postAsync('/admin/screenManagement/deleteScreens', Array.from(selectedScreenSet.keys()))
                        .then(res =>
                        {
                            const {code} = res;
                            if (code === STATUS_CODE.SUCCESS)
                            {
                                Alert.show('删除成功', true);
                                refreshScreenList();
                            }
                            else if (code === STATUS_CODE.REJECTION)
                            {
                                Alert.show('不能删除他人屏幕', false);
                                refreshScreenList();
                            }
                            else if (code === STATUS_CODE.INVALID_SESSION)
                            {
                                Alert.show('请先登录', false);
                                redirectToLogin();
                            }
                            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
                            {
                                Alert.show('被删除屏幕不存在', false);
                                refreshScreenList();
                            }
                            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
                            {
                                Alert.show('服务器错误', false);
                            }
                        })
                        .catch(e =>
                        {
                            Alert.show('删除失败', false);
                            console.log(e);
                        });
                }
            );
        }
    };

    onStartRunningButtonClick = e =>
    {
        e.preventDefault();
        const {selectedScreenSet} = this.props;
        if (selectedScreenSet.size === 0)
        {
            Alert.show('未选中任何屏幕', false);
        }
        else
        {
            Modal.show('开始播放', (
                    <span>确认使选中的 {selectedScreenSet.size} 个屏幕开始播放吗？</span>),
                () =>
                {
                    postAsync('/admin/screenManagement/startScreens', Array.from(selectedScreenSet.keys()))
                        .then(res =>
                        {
                            const {code} = res;
                            if (code === STATUS_CODE.SUCCESS)
                            {
                                Alert.show('全部开始播放成功', true);
                                refreshScreenList();
                            }
                            else if (code === STATUS_CODE.REJECTION)
                            {
                                Alert.show('部分开始播放失败，请确认所有屏幕上 APP 处于运行状态', false);
                                refreshScreenList();
                            }
                            else if (code === STATUS_CODE.INVALID_SESSION)
                            {
                                Alert.show('请先登录', false);
                                redirectToLogin();
                            }
                            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
                            {
                                Alert.show('部分开始播放屏幕不存在', false);
                                refreshScreenList();
                            }
                            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
                            {
                                Alert.show('服务器错误', false);
                            }
                        })
                        .catch(e =>
                        {
                            Alert.show('开始播放失败', false);
                            console.log(e);
                        });
                }
            );
        }
    };

    onStopRunningButtonClick = e =>
    {
        e.preventDefault();
        e.preventDefault();
        const {selectedScreenSet} = this.props;
        if (selectedScreenSet.size === 0)
        {
            Alert.show('未选中任何屏幕', false);
        }
        else
        {
            Modal.show('停止播放', (
                    <span>确认使选中的 {selectedScreenSet.size} 个屏幕停止播放吗？</span>),
                () =>
                {
                    postAsync('/admin/screenManagement/stopScreens', Array.from(selectedScreenSet.keys()))
                        .then(res =>
                        {
                            const {code} = res;
                            if (code === STATUS_CODE.SUCCESS)
                            {
                                Alert.show('全部停止播放成功', true);
                                refreshScreenList();
                            }
                            else if (code === STATUS_CODE.REJECTION)
                            {
                                Alert.show('部分停止播放失败，请确认所有屏幕的网络状态', false);
                                refreshScreenList();
                            }
                            else if (code === STATUS_CODE.INVALID_SESSION)
                            {
                                Alert.show('请先登录', false);
                                redirectToLogin();
                            }
                            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
                            {
                                Alert.show('部分停止播放屏幕不存在', false);
                                refreshScreenList();
                            }
                            else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
                            {
                                Alert.show('服务器错误', false);
                            }
                        })
                        .catch(e =>
                        {
                            Alert.show('停止播放失败', false);
                            console.log(e);
                        });
                }
            );
        }
    };

    onUnbindResourcePacksButtonClick = e =>
    {
        e.preventDefault();
        const {selectedScreenSet} = this.props;
        if (selectedScreenSet.size === 0)
        {
            Alert.show('未选中任何屏幕', false);
        }
        else
        {
            Modal.show('解绑资源包',
                (<span>确认要为选中的 {selectedScreenSet.size} 个屏幕解绑资源包吗？</span>),
                () =>
                {
                    postAsync(requestPrefix('/admin/screenManagement/unbindResourcePacks'), Array.from(selectedScreenSet.keys()))
                        .then(res =>
                        {
                            const {code} = res;
                            if (code === STATUS_CODE.SUCCESS)
                            {
                                Alert.show('全部解绑成功', true);
                                refreshScreenList();
                            }
                            else if (code === STATUS_CODE.INVALID_SESSION)
                            {
                                Alert.show('请先登录', false);
                                redirectToLogin();
                            }
                            else if (code === STATUS_CODE.CONTENT_NOT_FOUND)
                            {
                                Alert.show('部分屏幕不存在', false);
                                refreshScreenList();
                            }
                            else if (code === STATUS_CODE.REJECTION)
                            {
                                Alert.show('你无权解绑部分屏幕的资源包', false);
                                refreshScreenList();
                            }
                        })
                        .catch(e =>
                        {
                            Alert.show('解绑失败', false);
                            console.log(e);
                        });
                });
        }
    };


    // TODO: 批量绑定资源包
    render()
    {
        const {screenList} = this.props;

        const screenIdSet = new Set();
        screenList.forEach(screen =>
        {
            screenIdSet.add(screen.id);
        });

        return (
            <div className={style.ScreenListCard}>

                <Card title={'屏幕列表'}>
                    <div className={style.headerWrapper}><Header screenIdSet={screenIdSet}/></div>
                    <div className={style.screenListWrapper}>
                        {screenList.map(screen =>
                        {
                            return <Screen {...screen} key={screen.id}/>;
                        })}
                    </div>
                    <div className={style.buttonWrapper}>
                        <button className={style.addScreenButton} title={'添加屏幕'} onClick={this.onAddScreenButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faPlus}/>
                        </button>
                        <button className={style.deleteScreenButton} title={'删除屏幕'}
                                onClick={this.onDeleteScreenButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faTrash}/>
                        </button>
                        <button className={style.startRunningButton} title={'开始播放'}
                                onClick={this.onStartRunningButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faPlay}/>
                        </button>
                        <button className={style.stopRunningButton} title={'停止播放'}
                                onClick={this.onStopRunningButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faPowerOff}/>
                        </button>
                        <button className={style.bindResourcePackButton} title={'批量绑定资源包'}>
                            <FontAwesomeIcon icon={solidIcon.faFileArchive}/>
                        </button>
                        <button className={style.unbindResourcePackButton} title={'批量解绑资源包'}
                                onClick={this.onUnbindResourcePacksButtonClick}>
                            <FontAwesomeIcon icon={solidIcon.faTrashAlt}/>
                        </button>
                    </div>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = state =>
{
    const {screenList, selectedScreenSet} = state.ScreenListCard;
    return {
        screenList,
        selectedScreenSet
    };
};

export default connect(mapStateToProps)(ScreenListCard);