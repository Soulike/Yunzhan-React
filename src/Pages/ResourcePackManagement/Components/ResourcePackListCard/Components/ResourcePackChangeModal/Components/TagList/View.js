import React, {Component} from 'react';
import Style from './Style.module.scss';
import {connect} from 'react-redux';
import RequestProcessor from '../../../../../../../../RequestProcessor';
import NAMESPACE from '../../../../../../../../Namespace';
import {resourcePackSelectTag, resourcePackUnselectTag} from '../../../../../../Function';
import {View as Tag} from './Components/Tag';
import Function from '../../../../../../../../Function';

class TagList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            allTagList: [],// 所有标签列表
        };
    }

    componentDidMount()
    {
        RequestProcessor.sendGetTagListRequestAsync()
            .then(allTagListWrapper =>
                {
                    if (allTagListWrapper)
                    {
                        this.setState({
                            allTagList: allTagListWrapper[NAMESPACE.TAG_MANAGEMENT.LIST.TAG],
                        });
                    }
                },
            );
    }

    onTagWrapperClick = tagId =>
    {
        return () =>
        {
            const {resourcePackSelectedTagIdSet} = this.props;
            if (resourcePackSelectedTagIdSet.has(tagId))
            {
                resourcePackUnselectTag(tagId);
            }
            else
            {
                resourcePackSelectTag(tagId);
            }
        };
    };

    render()
    {
        const {allTagList} = this.state;
        return (
            <div className={Style.TagList}>
                {
                    allTagList.map(tag =>
                    {
                        const {
                            [NAMESPACE.TAG_MANAGEMENT.TAG.ID]: tagId, // Tag 的 ID
                            [NAMESPACE.TAG_MANAGEMENT.TAG.NAME]: tagName, // Tag 的名字
                        } = tag;
                        return (
                            <div className={Style.tagWrapper} onClick={this.onTagWrapperClick(tagId)} key={tagId}>
                                <Tag id={tagId} name={tagName} />
                            </div>);
                    })
                }
                {
                    Function.padFlexLastRow(<div className={`${Style.tagWrapper} ${Style.empty}`} />, 4)
                }
            </div>
        );
    }
}

const mapStateToProps = state =>
{
    const {ResourcePackManagement: {resourcePackSelectedTagIdSet}} = state;
    return {
        resourcePackSelectedTagIdSet,
    };
};

export default connect(mapStateToProps)(TagList);