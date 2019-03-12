import React, {Component} from 'react';
import Style from './Style.module.scss';
import RequestProcessor from '../../../../RequestProcessor';
import NAMESPACE from '../../../../Namespace';
import {View as Tag} from './Components/Tag';
import {Function as ModalFunction} from '../../../../Components/Bootstrap/Modal';
import {MODAL_ID} from '../../../../Config';
import Function from '../../../../Function';
import {connect} from 'react-redux';
import {View as ListCard} from '../../../../Components/ListCard';
import {View as TagInfoModal} from './Components/TagInfoModal';

class TagListCard extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            currentTagIdInModal: 0,
            currentTagNameInModal: '',
            currentTagCreationTimeInModal: Date.now(),
            currentTagBindingResourcePackNameList: [],
        };
    }

    onTagClick = id =>
    {
        return async () =>
        {
            const tagInfo = await RequestProcessor.sendGetTagInfoRequestAsync(id);
            if (tagInfo)
            {
                const {
                    [NAMESPACE.TAG_MANAGEMENT.TAG.NAME]: currentTagNameInModal,
                    [NAMESPACE.TAG_MANAGEMENT.TAG.CREATION_TIME]: currentTagCreationTimeInModal,
                    [NAMESPACE.TAG_MANAGEMENT.TAG.BINDING_RESOURCE_PACK_NAME_LIST]: currentTagBindingResourcePackNameList,
                } = tagInfo;
                this.setState({
                    tagNameIsChanged: false,
                    currentTagIdInModal: id,
                    currentTagNameInModal,
                    currentTagCreationTimeInModal,
                    currentTagBindingResourcePackNameList,
                }, () =>
                {
                    ModalFunction.showModal(MODAL_ID.TAG_INFO_MODAL);
                });
            }
        };
    };

    render()
    {
        const {
            currentTagIdInModal,
            currentTagNameInModal,
            currentTagCreationTimeInModal,
            currentTagBindingResourcePackNameList,
        } = this.state;
        const {tagList} = this.props;
        return [
            <ListCard title={'标签列表'} subTitle={'可点击查看详细信息'} className={Style.TagListCard} key={Style.TagListCard}>
                <div className={Style.tagListWrapper}>
                    {
                        // TODO: 排序方式
                        tagList.map(tag =>
                        {
                            const {[NAMESPACE.TAG_MANAGEMENT.TAG.ID]: id, [NAMESPACE.TAG_MANAGEMENT.TAG.NAME]: tagName} = tag;
                            return (
                                <div className={Style.tagWrapper} key={id} onClick={this.onTagClick(id)}>
                                    <Tag name={tagName} />
                                </div>);
                        })
                    }
                    {
                        Function.padFlexLastRow(<div className={`${Style.tagWrapper} ${Style.empty}`} />, 5)
                    }
                </div>
            </ListCard>,
            <TagInfoModal tagId={currentTagIdInModal}
                          tagName={currentTagNameInModal}
                          tagCreationTime={currentTagCreationTimeInModal}
                          tagBindingResourcePackNameList={currentTagBindingResourcePackNameList}
                          key={MODAL_ID.TAG_INFO_MODAL} />,
        ];
    }
}

const mapStateToProps = state =>
{
    const {TagManagement: {tagList}} = state;
    return {tagList};
};

export default connect(mapStateToProps)(TagListCard);