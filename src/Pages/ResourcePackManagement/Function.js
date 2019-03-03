import Store from '../../Store';
import {
    getResourcePackManagementBasicInfoAction,
    resourcePackSelectAdvertisementAction,
    resourcePackSelectAdvertisementsAction,
    resourcePackSelectTagAction,
    resourcePackSelectTagsAction,
    resourcePackUnselectAdvertisementAction,
    resourcePackUnselectAllAdvertisementsAction,
    resourcePackUnselectAllTagsAction,
    resourcePackUnselectTagAction,
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

export function resourcePackSelectTag(tagId)
{
    Store.dispatch(resourcePackSelectTagAction(tagId));
}

export function resourcePackSelectTags(tagIdArray)
{
    Store.dispatch(resourcePackSelectTagsAction(tagIdArray));
}

export function resourcePackUnselectTag(tagId)
{
    Store.dispatch(resourcePackUnselectTagAction(tagId));
}

export function resourcePackSelectAdvertisement(advertisementId)
{
    Store.dispatch(resourcePackSelectAdvertisementAction(advertisementId));
}

export function resourcePackSelectAdvertisements(advertisementIdArray)
{
    Store.dispatch(resourcePackSelectAdvertisementsAction(advertisementIdArray));
}

export function resourcePackUnselectAdvertisement(advertisementId)
{
    Store.dispatch(resourcePackUnselectAdvertisementAction(advertisementId));
}

export function resourcePackUnselectAllTags()
{
    Store.dispatch(resourcePackUnselectAllTagsAction());
}

export function resourcePackUnselectAllAdvertisements()
{
    Store.dispatch(resourcePackUnselectAllAdvertisementsAction());
}