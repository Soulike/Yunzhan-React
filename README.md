# Yunzhan-React
Front part of project Yunzhan using React &amp; Redux.

## 返回格式约定

```js
{
    isSuccess: Boolean,
    code: Number,
    msg: String,
    data: Object
}
```

`code` 指定这次请求的状态，前端可以根据这个编码来决定做什么。目前需要的代码如下

- 200：请求成功，默认值
- 401：请求失败，需要 Session 信息但是 Session 无效
    - 我需要这个代码来决定是否跳转回去让用户重新登录
- 500：服务器错误

`data` 的具体格式根据情况决定。

---

## 目前已完成的请求路由

### `/getVerificationCode`

- 类型：GET
- 提交数据：无
- 返回数据：只需要 `isSuccess` 域指定是否获取成功
- 说明：获取验证码

### `/forgetPassword`

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
- 返回数据：只需要 `isSuccess` 域指定是否修改密码成功

### `/signUp`

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
- 返回数据：只需要 `isSuccess` 域指定是否注册成功

### `/login`

- 类型：POST
- 提交数据：
    - 注意密码格式现在使用 SHA-256 传输
```js
{
    email: 'user@example.com',
    password: 'SHA256',
}
```
- 返回数据：只需要 `isSuccess` 域指定是否登录成功

### `/verifySession`

- 类型：GET
- 提交数据：无
- 返回数据：只需要 `isSuccess` 域指定这个请求的 Session 是否是有效的

### `/logout`

- 类型：POST
- 提交数据：无
- 返回数据：只需要 `isSuccess` 域指定这个请求的 Session 是否是有效的
- 说明：使当前用户的 Session 立即失效