import * as SolidIcon from '@fortawesome/free-solid-svg-icons';
import {FuncItem, LinkItem} from './Components/Item/ItemObject';
import {Functions as LoginFunctions} from '../../../Login';


export const itemUrlToId = {
    '/admin/overview': 0,
    '/admin/screenManagement': 1,
    '/admin/advertiseManagement': 2,
    '/admin/tagManagement': 3,
    '/admin/resourceManagement': 4,
};

export const itemIdToName = {
    0: '概览',
    1: '屏幕管理',
    2: '广告管理',
    3: '标签管理',
    4: '资源包管理',
    5: '退出',
};

export const itemIdToIcon = {
    0: SolidIcon.faList,
    1: SolidIcon.faDesktop,
    2: SolidIcon.faAd,
    3: SolidIcon.faTags,
    4: SolidIcon.faFileArchive,
    5: SolidIcon.faDoorOpen,
};

export const itemList = [
    new LinkItem(itemIdToIcon[0], itemIdToName[0], '/admin/overview'),
    new LinkItem(itemIdToIcon[1], itemIdToName[1], '/admin/screenManagement'),
    new LinkItem(itemIdToIcon[2], itemIdToName[2], '/admin/advertiseManagement'),
    new LinkItem(itemIdToIcon[3], itemIdToName[3], '/admin/tagManagement'),
    new LinkItem(itemIdToIcon[4], itemIdToName[4], '/admin/resourceManagement'),
    new FuncItem(itemIdToIcon[5], itemIdToName[5], LoginFunctions.showLogoutModal),
];