import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {View as ToolTip} from '../../../../../../Components/Tooltip';

class ResourcePack extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            resourcePackTagNameList: [],
        };
    }

    onTagNameClick = async () =>
    {
        const {id, name, showTagListModalFunction} = this.props;
        await showTagListModalFunction(id, name);
    };

    onAdvertisementAmountClick = async () =>
    {
        const {id, name, showAdvertisementListModalFunction} = this.props;
        await showAdvertisementListModalFunction(id, name);
    };

    onScreenAmountClick = async () =>
    {
        const {id, name, showScreenNameListModalFunction} = this.props;
        await showScreenNameListModalFunction(id, name);
    };

    onChangeResourcePackButtonClick = async () =>
    {
        const {id, name, description, onChangeResourcePackButtonClickFunction} = this.props;
        await onChangeResourcePackButtonClickFunction(id, name, description);
    };

    render()
    {
        const {name, tagName, bindingAdvertisementAmount, bindingScreenAmount, description} = this.props;
        return (
            <tr className={Style.ResourcePack}>
                <td className={Style.resourcePackName}>{name}</td>
                <td onClick={this.onTagNameClick}>
                    <ToolTip placement={'top'} title={'点击查看标签列表'} className={Style.tagName}>
                        <span className="badge badge-primary">{tagName}</span>
                    </ToolTip>
                </td>
                <td onClick={this.onAdvertisementAmountClick}>
                    <ToolTip placement={'top'} title={'点击查看广告列表'} className={Style.advertisementAmount}>
                        {bindingAdvertisementAmount}
                    </ToolTip>
                </td>
                <td onClick={this.onScreenAmountClick}>
                    <ToolTip placement={'top'} title={'点击查看屏幕列表'} className={Style.screenAmount}>
                        {bindingScreenAmount}
                    </ToolTip>
                </td>
                <td>
                    <ToolTip placement={'top'} title={description} className={Style.description}>{description}</ToolTip>
                </td>
                <td className={Style.button}>
                    <button onClick={this.onChangeResourcePackButtonClick}
                            className={Style.changeResourcePackButton}>编辑
                    </button>
                </td>
            </tr>
        );
    }
}

ResourcePack.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    tagName: PropTypes.string.isRequired,
    bindingAdvertisementAmount: PropTypes.number.isRequired,
    bindingScreenAmount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    showTagListModalFunction: PropTypes.func.isRequired,
    showAdvertisementListModalFunction: PropTypes.func.isRequired,
    showScreenNameListModalFunction: PropTypes.func.isRequired,
    onChangeResourcePackButtonClickFunction: PropTypes.func.isRequired,
};

export default ResourcePack;