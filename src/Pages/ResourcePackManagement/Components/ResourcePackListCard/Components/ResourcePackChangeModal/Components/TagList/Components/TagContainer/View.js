import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {connect} from 'react-redux';
import {TAG_TYPE_CLASSNAME, View as Tag} from '../../../../../../../../../../Components/Tag';

class TagContainer extends Component
{
    render()
    {
        const {tagId, children, resourcePackSelectedTagIdSet} = this.props;
        return (
            <Tag className={`${Style.TagContainer} ${resourcePackSelectedTagIdSet.has(tagId) ? TAG_TYPE_CLASSNAME.DANGER : TAG_TYPE_CLASSNAME.PRIMARY}`}>
                {children}
            </Tag>);
    }
}

TagContainer.propTypes = {
    tagId: PropTypes.number.isRequired,
};

const mapStateToProps = state =>
{
    const {ResourcePackManagement: {resourcePackSelectedTagIdSet}} = state;
    return {
        resourcePackSelectedTagIdSet,
    };
};


export default connect(mapStateToProps)(TagContainer);