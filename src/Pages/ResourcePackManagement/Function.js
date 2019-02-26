import Store from '../../Store';
import {getResourcePackManagementBasicInfoAction} from './Actions/Actions';

export function getResourcePackManagementBasicInfo()
{
    Store.dispatch(getResourcePackManagementBasicInfoAction());
}