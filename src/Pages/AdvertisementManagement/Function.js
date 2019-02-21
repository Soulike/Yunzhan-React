import Store from '../../Store';
import {getAdvertisementListAction, getAdvertisementManagementBasicInfoAction} from './Actions/Actions';

export function getAdvertisementManagementBasicInfo()
{
    Store.dispatch(getAdvertisementManagementBasicInfoAction());
}

export function getAdvertisementList()
{
    Store.dispatch(getAdvertisementListAction());
}