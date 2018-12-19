import React, {Component} from 'react';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router';
import style from './Overview.module.scss';
import {View as Title} from '../../Components/Title';
import {Functions as MenuFunctions} from '../Root/Components/Menu';
import {View as Card} from '../../Components/Card';
import {generateTimeStr, getAsync, requestPrefix} from '../../Static/Functions';
import {View as Alert} from '../../Components/Alert';
import {STATUS_CODE} from '../../Static/Constants';
import {redirectToLogin} from '../Login/Functions';

class Overview extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            email: 'example@example.com',
            lastLoginIp: '0.0.0.0',
            loginIp: '0.0.0.0',
            lastLoginTime: 0,
            currentScreenNumber: 0,
            runningScreenNumber: 0,
            currentAdvertisementNumber: 0,
            currentPictureNumber: 0,
            advertiseFileSize: 0,
            currentResourcePackNumber: 0,
            currentUsingResourcePackNumber: 0,
            currentTagNumber: 0
        };
    }

    componentDidMount()
    {
        document.title = '概览 - 云展';
        MenuFunctions.setActiveItemId(0);

        this.getScreenInfo();
        this.getAdvertiseInfo();
        this.getResourceInfo();
        this.getTagInfo();
    }

    static overviewRequestPrefix(url)
    {
        while (url.charAt(0) === '/')
        {
            url = url.substring(1);
        }
        return requestPrefix(`/admin/overview/${url}`);
    }

    getScreenInfo = () =>
    {
        getAsync(Overview.overviewRequestPrefix('/getScreenInfo'), false)
            .then(res =>
            {
                const {code, data} = res;
                if (code === STATUS_CODE.SUCCESS)
                {
                    this.setState({...data});
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
                Alert.show('获取屏幕信息失败', false);
                console.log(e);
            });
    };

    getAdvertiseInfo = () =>
    {
        getAsync(Overview.overviewRequestPrefix('/getAdvertiseInfo'), false)
            .then(res =>
            {
                const {code, data} = res;
                if (code === STATUS_CODE.SUCCESS)
                {
                    this.setState({...data});
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
                Alert.show('获取广告信息失败', false);
                console.log(e);
            });
    };

    getResourceInfo = () =>
    {
        getAsync(Overview.overviewRequestPrefix('/getResourceInfo'), false)
            .then(res =>
            {
                const {code, data} = res;
                if (code === STATUS_CODE.SUCCESS)
                {
                    this.setState({...data});
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
                Alert.show('获取资源包信息失败', false);
                console.log(e);
            });
    };

    getTagInfo = () =>
    {
        getAsync(Overview.overviewRequestPrefix('/getTagInfo'), false)
            .then(res =>
            {
                const {code, data} = res;
                if (code === STATUS_CODE.SUCCESS)
                {
                    this.setState({...data});
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
                Alert.show('获取标签信息失败', false);
                console.log(e);
            });
    };

    getHelloString = () =>
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
        const {email, lastLoginIp, loginIp, lastLoginTime, currentScreenNumber, runningScreenNumber, currentAdvertisementNumber, currentPictureNumber, advertiseFileSize, currentResourcePackNumber, currentUsingResourcePackNumber, currentTagNumber} = this.state;
        return (
            <div className={style.Overview}>
                <Title icon={solidIcon.faList} text={'概览'}/>
                <div className={style.cardWrapper}>
                    <div className={style.card}>
                        <Card title={'登录信息'}>
                            <div>{this.getHelloString()}好，<span className={style.data}>{email}</span></div>
                            <div>上次登录 IP：<span className={style.data}>{lastLoginIp}</span></div>
                            <div>本次登录 IP：<span className={style.data}>{loginIp}</span></div>
                            <div>上次登录时间：<span className={style.data}>{generateTimeStr(lastLoginTime)}</span></div>
                        </Card>
                    </div>
                    <div className={style.card}>
                        <Card title={'屏幕信息'}>
                            <div>您现在共有<span className={style.data}>{currentScreenNumber}</span>个屏幕</div>
                            <div>其中有
                                <span className={style.data}>{runningScreenNumber}</span>个正在运行，
                                <span className={style.data}>{currentScreenNumber - runningScreenNumber}</span>个未在运行
                            </div>
                            <div><Link to={'/admin/screenManagement'}>前往屏幕管理页面查看详细信息 >></Link></div>
                        </Card>
                    </div>
                    <div className={style.card}>
                        <Card title={'广告信息'}>
                            <div>您现在共有<span className={style.data}>{currentAdvertisementNumber}</span>个广告</div>
                            <div>其中
                                <span className={style.data}>{currentPictureNumber}</span>个图片，
                                <span className={style.data}>{currentAdvertisementNumber - currentPictureNumber}</span>个视频
                            </div>
                            <div>共占用空间<span className={style.data}>{advertiseFileSize}</span>MB</div>
                            <div><Link to={'/admin/screenManagement'}>前往广告管理页面查看详细信息 >></Link></div>
                        </Card>
                    </div>
                    <div className={style.card}>
                        <Card title={'资源包信息'}>
                            <div>您现在共有<span className={style.data}>{currentResourcePackNumber}</span>个资源包</div>
                            <div>其中
                                <span className={style.data}>{currentUsingResourcePackNumber}</span>个已启用，
                                <span
                                    className={style.data}>{currentResourcePackNumber - currentUsingResourcePackNumber}</span>个未启用
                            </div>
                            <div>您现在共有<span className={style.data}>{currentTagNumber}</span>个标签</div>
                            <div><Link to={'/admin/resourceManagement'}>前往资源包管理页面查看详细信息 >></Link></div>
                            <div><Link to={'/admin/tagManagement'}>前往标签管理页面查看详细信息 >></Link></div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }
}

export default Overview;
