import {switchItem} from './Actions/Actions';
import Store from '../../../../Store';

export function setActiveItemId(itemId)
{
    Store.dispatch(switchItem(itemId));
    sessionStorage.setItem('activeItemId', itemId.toString());
}