import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {connect} from 'react-redux';

class Tag extends Component
{
    render()
    {
        const {id, name, resourcePackSelectedTagIdSet} = this.props;
        return (
            <span className={`${Style.Tag} badge ${resourcePackSelectedTagIdSet.has(id) ? 'badge-danger' : 'badge-primary'}`}>
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
    const {ResourcePackManagement: {resourcePackSelectedTagIdSet}} = state;
    return {
        resourcePackSelectedTagIdSet,
    };
};


export default connect(mapStateToProps)(Tag);