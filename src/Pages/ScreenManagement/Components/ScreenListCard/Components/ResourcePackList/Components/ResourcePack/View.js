import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './ResourcePack.module.scss';
import Store from '../../../../../../../../Store';
import * as Actions from './Actions/Actions';
import {connect} from 'react-redux';

class ResourcePack extends Component
{
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {selectedResourcePackId, id} = this.props;
        const $radioInput = document.querySelector(`#resource_pack_${id}`);
        $radioInput.checked = (selectedResourcePackId === id);
    }

    onResourcePackClick = () =>
    {
        const {id} = this.props;
        Store.dispatch(Actions.resourcePackClick(id));
    };

    onRadioInputClick = () =>
    {
        this.onResourcePackClick();
    };

    render()
    {
        const {id, name, advertiseNumber, description} = this.props;
        return (
            <div className={style.ResourcePack} onClick={this.onResourcePackClick}>
                <input type="radio" id={`resource_pack_${id}`} className={style.radioInput}
                       onClick={this.onRadioInputClick}/>
                <div className={style.name}>{name}</div>
                <div className={style.advertiseNumber}>{advertiseNumber}</div>
                <div className={style.description}>{description}</div>
            </div>
        );
    }
}

ResourcePack.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    advertiseNumber: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired
};

const mapStateToProps = state =>
{
    const {selectedResourcePackId} = state.ScreenManagementResourcePackList;
    return {
        selectedResourcePackId
    };
};

export default connect(mapStateToProps)(ResourcePack);