import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View as Item} from './Components/Item';
import Style from './Menu.module.scss';
import {LinkItem} from './Components/Item/ItemObject';
import {setActiveItemId} from './Functions';
import {ITEM_LIST, MENU_ITEM_ID} from '../../../../Config/MENU_ITEM';

class Menu extends Component
{
    componentDidMount()
    {
        const activeItemId = sessionStorage.getItem('activeItemId');
        if (activeItemId)
        {
            setActiveItemId(activeItemId);
        }
        else
        {
            setActiveItemId(MENU_ITEM_ID.OVERVIEW);
        }
    }

    onItemClick = itemId =>
    {
        return () =>
        {
            setActiveItemId(itemId);
        };
    };


    render()
    {
        const {currentActiveItemId} = this.props;
        return (
            <div className={Style.Menu}>
                {
                    ITEM_LIST.map((item, i) =>
                    {
                        if (item instanceof LinkItem)
                        {
                            if (i === currentActiveItemId)
                            {
                                return (
                                    <span onClick={this.onItemClick(i)} key={i}>
                                    <Item {...item} isActive={true} />
                                </span>
                                );
                            }
                            else
                            {
                                return (
                                    <span onClick={this.onItemClick(i)} key={i}>
                                    <Item {...item} isActive={false} />
                                </span>
                                );
                            }
                        }
                        else
                        {
                            return (
                                <span key={i}>
                                    <Item {...item} isActive={false} />
                                </span>
                            );
                        }
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = (state) =>
{
    const {currentActiveItemId} = state.RootMenu;
    return {
        currentActiveItemId,
    };
};

export default connect(mapStateToProps)(Menu);
