import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {MODAL_ID} from '../../../../../../Config';
import NAMESPACE from '../../../../../../Namespace';
import {Modal} from '../../../../../../Components/Bootstrap/Modal';

class ResourcePackScreenListModal extends Component
{
    render()
    {
        const {resourcePackName, resourcePackScreenList} = this.props;
        return (
            <Modal id={MODAL_ID.RESOURCE_PACK_SCREEN_LIST_MODAL}
                   title={`资源包 ${resourcePackName} 绑定屏幕列表`}
                   className={Style.ResourcePackScreenListModal}>
                <div className={Style.screenList}>
                    <table className="table table-striped">
                        <thead className={'thead-dark'}>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">屏幕名</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            resourcePackScreenList.map((screen, i) =>
                            {
                                const {[NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: screenId, [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.NAME]: screenName} = screen;
                                return <tr key={screenId}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{screenName}</td>
                                </tr>;
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </Modal>
        );
    }
}

ResourcePackScreenListModal.propTypes = {
    resourcePackName: PropTypes.string.isRequired,
    resourcePackScreenList: PropTypes.array.isRequired,
};

export default ResourcePackScreenListModal;