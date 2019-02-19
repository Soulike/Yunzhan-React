# Yunzhan-React

云展前端部分。

# 返回格式约定

```js
{
    code: Number,
    data: Object
}
```

`code` 指定这次请求的状态，前端可以根据这个编码来决定做什么。目前需要的代码如下

- 200 请求成功
- 400 请求参数不正确，比如提交的对象需要提供键 a 但提交上来的对象没有
- 401 当前请求 Session 无效
- 403 请求被拒绝，用于处理不合理的请求，例如登录密码错误或删除别人的东西
- 404 请求的内容不存在
- 500 服务器发生错误

`data` 的具体格式根据情况决定。

---

# 各个请求的详细信息 (所有请求前缀均为 /server)

信息格式：

```markdown
- 功能说明：    // 请求实现的功能
- 请求方法：    // HTTP 请求方法
- 请求体：      // 请求体
- 响应体：      // 响应体，不包括状态码部分，即 data 部分
- 其他说明：    // 其他补充说明
```

其中请求体与响应体中内容需要标识类型。

**所有的键名已经替换成命名空间形式以便维护。文件处于项目 Namespace 文件夹下。**

**注释 index.js 下的 `export default` 并启用 `module.export` 即可在 Node 下使用。**

---

## 登录注册部分 (前缀为 `/account`) 

#### `/getVerificationCode`

- 功能说明：获取验证码
- 请求方法：GET
- 请求体：无
- 响应体：无
- 其他说明：无

#### `/forgetPassword`

- 功能说明：发送忘记密码请求
- 请求方法：POST
- 请求体：
```js
{
    [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: String,
    [NAMESPACE.ACCOUNT.VERIFICATION.NEW_PASSWORD]: String,
    [NAMESPACE.ACCOUNT.VERIFICATION.VERIFICATION_CODE]: String
}
```
- 响应体：无
- 其他说明：code 404 代表用户不存在，403 表示验证码错误。

#### `/signUp`

- 功能说明：发送注册信息
- 请求方法：POST
- 请求体：
```js
{
    [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: String,
    [NAMESPACE.ACCOUNT.VERIFICATION.PASSWORD]: String,
    [NAMESPACE.ACCOUNT.VERIFICATION.VERIFICATION_CODE]: String
}
```
- 响应体：无
- 其他说明：如果验证码错误就返回 403

#### `/login`

- 功能说明：发送登录信息
- 请求方法：POST
- 请求体：
```js
{
    [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]:String,
    [NAMESPACE.ACCOUNT.ACCOUNT.PASSWORD]:String
}
```
- 响应体：无
- 其他说明：使用 code 403 代表密码错误，code 404 代表用户不存在

#### `/verifySession`

- 功能说明：验证当前 Session 是否有效
- 请求方法：GET
- 请求体：无
- 响应体：无
- 其他说明：使用 code 401 代表 Session 失效，200 代表 Session 有效

#### `/logout`

- 功能说明：使当前用户 Session 立即失效
- 请求方法：POST
- 请求体：无
- 响应体：无
- 其他说明：无

---

## 管理部分 (前缀为 `/admin`)

### 概览 (前缀为 `/overview`)

#### `/getLoginInfo`

- 功能说明：获取本次登录的基本信息
- 请求方法：GET
- 请求体：无
- 响应体：
```js
{
    [NAMESPACE.ACCOUNT.ACCOUNT.EMAIL]: String,
    [NAMESPACE.OVERVIEW.LOGIN_INFO.LAST_LOGIN_IP]: String,//上次登录 IP
    [NAMESPACE.OVERVIEW.LOGIN_INFO.CURRENT_LOGIN_IP]: String,// 本次登录 IP
    [NAMESPACE.OVERVIEW.LOGIN_INFO.LAST_LOGIN_TIME]: String,// 上次登录时间
}
```
- 其他说明：无

#### `/getScreenInfo`

