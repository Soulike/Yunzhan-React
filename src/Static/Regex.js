export const REGEX = {
    EMAIL: /^.+@(?:\w+\.)+\w+$/,
    PASSWORD: /^\w{6,}$/,
    VERIFICATION_CODE: /^\w{4}$/,
    UUID: /^[A-z0-9]{6}$/,
    ADVERTISEMENT_NAME: /^.+$/,
    URL: /^http(?:s)?:\/\/(?:\w+.)+\w+(?:\/\w+)*\/?$/,
    TAG_NAME: /^[0-9A-z\u4e00-\u9fa5]{1,10}$/,
};

export const TEXT = {
    PASSWORD: '6 位以上的数字、字母及下划线',
    UUID: '6 位数字或字母',
    TAG_NAME: '1 ~ 10 位数字、字母及汉字',
};