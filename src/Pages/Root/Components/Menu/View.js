import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View as Item} from './Components/Item';
import style from './Menu.module.scss';
import {LinkItem} from './Components/Item/ItemObject';
import {setActiveItemId} from './Functions';
import {itemList, MENU_ITEM_ID} from '../../../../Config/MenuItem';

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
            <div className={style.Menu}>
                {
                    itemList.map((item, i) =>
                    {
                        if (item instanceof LinkItem)
                        {
                            if (i === currentActiveItemId)
                            {
                                return (
                                    <span onClick={this.onItemClick(i)} key={item.href}>
                                    <Item {...item} isActive={true} />
                                </span>
                                );
                            }
                            else
                            {
                                return (
                                    <span onClick={this.onItemClick(i)} key={item.href}>
                                    <Item {...item} isActive={false} />
                                </span>
                                );
                            }
                        }
                        else
                        {
                            return (
                                <Item {...item} key={i} isActive={false} />
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