- 功能说明：获取当前屏幕的基本信息
- 请求方法：GET
- 请求体：无
- 响应体：
```js
{
    [NAMESPACE.OVERVIEW.SCREEN_INFO.CURRENT_SCREEN_AMOUNT]: Number,// 总共有多少个屏幕
    [NAMESPACE.OVERVIEW.SCREEN_INFO.RUNNING_SCREEN_AMOUNT]: Number,// 现在有多少个屏幕在运行
}
```
- 其他说明：无

#### `/getAdvertisementInfo`

- 功能说明：获取当前广告的基本信息
- 请求方法：GET
- 请求体：无
- 响应体：
```js
{
    [NAMESPACE.OVERVIEW.ADVERTISEMENT_INFO.CURRENT_ADVERTISEMENT_AMOUNT]: Number,// 总共有多少广告
    [NAMESPACE.OVERVIEW.ADVERTISEMENT_INFO.CURRENT_IMAGE_AMOUNT]: Number,// 有多少广告是图片形式的
    [NAMESPACE.OVERVIEW.ADVERTISEMENT_INFO.ADVERTISEMENT_FILE_SIZE]: Number,// 广告占用了多少存储空间
}
```
- 其他说明：无

#### `/getResourcePackInfo`

- 功能说明：获取当前资源包的基本信息
- 请求方法：GET
- 请求体：无
- 响应体：
```js
{
    [NAMESPACE.OVERVIEW.RESOURCE_PACK_INFO.CURRENT_RESOURCE_PACK_AMOUNT]: 0,// 当前资源包总个数
    [NAMESPACE.OVERVIEW.RESOURCE_PACK_INFO.CURRENT_RESOURCE_PACK_IN_USING_AMOUNT]: 0, // 当前正在被使用的资源包个数
}
```
- 其他说明：无

#### `/getTagInfo`

- 功能说明：获取当前标签的基本信息
- 请求方法：GET
- 请求体：无
- 响应体：
```js
{
    [NAMESPACE.OVERVIEW.TAG_INFO.CURRENT_TAG_AMOUNT]: 0     // 当前有多少个 Tag
}
```
- 其他说明：无

### 屏幕管理 (前缀为 `/screenManagement`) 

#### `/getBasicInfo`

- 功能说明：获取屏幕管理基本信息
- 请求方法：GET
- 请求体：无
- 响应体：
```js
{
    [NAMESPACE.SCREEN_MANAGEMENT.BASIC_INFO.SCREEN_AMOUNT]: 0,// 总屏幕数
    [NAMESPACE.SCREEN_MANAGEMENT.BASIC_INFO.RUNNING_SCREEN_AMOUNT]: 0,// 运行中屏幕数
    [NAMESPACE.SCREEN_MANAGEMENT.BASIC_INFO.ABNORMAL_EVENT_AMOUNT]: 0// 异常事件个数
}
```
- 其他说明：无

#### `/getLogList`

- 功能说明：获取屏幕相关的记录（添加删除异常情况等），按照时间顺序从近到远，返回前 20 条
- 请求方法：GET
- 请求体：无
- 响应体：
```js
{
    [NAMESPACE.SCREEN_MANAGEMENT.LIST.LOG]: [
        {
            [NAMESPACE.SCREEN_MANAGEMENT.LOG.TIME]: String,
            [NAMESPACE.SCREEN_MANAGEMENT.LOG.CONTENT]: String
        },
        {
            [NAMESPACE.SCREEN_MANAGEMENT.LOG.TIME]: String,
            [NAMESPACE.SCREEN_MANAGEMENT.LOG.CONTENT]: String
        },
        {
            [NAMESPACE.SCREEN_MANAGEMENT.LOG.TIME]: String,
            [NAMESPACE.SCREEN_MANAGEMENT.LOG.CONTENT]: String
        },
    ]
}
```
- 其他说明：无

#### `/getScreenList`

