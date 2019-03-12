import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {MODAL_ID} from '../../../../../../Config';
import {
    Object as AdvertisementObject,
    View as Advertisement,
} from '../../../../../AdvertisementManagement/Components/AdvertisementListCard/Components/Advertisement';
import NAMESPACE from '../../../../../../Namespace';
import Function from '../../../../../../Function';
import {LargeModal} from '../../../../../../Components/Bootstrap/Modal';

class ResourcePackAdvertisementListModal extends Component
{
    render()
    {
        const {resourcePackName, resourcePackAdvertisementList} = this.props;
        return (
            <LargeModal id={MODAL_ID.RESOURCE_PACK_ADVERTISEMENT_LIST_MODAL}
                        title={`资源包 ${resourcePackName} 绑定广告列表`}
                        className={Style.ResourcePackAdvertisementListModal}>
                <div className={Style.advertisementList}>
                    {
                        resourcePackAdvertisementList.map(advertisement =>
                        {
                            const advertisementObj = new AdvertisementObject.Advertisement(
                                advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.TYPE],
                                advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.URL],
                                advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME],
                            );
                            return (
                                <div className={Style.advertisementWrapper}
                                     key={advertisement[NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.ID]}>
                                    <Advertisement advertisement={advertisementObj} />
                                </div>);
                        })
                    }
                    {
                        Function.padFlexLastRow(<div className={`${Style.advertisementWrapper} ${Style.empty}`} />, 3)
                    }
                </div>
            </LargeModal>
        );
    }
}

ResourcePackAdvertisementListModal.propTypes = {
    resourcePackName: PropTypes.string.isRequired,
    resourcePackAdvertisementList: PropTypes.array.isRequired,
};

export default ResourcePackAdvertisementListModal;