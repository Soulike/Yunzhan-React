import React, {Component} from 'react';
import {View as Item} from './Components/Item';
import * as solidIcon from '@fortawesome/free-solid-svg-icons';
import style from './Menu.module.scss';

class Menu extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            items: [
                {
                    icon: solidIcon.faList,
                    text: '概览',
                    href: '/admin/overView'
                },
                {
                    icon: solidIcon.faDesktop,
                    text: '屏幕管理',
                    href: '/admin/screenManagement'
                },
                {
                    icon: solidIcon.faAd,
                    text: '广告管理',
                    href: '/admin/advertiseManagement'
                },
                {
                    icon: solidIcon.faTags,
                    text: '标签管理',
                    href: '/admin/tagManagement'
                },
                {
                    icon: solidIcon.faFileArchive,
                    text: '资源包管理',
                    href: '/admin/resourceManagement'
                },
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
                    })
                }
            </div>
        );
    }
}

export default Menu;