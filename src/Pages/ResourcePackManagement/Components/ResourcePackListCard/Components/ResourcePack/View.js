import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Style from './Style.module.scss';
import {View as ToolTip} from '../../../../../../Components/Tooltip';

class ResourcePack extends Component
{
    render()
    {
        const {id, name, tagName, bindingAdvertisementAmount, bindingScreenAmount, description} = this.props;
        return (
            <tr className={Style.ResourcePack}>
                <td className={Style.resourcePackName}>{name}</td>
                <td className={Style.tagName}>{tagName}</td>
                <td>
                    <ToolTip placement={'top'} title={'点击查看广告列表'} className={Style.advertisementAmount}>
                        {bindingAdvertisementAmount}
                    </ToolTip>
                </td>
                <td>
                    <ToolTip placement={'top'} title={'点击查看屏幕列表'} className={Style.screenAmount}>
                        {bindingScreenAmount}
                    </ToolTip>
                </td>
                <td>
                    <ToolTip placement={'top'} title={description} className={Style.description}>{description}</ToolTip>
                </td>
                <td className={Style.button}>
                    <button className={Style.changeResourcePackButton}>编辑</button>
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
};

export default ResourcePack;