import React, {Component} from 'react';
import style from './ScreenListCard.module.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {View as Card} from '../../../../Components/Card';
import Screen from './Components/Screen/View';
import {getAsync, requestPrefix} from '../../../../Static/Functions';
import {STATUS_CODE} from '../../../../Static/Constants';
import {View as Alert} from '../../../../Components/Alert';
import {redirectToLogin} from '../../../Login/Functions';
import {View as Header} from './Components/Header';

class ScreenListCard extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            screenList: [
                {
                    id: 1,
                    uuid: 'aaaa',
                    name: 'afafafeafaef',
                    isRunning: true,
                    resourcePackId: 1,
                    resourcePackName: 'xxx'
                },
                {
                    id: 2,
                    uuid: 'aaaa',
                    name: 'afafafeafaef',
                    isRunning: true,
                    resourcePackId: 1,
                    resourcePackName: 'xxx'
                },
                {
                    id: 3,
                    uuid: 'aaaa',
                    name: 'afafafeafaef',
                    isRunning: true,
                    resourcePackId: 1,
                    resourcePackName: 'xxx'
                },
                {
                    id: 4,
                    uuid: 'aaaa',
                    name: 'afafafeafaef',
                    isRunning: false
                },
                {
                    id: 5,
                    uuid: 'aaaa',
                    name: 'afafafeafaef',
                    isRunning: false
                },
                {
                    id: 6,
                    uuid: 'aaaa',
                    name: 'afafafeafaef',
                    isRunning: false
                },
                {
                    id: 7,
                    uuid: 'aaaa',
                    name: 'afafafeafaef',
                    isRunning: false
                },
                {
                    id: 8,
                    uuid: 'aaaa',
                    name: 'afafafeafaef',
                    isRunning: false
                },
                {
                    id: 9,
                    uuid: 'aaaa',
                    name: 'afafafeafaef',
                    isRunning: false
                },
            ]
        };
    }

    componentDidMount()
    {
        getAsync(requestPrefix('/admin/screenManagement/getScreenList'), false)
            .then(res =>
            {
                const {code, data} = res;
                if (code === STATUS_CODE.SUCCESS)
                {
                    this.setState({screenList: data});
                }
                else if (code === STATUS_CODE.INVALID_SESSION)
                {
                    Alert.show('请先登录', false);
                    redirectToLogin();
                }
                else if (code === STATUS_CODE.INTERNAL_SERVER_ERROR)
                {
                    Alert.show('服务器错误', false);
                }
            })
            .catch(e =>
            {
                Alert.show('获取屏幕列表失败', false);
                console.log(e);
            });
    }


    render()
    {
        const {screenList} = this.state;
        return (
            <div className={style.ScreenListCard}>

                <Card title={'屏幕列表'}>
                    <div className={style.headerWrapper}><Header/></div>
                    <div className={style.screenListWrapper}>
                        {screenList.map(screen =>
                        {
                            return <Screen {...screen} key={screen.id}/>;
                        })}
                    </div>
                    <div className={style.buttonWrapper}>
                        <button className={style.addScreenButton} title={'添加屏幕'}>
                            <FontAwesomeIcon icon={solidIcon.faPlus}/>
                        </button>
                        <button className={style.deleteScreenButton} title={'删除屏幕'}>
                            <FontAwesomeIcon icon={solidIcon.faTrash}/>
                        </button>
                        <button className={style.startRunningButton} title={'开始播放'}>
                            <FontAwesomeIcon icon={solidIcon.faPlay}/>
                        </button>
                        <button className={style.stopRunningButton} title={'停止播放'}>
                            <FontAwesomeIcon icon={solidIcon.faPowerOff}/>
                        </button>
                        <button className={style.bindResourcePackButton} title={'批量绑定资源包'}>
                            <FontAwesomeIcon icon={solidIcon.faFileArchive}/>
                        </button>
                        <button className={style.unbindResourcePackButton} title={'批量解绑资源包'}>
                            <FontAwesomeIcon icon={solidIcon.faTrashAlt}/>
                        </button>
                    </div>
                </Card>
            </div>
        );
    }
}

export default ScreenListCard;