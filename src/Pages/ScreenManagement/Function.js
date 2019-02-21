import * as Actions from './Actions/Actions';
import Store from '../../Store';

export function getScreenManagementBasicInfo()
{
    Store.dispatch(Actions.getScreenManagementBasicInfoAction());
}

export function getScreenManagementLogList()
{
    Store.dispatch(Actions.getScreenManagementLogListAction());
}

export function getScreenList()
{
    Store.dispatch(Actions.getScreenListAction());
}

export function getResourcePackList()
{
    Store.dispatch(Actions.getResourcePackListAction());
}