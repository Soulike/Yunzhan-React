import React, {Component} from 'react';
import RequestProcessor from '../../../../../../RequestProcessor';
import Style from './Style.module.scss';
import NAMESPACE from '../../../../../../Namespace';
import {View as TagContainer} from './Components/TagContainer';
import {selectTag, unselectTag} from '../../../../Function';
import {connect} from 'react-redux';
import Function from '../../../../../../Function';

class TagList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            tagList: [],
        };
    }

    componentDidMount()
    {
        RequestProcessor.sendGetTagListRequestAsync()
            .then(tagListWrapper =>
            {
                if (tagListWrapper)
                {
                    this.setState({tagList: tagListWrapper[NAMESPACE.TAG_MANAGEMENT.LIST.TAG]});
                }
            });
    }

    onTagWrapperClick = id =>
    {
        return () =>
        {
            const {selectedTagIdSet} = this.props;
            if (selectedTagIdSet.has(id))
            {
                unselectTag(id);
            }
            else
            {
                selectTag(id);
            }
        };
    };

    render()
    {
        const {tagList} = this.state;
        return (
            <div className={Style.TagList}>
                {
                    // TODO: 排序方式
                    tagList.map(tag =>
                    {
                        const {[NAMESPACE.TAG_MANAGEMENT.TAG.ID]: tagId, [NAMESPACE.TAG_MANAGEMENT.TAG.NAME]: tagName} = tag;
                        return (
                            <div className={Style.tagWrapper} key={tagId} onClick={this.onTagWrapperClick(tagId)}>
                                <TagContainer tagId={tagId}>{tagName}</TagContainer>
                            </div>);
                    })
                }
                {
                    Function.padFlexLastRow(<div className={`${Style.tagWrapper} ${Style.empty}`} />, 3)
                }
            </div>

        );
    }
}

const mapStateToProps = state =>
{
    const {ResourcePackManagement: {selectedTagIdSet}} = state;
    return {selectedTagIdSet};
};

export default connect(mapStateToProps)(TagList);