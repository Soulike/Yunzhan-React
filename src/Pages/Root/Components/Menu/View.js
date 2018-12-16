import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View as Item} from './Components/Item';
import {Functions as LoginFunctions} from '../../../Login';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import style from './Menu.module.scss';
import {FuncItem, LinkItem} from './Components/Item/ItemObject';
import {setActiveItemId} from './Functions';

class Menu extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            items: [
                new LinkItem(solidIcon.faList, '概览', '/admin/overview'),
                new LinkItem(solidIcon.faDesktop, '屏幕管理', '/admin/screenManagement'),
                new LinkItem(solidIcon.faAd, '广告管理', '/admin/advertiseManagement'),
                new LinkItem(solidIcon.faTags, '标签管理', '/admin/tagManagement'),
                new LinkItem(solidIcon.faFileArchive, '资源包管理', '/admin/resourceManagement'),
                new FuncItem(solidIcon.faDoorOpen, '退出', LoginFunctions.showLogoutModal)
            ]
        };
    }

    componentDidMount()
    {
        const activeItemId = sessionStorage.getItem('activeItemId');
        if (activeItemId)
        {
            setActiveItemId(activeItemId);
        }
        else
        {
            setActiveItemId(0);
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
        const {items} = this.state;
        return (
            <div className={style.Menu}>
                {
                    items.map((item, i) =>
                    {
                        if (item instanceof LinkItem)
                        {
                            if (i === currentActiveItemId)
                            {
                                return (
                                    <span onClick={this.onItemClick(i)} key={item.href}>
                                    <Item {...item} isActive={true}/>
                                </span>
                                );
                            }
                            else
                            {
                                return (
                                    <span onClick={this.onItemClick(i)} key={item.href}>
                                    <Item {...item} isActive={false}/>
                                </span>
                                );
                            }
                        }
                        else
                        {
                            return (
                                <Item {...item} key={i} isActive={false}/>
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
        currentActiveItemId
    };
};

export default connect(mapStateToProps)(Menu);
