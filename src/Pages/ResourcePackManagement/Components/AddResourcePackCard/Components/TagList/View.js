import React, {Component} from 'react';
import RequestProcessor from '../../../../../../RequestProcessor';
import Style from './Style.module.scss';
import NAMESPACE from '../../../../../../Namespace';
import {View as Tag} from './Components/Tag';
import {selectTag, unselectTag} from '../../../../Function';
import {connect} from 'react-redux';

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
                        const {[NAMESPACE.TAG_MANAGEMENT.TAG.ID]: id, [NAMESPACE.TAG_MANAGEMENT.TAG.NAME]: tagName} = tag;
                        return (
                            <div className={Style.tagWrapper} key={id} onClick={this.onTagWrapperClick(id)}>
                                <Tag name={tagName} id={id} />
                            </div>);
                    })
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