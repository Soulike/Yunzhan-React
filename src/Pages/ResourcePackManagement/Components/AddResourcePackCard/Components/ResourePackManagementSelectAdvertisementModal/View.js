import React, {Component} from 'react';
import Style from './Style.module.scss';
import {MODAL_ID, REGEX} from '../../../../../../Config';
import {View as AdvertisementList} from '../AdvertisementList';
import {Function as ModalFunction, LargeModal} from '../../../../../../Components/Bootstrap/Modal';
import {WarningAlert} from '../../../../../../Components/Bootstrap/Alerts';
import RequestProcessor from '../../../../../../RequestProcessor';
import {getResourcePackList, unselectAllAdvertisements, unselectAllTags} from '../../../../Function';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class ResourcePackManagementSelectAdvertisementModal extends Component
{
    onSelectAdvertisementModalConfirmButtonClick = async () =>
    {
        const {resourcePackName, selectedTagIdSet, selectedAdvertisementIdSet} = this.props;
        if (!REGEX.RESOURCE_PACK_NAME.test(resourcePackName))
        {
            WarningAlert.pop('请输入有效的资源包名');
        }
        else
        {
            const RequestIsSuccessful = await RequestProcessor.sendPostSubmitNewResourcePackRequestAsync(
                resourcePackName, Array.from(selectedAdvertisementIdSet), Array.from(selectedTagIdSet));
            if (RequestIsSuccessful)
            {
                ModalFunction.hideModal(MODAL_ID.RESOURCE_PACK_MANAGEMENT_SELECT_ADVERTISEMENT_MODAL);
                unselectAllTags();
                unselectAllAdvertisements();
                getResourcePackList();
            }
        }
    };

    render()
    {
        return (
            <LargeModal id={MODAL_ID.RESOURCE_PACK_MANAGEMENT_SELECT_ADVERTISEMENT_MODAL}
                        title={'选择广告'}
                        subTitle={'点击选择资源包中要包含的广告'}
                        className={Style.ResourcePackManagementSelectAdvertisementModal}
                        onConfirmButtonClick={this.onSelectAdvertisementModalConfirmButtonClick}>
                <div className={Style.advertisementListWrapper}>
                    <AdvertisementList />
                </div>
            </LargeModal>
        );
    }
}

ResourcePackManagementSelectAdvertisementModal.propTypes = {
    resourcePackName: PropTypes.string.isRequired,
};

const mapStateToProps = state =>
{
    const {ResourcePackManagement: {selectedTagIdSet, selectedAdvertisementIdSet}} = state;
    return {
        selectedTagIdSet,
        selectedAdvertisementIdSet,
    };
};

export default connect(mapStateToProps)(ResourcePackManagementSelectAdvertisementModal);