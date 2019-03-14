import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {MODAL_ID} from '../../../../../../Config';
import NAMESPACE from '../../../../../../Namespace';
import Function from '../../../../../../Function';
import {LargeModal} from '../../../../../../Components/Bootstrap/Modal';
import {View as Advertisement} from '../../../../../../Components/Advertisement';

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
                            const {
                                [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.ID]: advertisementId,
                                [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.TYPE]: advertisementType,
                                [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.URL]: advertisementPreviewUrl,
                                [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME]: advertisementName,
                            } = advertisement;
                            return (
                                <div className={Style.advertisementWrapper}
                                     key={advertisementId}>
                                    <Advertisement advertisementType={advertisementType}
                                                   advertisementPreviewUrl={advertisementPreviewUrl}
                                                   advertisementName={advertisementName} />
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