import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {Function as ModalFunction, SmallModal} from '../../../../../../../../Components/Bootstrap/Modal';
import {MODAL_ID} from '../../../../../../../../Config';
import RequestProcessor from '../../../../../../../../RequestProcessor';
import {getTagList} from '../../../../../../Function';

class DeleteTagModal extends Component
{
    onConfirmButtonClick = async () =>
    {
        const {tagId} = this.props;
        const requestIsSuccessful = await RequestProcessor.sendPostDeleteTagsRequestAsync([tagId]);
        if (requestIsSuccessful)
        {
            getTagList();
            ModalFunction.hideModal(MODAL_ID.DELETE_TAG_MODAL);
        }
    };

    render()
    {
        const {tagName} = this.props;
        return (
            <SmallModal id={MODAL_ID.DELETE_TAG_MODAL}
                        title={'删除标签确认'}
                        className={Style.DeleteTagModal}
                        onConfirmButtonClick={this.onConfirmButtonClick}>
                确认删除标签 <span style={{
                color: 'red',
                fontWeight: 'bold',
            }}>{tagName}</span>？<strong>此操作不可逆！</strong>
            </SmallModal>
        );
    }
}

DeleteTagModal.propTypes = {
    tagId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    tagName: PropTypes.string.isRequired,

};

export default DeleteTagModal;