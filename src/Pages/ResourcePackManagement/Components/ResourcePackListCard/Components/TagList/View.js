import React, {Component} from 'react';
import Style from './Style.module.scss';
import {connect} from 'react-redux';
import RequestProcessor from '../../../../../../RequestProcessor';
import NAMESPACE from '../../../../../../Namespace';
import {resourcePackSelectTag, resourcePackUnselectTag} from '../../../../Function';
import {View as Tag} from './Components/Tag';

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
                    (() =>
                    {
                        // Flex 最后一行左对齐填充
                        const nodeArray = [];
                        for (let i = 0; i < 4; i++)
                        {
                            nodeArray.push(
                                <div className={`${Style.tagWrapper} ${Style.empty}`} key={i} />,
                            );
                        }
                        return nodeArray;
                    })()
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