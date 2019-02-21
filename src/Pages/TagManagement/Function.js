import Store from '../../Store';
import * as Actions from './Actions/Actions';

export function getTagManagementBasicInfo()
{
    Store.dispatch(Actions.getTagManagementBasicInfoAction());
}

export function getTagList()
{
    Store.dispatch(Actions.getTagListAction());
}