import React, {Component} from 'react';
import style from './ResourcePackList.module.scss';
import {View as ResourcePack} from './Components/ResourcePack';
import {View as Header} from './Components/Header';
import {Provider} from 'react-redux';
import Store from '../../../../../../Store';
import NAMESPACE from '../../../../../../Namespace';
import RequestProcessors from '../../../../../../RequestProcessors';

class ResourcePackList extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.LIST.RESOURCE_PACK]: []
        };
    }


    componentDidMount()
    {
        RequestProcessors.sendGetResourcePackListRequest.apply(this);
    }

    render()
    {
        const {[NAMESPACE.RESOURCE_PACK_MANAGEMENT.LIST.RESOURCE_PACK]: resourcePackList} = this.state;
        return (
            <div className={style.ResourcePackList}>
                <Header/>
                <Provider store={Store}>
                    <div className={style.listWrapper}>
                        {resourcePackList.map(resourcePack =>
                        {
                            return (
                                <ResourcePack {...resourcePack} key={resourcePack[NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]}/>);
                        })}
                    </div>
                </Provider>
            </div>
        );
    }
}

export default ResourcePackList;
