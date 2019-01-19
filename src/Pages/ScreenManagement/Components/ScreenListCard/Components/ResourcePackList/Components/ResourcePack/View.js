import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './ResourcePack.module.scss';
import Store from '../../../../../../../../Store';
import * as Actions from './Actions/Actions';
import {connect} from 'react-redux';
import NAMESPACE from '../../../../../../../../Namespace';

class ResourcePack extends Component
{
    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {
            selectedResourcePackId,
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: id
        } = this.props;
        const $radioInput = document.querySelector(`#resource_pack_${id}`);
        $radioInput.checked = (selectedResourcePackId === id);
    }

    onResourcePackClick = () =>
    {
        const {[NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: id} = this.props;
        Store.dispatch(Actions.resourcePackClick(id));
    };

    onRadioInputClick = () =>
    {
        this.onResourcePackClick();
    };

    render()
    {
        const {
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: id,
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.NAME]: name,
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ADVERTISEMENT_AMOUNT]: advertisementNumber,
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.DESCRIPTION]: description
        } = this.props;
        return (
            <div className={style.ResourcePack} onClick={this.onResourcePackClick}>
                <input type="radio" id={`resource_pack_${id}`} className={style.radioInput}
                       onClick={this.onRadioInputClick}/>
                <div className={style.name}>{name}</div>
                <div className={style.advertiseNumber}>{advertisementNumber}</div>
                <div className={style.description}>{description}</div>
            </div>
        );
    }
}

ResourcePack.propTypes = {
    [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: PropTypes.number.isRequired,
    [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.NAME]: PropTypes.string.isRequired,
    [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ADVERTISEMENT_AMOUNT]: PropTypes.number.isRequired,
    [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.DESCRIPTION]: PropTypes.string.isRequired
};

const mapStateToProps = state =>
{
    const {selectedResourcePackId} = state.ScreenManagementResourcePackList;
    return {
        selectedResourcePackId
    };
};

export default connect(mapStateToProps)(ResourcePack);
