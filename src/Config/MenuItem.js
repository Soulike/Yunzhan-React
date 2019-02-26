import * as SolidIcon from '@fortawesome/free-solid-svg-icons';
import {FuncItem, LinkItem} from '../Pages/Root/Components/Menu/Components/Item/ItemObject';
import {Function as ModalFunction} from '../Components/Modal';
import {MODAL_ID} from '../Static/Constants';

import {View as Overview} from '../Pages/Overview';
import {View as ScreenManagement} from '../Pages/ScreenManagement';
import {View as AdvertisementManagement} from '../Pages/AdvertisementManagement';
import {View as TagManagement} from '../Pages/TagManagement';
import {View as ResourcePackManagement} from '../Pages/ResourcePackManagement';

// 以下利用了动态生成一个类数组对象并自定义迭代器，再利用 Array.from 转换为真数组的技术
const iterator = function* ()
{
    const length = Object.keys(this).length;
    for (let i = 0; i < length; i++)
    {
        yield this[i];
    }
};

/*如果想要添加新项目，只需在本页中所有对象里添加对应项即可*/

// 项目 ID，修改数字可以直接调整顺序。注意ID号必须连续且从0开始。
export const MENU_ITEM_ID = {
    OVERVIEW: 0,
    SCREEN_MANAGEMENT: 1,
    ADVERTISEMENT_MANAGEMENT: 2,
    TAG_MANAGEMENT: 3,
    RESOURCE_MANAGEMENT: 4,
    EXIT: 5,
};

// 从项目 ID 得到 URL，在路由文件处使用。注意，功能性按钮不放在这里
export const itemIdToUrl = Array.from({
    [MENU_ITEM_ID.OVERVIEW]: '/admin/overview',
    [MENU_ITEM_ID.SCREEN_MANAGEMENT]: '/admin/screenManagement',
    [MENU_ITEM_ID.ADVERTISEMENT_MANAGEMENT]: '/admin/advertisementManagement',
    [MENU_ITEM_ID.TAG_MANAGEMENT]: '/admin/tagManagement',
    [MENU_ITEM_ID.RESOURCE_MANAGEMENT]: '/admin/resourceManagement',

    [Symbol.iterator]: iterator,
});

// 功能性按钮的功能放在此处
export const itemIdToFunction = {
    [MENU_ITEM_ID.EXIT]: () =>
    {
        ModalFunction.showModal(MODAL_ID.LOGOUT_MODAL);
    },
};

// 从项目 URL 得到 ID
export const itemUrlToId = {
    [itemIdToUrl[MENU_ITEM_ID.OVERVIEW]]: MENU_ITEM_ID.OVERVIEW,
    [itemIdToUrl[MENU_ITEM_ID.SCREEN_MANAGEMENT]]: MENU_ITEM_ID.SCREEN_MANAGEMENT,
    [itemIdToUrl[MENU_ITEM_ID.ADVERTISEMENT_MANAGEMENT]]: MENU_ITEM_ID.ADVERTISEMENT_MANAGEMENT,
    [itemIdToUrl[MENU_ITEM_ID.TAG_MANAGEMENT]]: MENU_ITEM_ID.TAG_MANAGEMENT,
    [itemIdToUrl[MENU_ITEM_ID.RESOURCE_MANAGEMENT]]: MENU_ITEM_ID.RESOURCE_MANAGEMENT,
};

// 从项目ID得到Name
export const itemIdToName = {
    [MENU_ITEM_ID.OVERVIEW]: '概览',
    [MENU_ITEM_ID.SCREEN_MANAGEMENT]: '屏幕管理',
    [MENU_ITEM_ID.ADVERTISEMENT_MANAGEMENT]: '广告管理',
    [MENU_ITEM_ID.TAG_MANAGEMENT]: '标签管理',
    [MENU_ITEM_ID.RESOURCE_MANAGEMENT]: '资源包管理',
    [MENU_ITEM_ID.EXIT]: '退出',
};

// 从项目ID得到Icon
export const itemIdToIcon = {
    [MENU_ITEM_ID.OVERVIEW]: SolidIcon.faList,
    [MENU_ITEM_ID.SCREEN_MANAGEMENT]: SolidIcon.faDesktop,
    [MENU_ITEM_ID.ADVERTISEMENT_MANAGEMENT]: SolidIcon.faAd,
    [MENU_ITEM_ID.TAG_MANAGEMENT]: SolidIcon.faTags,
    [MENU_ITEM_ID.RESOURCE_MANAGEMENT]: SolidIcon.faFileArchive,
    [MENU_ITEM_ID.EXIT]: SolidIcon.faDoorOpen,
};

// 从项目 ID 得到 View，在路由文件处使用
export const itemIdToView = Array.from({
    [MENU_ITEM_ID.OVERVIEW]: Overview,
    [MENU_ITEM_ID.SCREEN_MANAGEMENT]: ScreenManagement,
    [MENU_ITEM_ID.ADVERTISEMENT_MANAGEMENT]: AdvertisementManagement,
    [MENU_ITEM_ID.TAG_MANAGEMENT]: TagManagement,
    [MENU_ITEM_ID.RESOURCE_MANAGEMENT]: ResourcePackManagement,

    [Symbol.iterator]: iterator,
});

export const itemList = Array.from({
    [MENU_ITEM_ID.OVERVIEW]: new LinkItem(itemIdToIcon[MENU_ITEM_ID.OVERVIEW], itemIdToName[MENU_ITEM_ID.OVERVIEW], itemIdToUrl[MENU_ITEM_ID.OVERVIEW]),
    [MENU_ITEM_ID.SCREEN_MANAGEMENT]: new LinkItem(itemIdToIcon[MENU_ITEM_ID.SCREEN_MANAGEMENT], itemIdToName[MENU_ITEM_ID.SCREEN_MANAGEMENT], itemIdToUrl[MENU_ITEM_ID.SCREEN_MANAGEMENT]),
    [MENU_ITEM_ID.ADVERTISEMENT_MANAGEMENT]: new LinkItem(itemIdToIcon[MENU_ITEM_ID.ADVERTISEMENT_MANAGEMENT], itemIdToName[MENU_ITEM_ID.ADVERTISEMENT_MANAGEMENT], itemIdToUrl[MENU_ITEM_ID.ADVERTISEMENT_MANAGEMENT]),
    [MENU_ITEM_ID.TAG_MANAGEMENT]: new LinkItem(itemIdToIcon[MENU_ITEM_ID.TAG_MANAGEMENT], itemIdToName[MENU_ITEM_ID.TAG_MANAGEMENT], itemIdToUrl[MENU_ITEM_ID.TAG_MANAGEMENT]),
    [MENU_ITEM_ID.RESOURCE_MANAGEMENT]: new LinkItem(itemIdToIcon[MENU_ITEM_ID.RESOURCE_MANAGEMENT], itemIdToName[MENU_ITEM_ID.RESOURCE_MANAGEMENT], itemIdToUrl[MENU_ITEM_ID.RESOURCE_MANAGEMENT]),
    [MENU_ITEM_ID.EXIT]: new FuncItem(itemIdToIcon[MENU_ITEM_ID.EXIT], itemIdToName[MENU_ITEM_ID.EXIT], itemIdToFunction[MENU_ITEM_ID.EXIT]),

    [Symbol.iterator]: iterator,
});