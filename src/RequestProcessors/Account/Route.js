import {accountPrefix} from './Functions';

export const GET_VERIFICATION_CODE = accountPrefix('/getVerificationCode');

export const FORGET_PASSWORD = accountPrefix('/forgetPassword');

export const SIGN_UP = accountPrefix('/signUp');

export const LOGIN = accountPrefix('/login');

export const VERIFY_SESSION = accountPrefix('/verifySession');

export const LOGOUT = accountPrefix('/logout');
