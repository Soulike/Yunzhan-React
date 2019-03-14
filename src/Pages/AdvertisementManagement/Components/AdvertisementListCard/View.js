import React, {Component} from 'react';
import Style from './Style.module.scss';
import {MODAL_ID} from '../../../../Config';
import {ADVERTISEMENT_TYPE, View as Advertisement} from '../../../../Components/Advertisement';
import {Function as ModalFunction} from '../../../../Components/Bootstrap/Modal';
import {QRCodePositionId} from '../UploaderCard/Components/ImageUploader/QRCodePosition';
import NAMESPACE from '../../../../Namespace';
import RequestProcessor from '../../../../RequestProcessor';
import {connect} from 'react-redux';
import {View as ListCard} from '../../../../Components/ListCard';
import Function from '../../../../Function';
import {View as AdvertisementInfoModal} from './Components/AdvertisementInfoModal';

class AdvertisementListCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentAdvertisementIdInModal: 0,
            currentAdvertisementTypeInModal: ADVERTISEMENT_TYPE.IMAGE,
            currentAdvertisementNameInModal: '',
            currentAdvertisementQRCodeUrlInModal: '',
            currentAdvertisementQRCodePositionInModal: QRCodePositionId.TOP_LEFT,
        };
    }

    onAdvertisementClick = (advertisementId, advertisementTypes) =>
    {
        return async () =>
        {
            this.setState({
                currentAdvertisementIdInModal: advertisementId,
                currentAdvertisementTypeInModal: advertisementTypes,
            }, async () =>
            {
                const advertisementInfo = await RequestProcessor.sendGetAdvertisementInfoRequestAsync(advertisementId);
                if (advertisementInfo)
                {
                    const {
                        [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.TYPE]: advertisementType,
                        [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME]: advertisementName,
                        [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_URL]: advertisementQRCodeUrl,
                        [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_POSITION]: advertisementQRCodePosition,
                    } = advertisementInfo;

                    this.setState({
                        currentAdvertisementTypeInModal: advertisementType,
                        currentAdvertisementNameInModal: advertisementName,
                        currentAdvertisementQRCodeUrlInModal: advertisementQRCodeUrl,
                        currentAdvertisementQRCodePositionInModal: advertisementQRCodePosition,
                    }, () =>
                    {
                        ModalFunction.showModal(MODAL_ID.ADVERTISEMENT_INFO_MODAL);
                    });
                }
            });
        };
    };


    render()
    {
        const {advertisementList} = this.props;
        const {
            currentAdvertisementIdInModal,
            currentAdvertisementTypeInModal,
            currentAdvertisementNameInModal,
            currentAdvertisementQRCodeUrlInModal,
            currentAdvertisementQRCodePositionInModal,
        } = this.state;
        return [
            <ListCard className={Style.AdvertisementListCard}
                      title={'广告列表'}
                      subTitle={'可点击查看详细信息'}
                      key={Style.AdvertisementListCard}>
                <div className={Style.advertisementListWrapper}>
                    {
                        advertisementList.map(advertisement =>
                        {
                            const {
                                [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.ID]: advertisementId,
                                [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.TYPE]: advertisementType,
                                [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.URL]: advertisementPreviewUrl,
                                [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME]: advertisementName,
                            } = advertisement;
                            return (
                                <div className={Style.advertisementWrapper}
                                     key={advertisementId}
                                     onClick={this.onAdvertisementClick(advertisementId, advertisementType)}>
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
            </ListCard>,
            <AdvertisementInfoModal advertisementId={currentAdvertisementIdInModal}
                                    advertisementType={currentAdvertisementTypeInModal}
                                    advertisementName={currentAdvertisementNameInModal}
                                    advertisementQRCodePosition={currentAdvertisementQRCodePositionInModal}
                                    advertisementQRCodeUrl={currentAdvertisementQRCodeUrlInModal}
                                    key={MODAL_ID.ADVERTISEMENT_INFO_MODAL} />,
        ];
    }
}

const mapStateToProps = state =>
{
    const {AdvertisementManagement: {advertisementList}} = state;
    return {advertisementList};
};

export default connect(mapStateToProps)(AdvertisementListCard);