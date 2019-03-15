import React, {Component} from 'react';
import Style from './Style.module.scss';
import PropTypes from 'prop-types';
import {TOOLTIP_POSITION, View as ToolTip} from '../../../../../../Components/Bootstrap/Tooltip';

class Screen extends Component
{
    render()
    {
        const {uuid, screenName, screenIsRunning, resourcePackNameOfScreen} = this.props;
        return (
            <tr className={Style.Screen}>
                <th scope="row" className={Style.uuidGrid}>{uuid}</th>
                <td className={Style.screenNameGrid}>
                    <ToolTip placement={TOOLTIP_POSITION.TOP} title={screenName} className={Style.screenNameWrapper}>
                        {screenName}
                    </ToolTip>
                </td>
                <td className={Style.screenIsRunningGrid}>{screenIsRunning ?
                    <div className={Style.runningSign}><span className={Style.circle} /> 运行中</div> :
                    <div className={Style.notRunningSign}><span className={Style.circle} /> 未运行</div>
                }</td>
                <td className={Style.resourcePackNameOfScreenGrid}>
                    <ToolTip placement={TOOLTIP_POSITION.TOP}
                             title={resourcePackNameOfScreen}
                             className={Style.resourcePackNameOfScreenWrapper}>
                        {resourcePackNameOfScreen}
                    </ToolTip>
                </td>
                <td className={Style.changeScreenButtonGrid}>
                    <button className={Style.changeScreenButton}>编辑</button>
                </td>
            </tr>
        );
    }
}

Screen.propTypes = {
    screenId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    uuid: PropTypes.string.isRequired,
    screenName: PropTypes.string.isRequired,
    screenIsRunning: PropTypes.bool.isRequired,
    resourcePackNameOfScreen: PropTypes.string,
};

export default Screen;