import React, {Component} from 'react';
import Style from './ResourcePackList.module.scss';
import {View as ResourcePack} from './Components/ResourcePack';
import {View as Header} from './Components/Header';
import NAMESPACE from '../../../../../../../../../../Namespace';
import {connect} from 'react-redux';

class ResourcePackList extends Component
{
    render()
    {
        const {resourcePackList} = this.props;
        return (
            <div className={Style.ResourcePackList}>
                <Header />
                <div className={Style.listWrapper}>
                    {resourcePackList.map(resourcePack =>
                    {
                        return (
                            <ResourcePack {...resourcePack} key={resourcePack[NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]} />);
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state =>
{
    const {ScreenManagement: {resourcePackList}} = state;
    return {resourcePackList};
};

export default connect(mapStateToProps)(ResourcePackList);
