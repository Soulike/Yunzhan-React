# Yunzhan-React
Front part of project Yunzhan using React &amp; Redux.

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

# 目前已完成的请求路由

**目前计划所有请求都添加 `/server` 前缀以和 React 的路由区分。**

## 登录注册部分

#### 前缀为 `/account`

#### `/getVerificationCode`

- 类型：GET
- 提交数据：无
- data 域内容：不需要
- 说明：获取验证码

#### `/forgetPassword`

- 类型：POST
- 提交数据：
    - 注意密码格式现在使用 SHA-256 传输
```js
{
    email: 'user@example.com',
    newPassword: 'SHA256',
    verificationCode: 'aaaa'
}
```
- data 域内容：不需要
- 说明：code 404 代表用户不存在，403 表示验证码错误

#### `/signUp`

- 类型：POST
- 提交数据：
    - 注意密码格式现在使用 SHA-256 传输
```js
{
    email: 'user@example.com',
    password: 'SHA256',
    verificationCode: 'aaaa'
}
```
- data 域内容：不需要
- 说明：如果验证码错误就返回 403

#### `/login`

- 类型：POST
- 提交数据：
    - 注意密码格式现在使用 SHA-256 传输
```js
{
    email: 'user@example.com',
    password: 'SHA256',
}
```
- data 域内容：不需要
- 说明：使用 code 403 代表密码错误，code 404 代表用户不存在

#### `/verifySession`

- 类型：GET
- 提交数据：无
- data 域内容：不需要
- 说明：使用 code 401 代表 Session 失效，200 代表 Session 有效

#### `/logout`

- 类型：POST
- 提交数据：无
- data 域内容：不需要
- 说明：使当前用户的 Session 立即失效

---

## 管理部分

### 前缀为 `/admin`

### 概览

#### 前缀为 `/overview`

#### `/getLoginInfo`

- 类型：GET
- 提交数据：无
- data 域内容：
```js
{
    email: 'example@example.com',   // 本次登录用的 email
    lastLoginIp: '0.0.0.0',         // 上次登录 IP
    loginIp: '0.0.0.0',             // 本次登录 IP
    lastLoginTime: 0                // 上次登录时间，可以直接传数据库提取结果
}
```
- 说明：获取本次登录的基本信息

#### `/getScreenInfo`

- 类型：GET
- 提交数据：无
- data 域内容：
```js
{
    currentScreenNumber: 0,     // 当前共有多少个屏幕
    runningScreenNumber: 0      // 当前有多少个屏幕是在运行的
}
```
- 说明：获取当前屏幕的基本信息

#### `/getAdvertiseInfo`

- 类型：GET
- 提交数据：无
- data 域内容：
```js
{
    currentAdvertisementNumber: 0,      // 当前共有多少个广告
    currentPictureNumber: 0,            // 当前有多少个广告是图片
    advertiseFileSize: 0                // 当前广告文件占用总空间大小
}
```
- 说明：获取当前广告的基本信息

#### `/getResourceInfo`

- 类型：GET
- 提交数据：无
- data 域内容：
```js
{
    currentResourcePackNumber: 0,       // 当前资源包总个数
    currentUsingResourcePackNumber: 0   // 当前正在被使用的资源包个数
}
```
- 说明：获取当前资源包的基本信息

#### `/getTagInfo`

- 类型：GET
- 提交数据：无
- data 域内容：
```js
{
    currentTagNumber: 0     // 当前有多少个 Tag
}
```
- 说明：获取当前标签的基本信息

### 屏幕管理

#### 前缀为 `/screenManagement`

#### `/getBasicInfo`

- 类型：GET
- 提交数据：无
- data 域内容：
```js
{
    screenNum: 0,           // 总屏幕数
    runningScreenNum: 0,    // 运行中屏幕数
    abnormalEventNum: 0     // 异常事件个数
}
```
- 说明：获取屏幕管理基本信息

#### `/getLogList`

- 类型：GET
- 提交数据：无
- data 域内容：
```js
[
    {time: xxx, text: xxx},
    {time: xxx, text: xxx},
    {time: xxx, text: xxx},
    {time: xxx, text: xxx},
]
```
- 说明：获取屏幕相关的记录（添加删除异常情况等），按照时间顺序从近到远，返回前 20 条

### `/getScreenList`

- 类型：GET
- 提交数据：无
- data 域内容：
```js
[
    {
        id: xx, 
        uuid: xxxx, 
        name: xxx, 
        isRunning: true, 
        resourcePackId: xxx, 
        resourcePackName: xxx
    },
    {
        id: xx, 
        uuid: xxxx, 
        name: xxx, 
        isRunning: true, 
        resourcePackId: xxx, 
        resourcePackName: xxx
    }
]
```
- 说明：获取所有的屏幕信息。如果屏幕没有绑定资源包，资源包相关返回信息可以不写

### `/unbindResourcePacks`

- 类型：POST
- 提交数据：
```js
[id1, id2, id3] // 所有解绑资源包屏幕的 ID 数组
```
- data 域内容：无
- 说明：为屏幕解绑资源包。返回 403 如果有屏幕根本不属于该用户，返回 404 如果其中有屏幕不存在。如果屏幕本来就没有绑定资源包，不作操作。

### `/addScreen`

- 类型：POST
- 提交数据：
```js
{
    uuid: xxx
}
```
- data 域内容：无
- 说明：添加屏幕。如果 uuid 对应屏幕不存在返回 404

### `/deleteScreens`

- 类型：POST
- 提交数据：
```js
[id1, id2, id3] // 所有被删除屏幕的 ID 数组
```
- data 域内容：无
- 说明：删除屏幕。如果 id 对应屏幕不存在返回 404，如果 id 对应屏幕不属于该用户返回 403

### `/startScreens`

- 类型：POST
- 提交数据：
```js
[id1, id2, id3] // 所有尝试开始播放屏幕的 ID 数组
```
- data 域内容：无
- 说明：使屏幕开始播放。如果 id 对应屏幕不存在返回 404，如果 id 对应屏幕不属于该用户或启动失败返回 403。如果屏幕本来就是播放状态，不用做任何操作。

### `/stopScreens`

- 类型：POST
- 提交数据：
```js
[id1, id2, id3] // 所有停止播放屏幕的 ID 数组
```
- data 域内容：无
- 说明：停止屏幕播放。如果 id 对应屏幕不存在返回 404，如果 id 对应屏幕不属于该用户或停止失败返回 403。如果屏幕本来就是停止状态，不用做任何操作。

### `/getResourcePackList`

- 类型：GET
- 提交数据：无
- data 域数据：
```js
[
    {
        id: xxx,                // 资源包 ID
        name: xxx,              // 资源包名
        advertiseNumber: xxx,   // 内含广告数量
        description: xxx        // 资源包备注
    },
    {
        id: xxx,                // 资源包 ID
        name: xxx,              // 资源包名
        advertiseNumber: xxx,   // 内含广告数量
        description: xxx        // 资源包备注
    },
]
```
- 说明：获取当前用户资源包列表

### `/bindResourcePack`

- 类型：POST
- 提交数据：
```js
{
    screenIds: [id1,id2,id3],   // 绑定资源包的屏幕 id 列表
    resourcePackId: id          // 被绑定资源包的 id
} 
```
- data 域数据：无
- 说明：为屏幕绑定资源包。如果原来绑定别的资源包，就解绑并绑定现在的资源包。如果资源包或屏幕不存在，返回 404，如果存在资源包或屏幕不属于当前用户，返回 403。