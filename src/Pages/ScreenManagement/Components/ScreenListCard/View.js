import React, {Component} from 'react';
import Style from './Style.module.scss';
import {View as ListCard} from '../../../../Components/ListCard';
import {connect} from 'react-redux';
import NAMESPACE from '../../../../Namespace';
import {View as Screen} from './Components/Screen';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as SolidIcon from '@fortawesome/free-solid-svg-icons';
import {TOOLTIP_POSITION, View as ToolTip} from '../../../../Components/Bootstrap/Tooltip';
import {View as ModalTriggerButton} from '../../../../Components/Bootstrap/ModalTriggeringButton';
import {MODAL_ID} from '../../../../Config';
import {View as AddScreenModal} from './Components/AddScreenModal';
import {Function as ModalFunction} from '../../../../Components/Bootstrap/Modal';
import ChangeScreenModal from './Components/ChangeScreenModal/View';

class ScreenListCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentScreenIdInModal: 0,
            currentScreenUuidInModal: '',
            currentScreenNameInModal: '',
            currentScreenIsRunningInModal: false,
            currentResourcePackNameOfScreenInModal: '',
        };
    }

    onScreenChangeButtonClick = (screenId, screenUuid, screenName, screenIsRunning, resourcePackNameOfScreen) =>
    {
        return () =>
        {
            this.setState({
                currentScreenIdInModal: screenId,
                currentScreenUuidInModal: screenUuid,
                currentScreenNameInModal: screenName,
                currentScreenIsRunningInModal: screenIsRunning,
                currentResourcePackNameOfScreenInModal: resourcePackNameOfScreen,
            }, () =>
            {
                ModalFunction.showModal(MODAL_ID.CHANGE_SCREEN_MODAL);
            });
        };
    };


    render()
    {
        const {screenList} = this.props;
        const {
            currentScreenIdInModal,
            currentScreenUuidInModal,
            currentScreenNameInModal,
            currentScreenIsRunningInModal,
            currentResourcePackNameOfScreenInModal,
        } = this.state;
        return [
            <ListCard title={'屏幕列表'} className={Style.ScreenListCard} key={'ScreenListCard'}>
                <div className={Style.screenListTableWrapper}>
                    <table className={`table ${Style.screenListTable}`}>
                        <thead className={'thead-dark'}>
                        <tr>
                            <th scope="col" className={Style.uuidHeader}>UUID</th>
                            <th scope="col" className={Style.screenNameHeader}>屏幕名</th>
                            <th scope="col" className={Style.screenIsRunningHeader}>状态</th>
                            <th scope="col" className={Style.resourcePackNameOfResourcePackHeader}>资源包</th>
                            <th scope="col" className={Style.changeScreenButtonHeader} />
                        </tr>
                        </thead>
                        <tbody>
                        {
                            screenList.map(screen =>
                            {
                                const {
                                    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: screenId,
                                    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: uuid,
                                    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.NAME]: screenName,
                                    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.IS_RUNNING]: screenIsRunning,
                                    [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_NAME]: resourcePackNameOfScreen,
                                } = screen;

                                return <Screen screenId={screenId}
                                               uuid={uuid}
                                               screenName={screenName}
                                               screenIsRunning={screenIsRunning}
                                               resourcePackNameOfScreen={resourcePackNameOfScreen}
                                               onChangeButtonClick={this.onScreenChangeButtonClick(screenId, uuid, screenName, screenIsRunning, resourcePackNameOfScreen)}
                                               key={screenId} />;
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className={Style.buttonWrapper} role="group">
                    <ModalTriggerButton modalId={MODAL_ID.ADD_SCREEN_MODAL} className={Style.addScreenButton}>
                        <ToolTip placement={TOOLTIP_POSITION.TOP} title={'添加新屏幕'}>
                            <FontAwesomeIcon icon={SolidIcon.faPlus} />
                        </ToolTip>
                    </ModalTriggerButton>
                </div>
            </ListCard>,
            <AddScreenModal key={MODAL_ID.ADD_SCREEN_MODAL} />,
            <ChangeScreenModal screenId={currentScreenIdInModal}
                               uuid={currentScreenUuidInModal}
                               screenName={currentScreenNameInModal}
                               screenIsRunning={currentScreenIsRunningInModal}
                               resourcePackNameOfScreen={currentResourcePackNameOfScreenInModal}
                               key={MODAL_ID.CHANGE_SCREEN_MODAL} />,
        ];
    }
}

const mapStateToProps = state =>
{
    const {ScreenManagement: {screenList}} = state;
    return {
        screenList,
    };
};

export default connect(mapStateToProps)(ScreenListCard);