- 功能说明：获取所有的屏幕信息。如果屏幕没有绑定资源包，资源包相关返回信息可以不写
- 请求方法：GET
- 请求体：无
- 响应体：
```js
{
    [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN]: [
        {
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: Number,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: String,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.NAME]: String,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.IS_RUNNING]: Boolean,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_ID]: Number,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_NAME]: String
        },
        {
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.ID]: Number,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.UUID]: String,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.NAME]: String,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.IS_RUNNING]: Boolean,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_ID]: Number,
            [NAMESPACE.SCREEN_MANAGEMENT.SCREEN.RESOURCE_PACK_NAME]: String
        }
    ]
}
```
- 其他说明：无

#### `/unbindResourcePack`

- 功能说明：为屏幕解绑资源包。
- 请求方法：POST
- 请求体：
```js
{
    [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN_ID]: Array // 所有解绑资源包屏幕的 ID 数组
}
```
- 响应体：无
- 其他说明：返回 403 如果有屏幕根本不属于该用户，返回 404 如果其中有屏幕不存在。如果屏幕本来就没有绑定资源包，不作操作。

#### `/addScreen`

- 功能说明：添加屏幕。
- 请求方法：POST
- 请求体：
```js
{
    uuid: xxx
}
```
- 响应体：无
- 其他说明：如果 uuid 对应屏幕不存在返回 404

#### `/deleteScreen`

- 功能说明：删除屏幕。
- 请求方法：POST
- 请求体：
```js
{
    [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN_ID]: Array// 所有被删除屏幕的 ID 数组
}
```
- 响应体：无
- 其他说明：如果 id 对应屏幕不存在返回 404，如果 id 对应屏幕不属于该用户返回 403

#### `/startScreen`

- 功能说明：使屏幕开始播放。
- 请求方法：POST
- 请求体：
```js
{
    [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN_ID]: Array// 所有开始播放屏幕的 ID 数组
}
```
- 响应体：无
- 其他说明：如果 id 对应屏幕不存在返回 404，如果 id 对应屏幕不属于该用户或启动失败返回 403。如果屏幕本来就是播放状态，不用做任何操作。

#### `/stopScreen`

- 功能说明：停止屏幕播放。
- 请求方法：POST
- 请求体：
```js
{
    [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN_ID]: Array// 所有停止播放屏幕的 ID 数组
}
```
- 响应体：无
- 其他说明：如果 id 对应屏幕不存在返回 404，如果 id 对应屏幕不属于该用户或停止失败返回 403。如果屏幕本来就是停止状态，不用做任何操作。

#### `/getResourcePackList`

- 功能说明：获取当前用户资源包列表。
- 请求方法：GET
- 请求体：无
- 响应体：
```js
{
    [NAMESPACE.RESOURCE_PACK_MANAGEMENT.LIST.RESOURCE_PACK]:[
        {
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: Number,// 资源包 ID
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.NAME]: String,// 资源包名
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ADVERTISEMENT_AMOUNT]: Number,// 内含广告数量
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.DESCRIPTION]: String// 资源包备注
        },
        {
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: Number,// 资源包 ID
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.NAME]: String,// 资源包名
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ADVERTISEMENT_AMOUNT]: Number,// 内含广告数量
            [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.DESCRIPTION]: String// 资源包备注
        },
    ]
}
```
- 其他说明：无

#### `/bindResourcePack`

- 功能说明：为屏幕绑定资源包。
- 请求方法：POST
- 请求体：
```js
{
    [NAMESPACE.SCREEN_MANAGEMENT.LIST.SCREEN]: Array,   // 绑定资源包的屏幕 id 列表
    [NAMESPACE.RESOURCE_PACK_MANAGEMENT.RESOURCE_PACK.ID]: Number          // 被绑定资源包的 id
} 
```
- 响应体：无
- 其他说明：如果原来绑定别的资源包，就解绑并绑定现在的资源包。如果资源包或屏幕不存在，返回 404，如果存在资源包或屏幕不属于当前用户，返回 403。

### 广告管理（前缀为 `/advertisementManagement`

#### `/getBasicInfo`

