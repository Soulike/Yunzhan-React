import React, {Component} from 'react';
import style from './ResourcePackList.module.scss';
import {View as ResourcePack} from './Components/ResourcePack';
import {View as Header} from './Components/Header';
import {Provider} from 'react-redux';
import Store from '../../../../../../Store';
import {getAsync, requestPrefix} from '../../../../../../Static/Functions';
import {STATUS_CODE} from '../../../../../../Static/Constants';
import {View as Alert} from '../../../../../../Components/Alert';
import {redirectToLogin} from '../../../../../Login/Functions';

class ResourcePackList extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            resourcePackList: []
        };
    }


    componentDidMount()
    {
        getAsync(requestPrefix('/admin/screenManagement/getResourcePackList'), false)
            .then(res =>
            {
                const {code, data} = res;
                if (code === STATUS_CODE.SUCCESS)
                {
                    this.setState({resourcePackList: data});
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
                Alert.show('获取资源包列表失败', false);
                console.log(e);
            });
    }

    render()
    {
        const {resourcePackList} = this.state;
        return (
            <div className={style.ResourcePackList}>
                <Header/>
                <Provider store={Store}>
                    <div className={style.listWrapper}>
                        {resourcePackList.map(resourcePack =>
                        {
                            return (<ResourcePack {...resourcePack} key={resourcePack.id}/>);
                        })}
                    </div>
                </Provider>
            </div>
        );
    }
}

export default ResourcePackList;