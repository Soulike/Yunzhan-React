import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {connect} from 'react-redux';

class Tag extends Component
{
    render()
    {
        const {id, name, selectedTagIdSet} = this.props;
        return (
            <span className={`${Style.Tag} badge ${selectedTagIdSet.has(id) ? 'badge-danger' : 'badge-primary'}`}>
                {name}
            </span>
        );
    }
}

Tag.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
};

const mapStateToProps = state =>
{
    const {ResourcePackManagement: {selectedTagIdSet}} = state;
    return {selectedTagIdSet};
};

export default connect(mapStateToProps)(Tag);