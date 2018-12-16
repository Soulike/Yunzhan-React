import {switchItem} from './Actions/Actions';
import Store from '../../../../Store';
import {Items} from './MenuItems';

export function setActiveItemId(itemId)
{
    Store.dispatch(switchItem(itemId));
    sessionStorage.setItem('activeItemId', itemId.toString());
}

export function getItemId(url)
{
    return Items[url];
}