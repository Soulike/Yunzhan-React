import React, {Component} from 'react';
import {ItemObjects, View as Item} from './Components/Item';
import {Functions} from '../../../Login';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import style from './Menu.module.scss';
import {FuncItem, LinkItem} from './Components/Item/Item';

class Menu extends Component
{
    constructor()
    {
        super(...arguments);
        const {LinkItem, FuncItem} = ItemObjects;
        this.state = {
            items: [
                new LinkItem(solidIcon.faList, '概览', '/admin/overview'),
                new LinkItem(solidIcon.faDesktop, '屏幕管理', '/admin/screenManagement'),
                new LinkItem(solidIcon.faAd, '广告管理', '/admin/advertiseManagement'),
                new LinkItem(solidIcon.faTags, '标签管理', '/admin/tagManagement'),
                new LinkItem(solidIcon.faFileArchive, '资源包管理', '/admin/resourceManagement'),
                new FuncItem(solidIcon.faDoorOpen, '退出', Functions.showLogoutModal)
            ],
            activeItemIndex: 0
        };
    }

    onItemClick = itemIndex =>
    {
        return () =>
        {
            this.setState({
                activeItemIndex: itemIndex
            });
        };
    };


    render()
    {
        const {items, activeItemIndex} = this.state;
        return (
            <div className={style.Menu}>
                {
                    items.map((item, i) =>
                    {
                        if (item instanceof LinkItem)
                        {
                            if (i === activeItemIndex)
                            {
                                return (
                                    <span onClick={this.onItemClick(i)}>
                                    <Item {...item} key={item.href} isActive={true}/>
                                </span>
                                );
                            }
                            else
                            {
                                return (
                                    <span onClick={this.onItemClick(i)}>
                                    <Item {...item} key={item.href} isActive={false}/>
                                </span>
                                );
                            }
                        }
                        else
                        {
                            return (
                                <Item {...item} key={item.href} isActive={false}/>
                            );
                        }
                    })
                }
            </div>
        );
    }
}

export default Menu;
