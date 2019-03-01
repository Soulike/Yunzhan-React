import Store from '../../Store';
import {
    getResourcePackManagementBasicInfoAction,
    selectAdvertisementAction,
    selectTagAction,
    unselectAdvertisementAction,
    unselectAllAdvertisementsAction,
    unselectAllTagsAction,
    unselectTagAction,
} from './Actions/Actions';

export function getResourcePackManagementBasicInfo()
{
    Store.dispatch(getResourcePackManagementBasicInfoAction());
}

export function selectTag(tagId)
{
    Store.dispatch(selectTagAction(tagId));
}

export function unselectTag(tagId)
{
    Store.dispatch(unselectTagAction(tagId));
}

export function unselectAllTags()
{
    Store.dispatch(unselectAllTagsAction());
}

export function selectAdvertisement(advertisementId)
{
    Store.dispatch(selectAdvertisementAction(advertisementId));
}

export function unselectAdvertisement(advertisementId)
{
    Store.dispatch(unselectAdvertisementAction(advertisementId));
}

export function unselectAllAdvertisements()
{
    Store.dispatch(unselectAllAdvertisementsAction());
}