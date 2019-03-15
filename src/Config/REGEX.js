export const REGEX = {
    EMAIL: /^.+@(?:\w+\.)+\w+$/,
    PASSWORD: /^\w{6,}$/,
    VERIFICATION_CODE: /^\w{4}$/,
    UUID: /^[A-z0-9]{8}$/,
    SCREEN_NAME: /^[0-9A-z\u4e00-\u9fa5]{1,10}$/,
    ADVERTISEMENT_NAME: /^.+$/,
    URL: /^http(?:s)?:\/\/(?:\w+.)+\w+(?:\/\w+)*\/?$/,
    TAG_NAME: /^[0-9A-z\u4e00-\u9fa5]{1,6}$/,
    RESOURCE_PACK_NAME: /^[0-9A-z\u4e00-\u9fa5]{1,10}$/,
};

export const REGEX_TEXT = {
    PASSWORD: '6 位以上的数字、字母及下划线',
    UUID: '8 位数字或字母',
    SCREEN_NAME: '1 ~ 10 位数字、字母及汉字',
    TAG_NAME: '1 ~ 6 位数字、字母及汉字',
    RESOURCE_PACK_NAME: '1 ~ 10 位数字、字母及汉字',
};