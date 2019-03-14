import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {connect} from 'react-redux';
import {TAG_TYPE_CLASSNAME, View as Tag} from '../../../../../../../../Components/Tag';

class TagContainer extends Component
{
    render()
    {
        const {tagId, children, selectedTagIdSet} = this.props;
        return (
            <Tag className={`${Style.TagContainer} ${selectedTagIdSet.has(tagId) ? TAG_TYPE_CLASSNAME.DANGER : TAG_TYPE_CLASSNAME.PRIMARY}`}>
                {children}
            </Tag>);
    }
}

TagContainer.propTypes = {
    tagId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

const mapStateToProps = state =>
{
    const {ResourcePackManagement: {selectedTagIdSet}} = state;
    return {selectedTagIdSet};
};

export default connect(mapStateToProps)(TagContainer);