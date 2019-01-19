import React, {Component} from 'react';
import style from './ScreenListCard.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {View as Card} from '../../../../Components/Card';
import {View as Screen} from './Components/Screen';
import {View as Header} from './Components/Header';
import * as Actions from './Actions/Actions';
import Store from '../../../../Store';
import {connect} from 'react-redux';
import {View as Modal} from '../../../../Components/Modal';
import Functions from '../../../../Functions';
import REGEX from '../../../../Static/Regex';
import {View as Alert} from '../../../../Components/Alert';
import {STATUS_CODE} from '../../../../Static/Constants';
import {refreshScreenList} from './Functions';
import {redirectToLogin} from '../../../Login/Functions';
import {View as ResourcePackList} from './Components/ResourcePackList';
import NAMESPACE from '../../../../Namespace';
import RequestProcessors from '../../../../RequestProcessors';

const {postAsync, requestPrefix} = Functions;

class ScreenListCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: ''
        };
    }


    componentDidMount()
    {
        Store.dispatch(Actions.getScreenList());
    }

    onAddScreenButtonClick = e =>
    {
        e.preventDefault();
        Modal.show('添加屏幕',
            (<div className={style.addScreenModalContent}>
                <input type="text"
                       className={style.uuidInput}
                       placeholder={'被添加屏幕的 UUID'}
                       autoFocus={true}
                       onChange={this.onAddScreenModalInputChange}/>
            </div>),
            () =>
            {
                const {[NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: uuid} = this.state;
                if (!REGEX.UUID.test(uuid))
                {
                    Alert.show('UUID 对应的屏幕不存在', false);
                }
                else
                {
                    RequestProcessors.sendPostAddScreenRequest.apply(this);
                }
            });
    };

    onAddScreenModalInputChange = e =>
    {
        this.setState({[NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: e.target.value});
    };

    onDeleteScreenButtonClick = e =>
    {
        e.preventDefault();
        const {selectedScreenIdSet} = this.props;
        if (selectedScreenIdSet.size === 0)
        {
            Alert.show('未选中任何屏幕', false);
        }
        else
        {
            Modal.show('删除屏幕', (
                    <span>确认删除选中的 {selectedScreenIdSet.size} 个屏幕吗？<span style={{color: '#F00'}}>此操作不可逆！</span></span>),
                () =>
                {
                    RequestProcessors.sendPostDeleteScreenRequest.apply(this);
                }
            );
        }
    };

    onStartRunningButtonClick = e =>
    {
        e.preventDefault();
        const {selectedScreenIdSet} = this.props;
        if (selectedScreenIdSet.size === 0)
        {
            Alert.show('未选中任何屏幕', false);
        }
        else
        {
            Modal.show('开始播放', (
                    <span>确认使选中的 {selectedScreenIdSet.size} 个屏幕开始播放吗？</span>),
                () =>
                {
                    RequestProcessors.sendPostStartScreenRequest.apply(this);
                }
            );
        }
    };

    onStopRunningButtonClick = e =>
    {
        e.preventDefault();
        const {selectedScreenIdSet} = this.props;
        if (selectedScreenIdSet.size === 0)
        {
            Alert.show('未选中任何屏幕', false);
        }
        else
        {
            Modal.show('停止播放', (
                    <span>确认使选中的 {selectedScreenIdSet.size} 个屏幕停止播放吗？</span>),
                () =>
                {
                    RequestProcessors.sendPostStopScreenRequest.apply(this);
                }
            );
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
                    RequestProcessors.sendBindResourcePackRequest.apply(this);
                }
            }
        );
    };

    onUnbindResourcePacksButtonClick = e =>
    {
        e.preventDefault();
        const {selectedScreenIdSet} = this.props;
        if (selectedScreenIdSet.size === 0)
        {
            Alert.show('未选中任何屏幕', false);
        }
        else
        {
            Modal.show('解绑资源包',
                (<span>确认要为选中的 {selectedScreenIdSet.size} 个屏幕解绑资源包吗？</span>),
                () =>
                {
                    postAsync(requestPrefix('/admin/screenManagement/unbindResourcePacks'), Array.from(selectedScreenIdSet.keys()))
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

    render()
    {
        const {[NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN]: screenList} = this.props;

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
                        <button className={style.bindResourcePackButton} title={'批量绑定资源包'}
                                onClick={this.onBindResourcePackButtonClick}>
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
    const {[NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN]: screenList, selectedScreenIdSet} = state.ScreenListCard;
    const {selectedResourcePackId} = state.ScreenManagementResourcePackList;
    return {
        [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN]: screenList,
        selectedScreenIdSet,
        selectedResourcePackId
    };
};

export default connect(mapStateToProps)(ScreenListCard);
