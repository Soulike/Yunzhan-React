export default {
    EMAIL: /^.+@(?:\w+\.)+\w+$/,
    PASSWORD: /^\w{6,}$/,
    VERIFICATION_CODE: /^\w{4}$/,
    UUID: /^[A-z0-9]{6}$/,
    ADVERTISEMENT_NAME: /^.+$/,
    URL: /^http(?:s)?:\/\/(?:\w+.)+\w+(?:\/\w+)*\/?$/,
    TAG_NAME: /^[0-9A-z\u4e00-\u9fa5]{1,10}$/,
};
