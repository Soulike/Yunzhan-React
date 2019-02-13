// 服务器返回值代码
export const STATUS_CODE = {
    SUCCESS: 200,
    WRONG_PARAMETER: 400,
    INVALID_SESSION: 401,
    REJECTION: 403,
    CONTENT_NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

export const MODAL_ID = {
    LOGOUT_MODAL: 'logoutModal',
    ADD_SCREEN_MODAL: 'addScreenModal',
    BIND_RESOURCE_PACK_MODAL: 'bindResourcePackModal',
    UNBIND_RESOURCE_PACK_MODAL: 'unbindResourcePackModal',
    DELETE_SCREEN_MODAL: 'deleteScreenModal',
    START_SCREEN_RUNNING_MODAL: 'startScreenRunningModal',
    STOP_SCREEN_RUNNING_MODAL: 'stopScreenRunningModal',
    BATCH_BIND_RESOURCE_PACK_MODAL: 'batchBindResourcePackModal',
    BATCH_UNBIND_RESOURCE_PACK_MODAL: 'batchUnbindResourcePackModal',
};