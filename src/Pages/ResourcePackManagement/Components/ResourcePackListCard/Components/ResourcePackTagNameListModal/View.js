import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {MODAL_ID} from '../../../../../../Config';
import NAMESPACE from '../../../../../../Namespace';
import {TAG_TYPE_CLASSNAME, View as Tag} from '../../../../../../Components/Tag';
import Function from '../../../../../../Function';
import {Modal} from '../../../../../../Components/Bootstrap/Modal';

class ResourcePackTagNameListModal extends Component
{
    render()
    {
        const {resourcePackName, resourcePackTagList} = this.props;
        return (
            <Modal id={MODAL_ID.RESOURCE_PACK_TAG_NAME_LIST_MODAL}
                   title={`资源包 ${resourcePackName} 绑定标签列表`}
                   className={Style.ResourcePackTagListModal}>
                <div className={Style.tagList}>
                    {
                        resourcePackTagList.length === 0 ?
                            <div style={{
                                width: '100%',
                                textAlign: 'center',
                            }}>该资源包没有绑定标签</div> :
                            resourcePackTagList.map(tag =>
                            {
                                const {[NAMESPACE.TAG_MANAGEMENT.TAG.NAME]: tagName, [NAMESPACE.TAG_MANAGEMENT.TAG.ID]: tagId} = tag;
                                return (
                                    <div className={Style.tagWrapper} key={tagId}>
                                        <Tag className={`${Style.tag} ${TAG_TYPE_CLASSNAME.PRIMARY}`}>{tagName}</Tag>
                                    </div>);
                            })
                    }
                    {
                        Function.padFlexLastRow(<div className={`${Style.tagWrapper} ${Style.empty}`} />, 5)
                    }
                </div>
            </Modal>
        );
    }
}

ResourcePackTagNameListModal.propTypes = {
    resourcePackName: PropTypes.string.isRequired,
    resourcePackTagList: PropTypes.array.isRequired,
};

export default ResourcePackTagNameListModal;