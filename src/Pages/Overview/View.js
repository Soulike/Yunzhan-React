import React, {Component} from 'react';
import {Link} from 'react-router';
import Style from './Overview.module.scss';
import {Functions as MenuFunctions} from '../Root/Components/Menu';
import {View as Card} from '../../Components/Card';
import Functions from '../../Function';
import RequestProcessor from '../../RequestProcessor';
import NAMESPACE from '../../Namespace';
import {MENU_ITEM_ID} from '../../Config/MENU_ITEM';


const {generateTimeStr} = Functions;

class Overview extends Component
{
    constructor()
    {
        super(...arguments);
        const date = new Date();
        this.state = {
            [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: 'example@example.com',
            [NAMESPACE.OVERVIEW.LOGIN_INFO.LAST_LOGIN_IP]: '0.0.0.0',
            [NAMESPACE.OVERVIEW.LOGIN_INFO.CURRENT_LOGIN_IP]: '0.0.0.0',
            [NAMESPACE.OVERVIEW.LOGIN_INFO.LAST_LOGIN_TIME]: date.toISOString(),
            [NAMESPACE.OVERVIEW.SCREEN_INFO.CURRENT_SCREEN_AMOUNT]: 0,
            [NAMESPACE.OVERVIEW.SCREEN_INFO.RUNNING_SCREEN_AMOUNT]: 0,
            [NAMESPACE.OVERVIEW.ADVERTISEMENT_INFO.CURRENT_ADVERTISEMENT_AMOUNT]: 0,
            [NAMESPACE.OVERVIEW.ADVERTISEMENT_INFO.CURRENT_IMAGE_AMOUNT]: 0,
            [NAMESPACE.OVERVIEW.ADVERTISEMENT_INFO.ADVERTISEMENT_FILE_SIZE]: 0,
            [NAMESPACE.OVERVIEW.RESOURCE_PACK_INFO.CURRENT_RESOURCE_PACK_AMOUNT]: 0,
            [NAMESPACE.OVERVIEW.RESOURCE_PACK_INFO.CURRENT_RESOURCE_PACK_IN_USING_AMOUNT]: 0,
            [NAMESPACE.OVERVIEW.TAG_INFO.CURRENT_TAG_AMOUNT]: 0,
        };
    }

    componentDidMount()
    {
        document.title = '概览 - 云展';
        MenuFunctions.setActiveItemId(MENU_ITEM_ID.OVERVIEW);
        Promise.all([
            RequestProcessor.sendOverviewGetLoginInfoRequestAsync(),
            RequestProcessor.sendOverviewGetScreenInfoRequestAsync(),
            RequestProcessor.sendOverviewGetAdvertisementInfoRequestAsync(),
            RequestProcessor.sendOverviewGetResourcePackInfoRequestAsync(),
            RequestProcessor.sendOverviewGetTagInfoRequestAsync(),
        ])
            .then(dataArray =>
            {
                dataArray.forEach(data =>
                {
                    this.setState({...data});
                });
            });
    }

    generateHelloString = () =>
    {
        const date = new Date();
        const hour = date.getHours();
        let ret = '';
        if (hour >= 7 && hour <= 12)
        {
            ret = '上午';
        }
        else if (hour > 12 && hour <= 19)
        {
            ret = '下午';
        }
        else if (hour > 19 || hour < 7)
        {
            ret = '晚上';
        }
        else
        {
            ret = '您';
        }

        return ret;
    };

    render()
    {
        const {
            [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: email,
            [NAMESPACE.OVERVIEW.LOGIN_INFO.LAST_LOGIN_IP]: lastLoginIp,
            [NAMESPACE.OVERVIEW.LOGIN_INFO.CURRENT_LOGIN_IP]: currentLoginIp,
            [NAMESPACE.OVERVIEW.LOGIN_INFO.LAST_LOGIN_TIME]: lastLoginTime,
            [NAMESPACE.OVERVIEW.SCREEN_INFO.CURRENT_SCREEN_AMOUNT]: currentScreenAmount,
            [NAMESPACE.OVERVIEW.SCREEN_INFO.RUNNING_SCREEN_AMOUNT]: runningScreenAmount,
            [NAMESPACE.OVERVIEW.ADVERTISEMENT_INFO.CURRENT_ADVERTISEMENT_AMOUNT]: currentAdvertisementAmount,
            [NAMESPACE.OVERVIEW.ADVERTISEMENT_INFO.CURRENT_IMAGE_AMOUNT]: currentImageAmount,
            [NAMESPACE.OVERVIEW.ADVERTISEMENT_INFO.ADVERTISEMENT_FILE_SIZE]: advertisementFileSize,
            [NAMESPACE.OVERVIEW.RESOURCE_PACK_INFO.CURRENT_RESOURCE_PACK_AMOUNT]: currentResourcePackAmount,
            [NAMESPACE.OVERVIEW.RESOURCE_PACK_INFO.CURRENT_RESOURCE_PACK_IN_USING_AMOUNT]: currentResourcePackInUsingAmount,
            [NAMESPACE.OVERVIEW.TAG_INFO.CURRENT_TAG_AMOUNT]: currentTagAmount,
        } = this.state;
        return (
            <div className={Style.Overview}>
                <Card title={'登录信息'} className={Style.card}>
                    <div>{this.generateHelloString()}好，<span className={Style.data}>{email}</span></div>
                    <div>上次登录 IP：<span className={Style.data}>{lastLoginIp}</span></div>
                    <div>本次登录 IP：<span className={Style.data}>{currentLoginIp}</span></div>
                    <div>上次登录时间：<span className={Style.data}>{generateTimeStr(lastLoginTime)}</span></div>
                </Card>
                <Card title={'屏幕信息'} className={Style.card}>
                    <div>您现在共有<span className={Style.data}>{currentScreenAmount}</span>个屏幕</div>
                    <div>其中有
                        <span className={Style.data}>{runningScreenAmount}</span>个正在运行，
                        <span className={Style.data}>{currentScreenAmount - runningScreenAmount}</span>个未在运行
                    </div>
                    <div><Link to={'/admin/screenManagement'}>前往屏幕管理页面查看详细信息 >></Link></div>
                </Card>
                <Card title={'广告信息'} className={Style.card}>
                    <div>您现在共有<span className={Style.data}>{currentAdvertisementAmount}</span>个广告</div>
                    <div>其中
                        <span className={Style.data}>{currentImageAmount}</span>个图片，
                        <span className={Style.data}>{currentAdvertisementAmount - currentImageAmount}</span>个视频
                    </div>
                    <div>共占用空间<span className={Style.data}>{(advertisementFileSize / 1024 / 1024).toFixed(2)}</span>MB
                    </div>
                    <div><Link to={'/admin/screenManagement'}>前往广告管理页面查看详细信息 >></Link></div>
                </Card>
                <Card title={'资源包信息'} className={Style.card}>
                    <div>您现在共有<span className={Style.data}>{currentResourcePackAmount}</span>个资源包</div>
                    <div>其中
                        <span className={Style.data}>{currentResourcePackInUsingAmount}</span>个已启用，
                        <span
                            className={Style.data}>{currentResourcePackAmount - currentResourcePackInUsingAmount}</span>个未启用
                    </div>
                    <div>您现在共有<span className={Style.data}>{currentTagAmount}</span>个标签</div>
                    <div><Link to={'/admin/resourceManagement'}>前往资源包管理页面查看详细信息 >></Link></div>
                    <div><Link to={'/admin/tagManagement'}>前往标签管理页面查看详细信息 >></Link></div>
                </Card>
            </div>
        );
    }
}

export default Overview;