- 功能说明：获取广告管理基本信息
- 请求方法：GET
- 请求体：无
- 响应体：
```js
{
    [NAMESPACE.ADVERTISEMENT_MANAGEMENT.BASIC_INFO.ADVERTISEMENT_AMOUNT]: 0,// 总广告数
    [NAMESPACE.ADVERTISEMENT_MANAGEMENT.BASIC_INFO.IMAGE_AMOUNT]: 0,// 图片形式的广告数
    [NAMESPACE.ADVERTISEMENT_MANAGEMENT.BASIC_INFO.ADVERTISEMENT_FILE_SIZE]: 0// 广告占用空间大小，单位是字节
}
```
- 其他说明：无

#### `/uploadVideo`

- 功能说明：上传视频形式广告
- 请求方法：POST
- 请求体：FormData 对象，其中键有
  - [NAMESPACE.ADVERTISEMENT_MANAGEMENT.VIDEO.NAME]: String // 文件名
  - [NAMESPACE.ADVERTISEMENT_MANAGEMENT.VIDEO.FILE]: Binary // 文件内容
- 响应体：无
- 其他说明：无

#### `/uploadImage`

- 功能说明：上传图片形式广告
- 请求方法：POST
- 请求体：FormData 对象，其中键有
  - [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.NAME]: String // 文件名
  - [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_URL]: String // 二维码 URL
  - [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_POSITION]: String // 二维码位置
  - [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.FILE]: Binary // 文件内容
- 响应体：无
- 其他说明：
  - 目前位置信息常量
```js
export const QRCodePositionId = {
    TOP_LEFT: 1,
    TOP_RIGHT: 2,
    BOTTOM_LEFT: 3,
    BOTTOM_RIGHT: 4,
};

export const QRCodePositionIdToName = {
    [QRCodePositionId.TOP_LEFT]: '左上',
    [QRCodePositionId.TOP_RIGHT]: '右上',
    [QRCodePositionId.BOTTOM_LEFT]: '左下',
    [QRCodePositionId.BOTTOM_RIGHT]: '右下',
};
```

#### `/getAdvertisementList`

- 功能说明：获取广告列表
- 请求方法：GET
- 请求体：无
- 响应体：
```js
{
    [NAMESPACE.ADVERTISEMENT_MANAGEMENT.LIST.ADVERTISEMENT]: {
        // 该对象的键是广告的 ID
        1: {
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.TYPE]: Number, // 广告类型，枚举值
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME]: String, // 文件名
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.URL]: String, // 预览 URL
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_URL]: String, // 二维码 URL
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_POSITION]: String, // 二维码位置
        },
        2: {
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.TYPE]: Number, // 广告类型，枚举值
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME]: String, // 文件名
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.URL]: String, // 预览 URL
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_URL]: String, // 二维码 URL
            [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_POSITION]: String, // 二维码位置
        },
    }
}
```
- 其他说明：
  - 广告类型枚举对象
```js
{
    IMAGE: 0,
    VIDEO: 1,
}
```

#### `/updateAdvertisementInfo`

- 功能说明：修改广告信息
- 请求方法：POST
- 请求体：
```js
{
    [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.ID]: Number, // 文件 ID
    [NAMESPACE.ADVERTISEMENT_MANAGEMENT.ADVERTISEMENT.NAME]: String, // 文件名
    [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_URL]: String, // 二维码 URL
    [NAMESPACE.ADVERTISEMENT_MANAGEMENT.IMAGE.QR_CODE_POSITION]: Number, // 二维码位置
}
```
- 响应体：无
- 其他说明：无

### 标签管理 (前缀为 `/tagManagement`)

#### `/getBasicInfo`

- 功能说明：获取标签基本信息
- 请求方法：GET
- 请求体：无
- 响应体：
```js
{
    [NAMESPACE.TAG_MANAGEMENT.BASIC_INFO.TAG_AMOUNT]: Number, // 总标签数
    [NAMESPACE.TAG_MANAGEMENT.BASIC_INFO.USING_TAG_AMOUNT]: Number, // 正在使用的标签数
}
```
- 其他说明：无