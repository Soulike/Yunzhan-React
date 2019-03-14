import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './ResourcePack.module.scss';
import {connect} from 'react-redux';
import NAMESPACE from '../../../../../../../../Namespace';
import Functions from '../../../../../../../../Function';
import {View as Radio} from '../../../../../../../../Components/Bootstrap/Radio';
import {selectResourcePack} from '../../../../../../Function';

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
        const $radioInput = document.getElementById(`a${randomString}${id}`);
        $radioInput.checked = (selectedResourcePackId === id);
    }

    onResourcePackClick = () =>
    {
        const {[NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: id} = this.props;
        selectResourcePack(id);
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
            <div className={Style.ResourcePack} onClick={this.onResourcePackClick}>
                <Radio id={`a${randomString}${id}`} className={Style.radioInput} onClick={this.onRadioInputClick} />
                <div className={Style.name}>{name}</div>
                <div className={Style.advertiseNumber}>{advertisementNumber}</div>
                <div className={Style.description}>{description | ''}</div>
            </div>
        );
    }
}

ResourcePack.propTypes = {
    [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: PropTypes.number.isRequired,
    [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.NAME]: PropTypes.string.isRequired,
    [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ADVERTISEMENT_AMOUNT]: PropTypes.number.isRequired,
    [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.DESCRIPTION]: PropTypes.string,
};

const mapStateToProps = state =>
{
    const {ScreenManagement: {selectedResourcePackId}} = state;
    return {
        selectedResourcePackId,
    };
};

export default connect(mapStateToProps)(ResourcePack);
