import * as ActionTypes from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    switch (type)
    {
        case ActionTypes.GET_RESOURCE_PACK_MANAGEMENT_BASIC_INFO_SUCCESSFUL:
        {
            const {basicInfo} = action;
            return {
                ...state,
                basicInfo,
            };
        }
        case ActionTypes.SELECT_TAG:
        {
            const {tagId} = action;
            const {selectedTagIdSet} = state;
            selectedTagIdSet.add(tagId);
            return {
                ...state,
                selectedTagIdSet: new Set(selectedTagIdSet),
            };
        }
        case ActionTypes.UNSELECT_TAG:
        {
            const {tagId} = action;
            const {selectedTagIdSet} = state;
            selectedTagIdSet.delete(tagId);
            return {
                ...state,
                selectedTagIdSet: new Set(selectedTagIdSet),
            };
        }
        case ActionTypes.UNSELECT_ALL_TAGS:
        {
            return {
                ...state,
                selectedTagIdSet: new Set(),
            };
        }
        case ActionTypes.SELECT_ADVERTISEMENT:
        {
            const {advertisementId} = action;
            const {selectedAdvertisementIdSet} = state;
            selectedAdvertisementIdSet.add(advertisementId);
            return {
                ...state,
                selectedAdvertisementIdSet: new Set(selectedAdvertisementIdSet),
            };
        }
        case ActionTypes.UNSELECT_ADVERTISEMENT:
        {
            const {advertisementId} = action;
            const {selectedAdvertisementIdSet} = state;
            selectedAdvertisementIdSet.delete(advertisementId);
            return {
                ...state,
                selectedAdvertisementIdSet: new Set(selectedAdvertisementIdSet),
            };
        }
        case ActionTypes.UNSELECT_ALL_ADVERTISEMENTS:
        {
            return {
                ...state,
                selectedAdvertisementIdSet: new Set(),
            };
        }
        case ActionTypes.GET_RESOURCE_PACK_MANAGEMENT_BASIC_INFO_FAILED:
        default:
        {
            return state;
        }
    }
}