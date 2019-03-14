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
                                    <div onClick={this.onItemClick(i)} key={i} className={Style.itemWrapper}>
                                        <Item {...item} isActive={true} />
                                    </div>
                                );
                            }
                            else
                            {
                                return (
                                    <div onClick={this.onItemClick(i)} key={i} className={Style.itemWrapper}>
                                        <Item {...item} isActive={false} />
                                    </div>
                                );
                            }
                        }
                        else
                        {
                            return (
                                <div key={i} className={Style.itemWrapper}>
                                    <Item {...item} isActive={false} />
                                </div>
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
