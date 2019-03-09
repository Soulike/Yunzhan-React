// 获取资源包列表动作
export const GET_RESOURCE_PACK_MANAGEMENT_BASIC_INFO_SUCCESSFUL = Symbol('getResourcePackManagementBasicInfoSuccessful');
export const GET_RESOURCE_PACK_MANAGEMENT_BASIC_INFO_FAILED = Symbol('getResourcePackManagementBasicInfoFailed');

export const GET_RESOURCE_PACK_LIST_SUCCESSFUL = Symbol('getResourcePackListSuccessful');
export const GET_RESOURCE_PACK_LIST_FAILED = Symbol('getResourcePackListFailed');

// 增加资源包组件选择标签动作
export const SELECT_TAG = Symbol('selectTag');
export const UNSELECT_TAG = Symbol('unselectTag');
export const UNSELECT_ALL_TAGS = Symbol('unselectAllTags');

// 增加资源包组件选择广告动作
export const SELECT_ADVERTISEMENT = Symbol('selectAdvertisement');
export const UNSELECT_ADVERTISEMENT = Symbol('unselectAdvertisement');
export const UNSELECT_ALL_ADVERTISEMENTS = Symbol('unselectAllAdvertisements');

// 修改资源包窗口选择标签动作
export const RESOURCE_PACK_SELECT_TAG = Symbol('resourcePackSelectTag');
export const RESOURCE_PACK_CLEAR_AND_SELECT_TAGS = Symbol('resourcePackSelectTags');
export const RESOURCE_PACK_UNSELECT_TAG = Symbol('resourcePackUnselectTag');
export const RESOURCE_PACK_UNSELECT_ALL_TAGS = Symbol('resourcePackUnselectAllTags');

// 修改资源包窗口选择广告动作
export const RESOURCE_PACK_SELECT_ADVERTISEMENT = Symbol('resourcePackSelectAdvertisement'); // 修改资源包窗口广告选取
export const RESOURCE_PACK_CLEAR_AND_SELECT_ADVERTISEMENTS = Symbol('resourcePackSelectAdvertisements');
export const RESOURCE_PACK_UNSELECT_ADVERTISEMENT = Symbol('resourcePackUnselectAdvertisement');
export const RESOURCE_PACK_UNSELECT_ALL_ADVERTISEMENTS = Symbol('resourcePackUnselectAllAdvertisements');