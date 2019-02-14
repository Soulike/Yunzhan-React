import {switchItem} from './Actions/Actions';
import Store from '../../../../Store';
import {itemUrlToId} from './MenuItems';

export function setActiveItemId(itemId)
{
    Store.dispatch(switchItem(itemId));
    sessionStorage.setItem('activeItemId', itemId.toString());
}

export function getItemId(url)
{
    return itemUrlToId[url];
}