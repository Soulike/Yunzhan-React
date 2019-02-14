import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './ResourcePack.module.scss';
import Store from '../../../../../../../../Store';
import * as Actions from './Actions/Actions';
import {connect} from 'react-redux';
import NAMESPACE from '../../../../../../../../Namespace';
import Functions from '../../../../../../../../Functions';

class ResourcePack extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            randomString: Functions.randomString(5),
        };
    }


    shouldComponentUpdate(nextProps, nextState, nextContext)
    {
        return nextProps.selectedResourcePackId !== this.props.selectedResourcePackId;
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        const {
            selectedResourcePackId,
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: id,
        } = this.props;
        const {randomString} = this.state;
        const $radioInput = document.querySelector(`#a${randomString}${id}`);
        $radioInput.checked = (selectedResourcePackId === id);
    }

    onResourcePackClick = () =>
    {
        const {[NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: id} = this.props;
        Store.dispatch(Actions.resourcePackClick(id));
    };

    onRadioInputClick = e =>
    {
        e.preventDefault();
        this.onResourcePackClick();
    };

    render()
    {
        const {
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: id,
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.NAME]: name,
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ADVERTISEMENT_AMOUNT]: advertisementNumber,
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.DESCRIPTION]: description,
        } = this.props;
        const {randomString} = this.state;
        return (
            <div className={style.ResourcePack} onClick={this.onResourcePackClick}>
                <input type="radio" id={`a${randomString}${id}`} className={style.radioInput}
                       onClick={this.onRadioInputClick} />
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
    [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.DESCRIPTION]: PropTypes.string.isRequired,
};

const mapStateToProps = state =>
{
    const {selectedResourcePackId} = state.ScreenManagementResourcePackList;
    return {
        selectedResourcePackId,
    };
};

export default connect(mapStateToProps)(ResourcePack);
