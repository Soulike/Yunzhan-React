# Yunzhan-React
Front part of project Yunzhan using React &amp; Redux.

## 返回格式约定

```js
{
    isSuccess: Boolean,
    msg: String,
    data: Object
}
```

`data` 的具体格式根据情况决定。


## 目前已完成的请求路由

### `/getVerificationCode`

- 类型：GET
- 提交数据：无
- 返回数据：只需要 `isSuccess` 域指定是否获取成功

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