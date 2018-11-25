import {getAsync, getSHA256, requestPrefix} from '../../Static/Functions';
import Alert from '../../Components/Alert/View';

export function requireLogin(nextState, replace)
{
    if (!isLoginTokenValid())
    {
        Alert.show('请先登录');
        replace('/login');
    }
    else
    {
        getAsync(requestPrefix('/verifySession'), false)
            .then(res =>
            {
                const {isSuccess} = res;
                if (isSuccess)
                {
                    setLoginToken();
                }
                else
                {
                    Alert.show('请先登录', false);
                    removeLoginToken();
                    replace('/login');
                }
            });
    }
}

function setLoginToken()
{
    sessionStorage.setItem('token', getSHA256(Date.now().toString()));
}

function isLoginTokenValid()
{
    const token = sessionStorage.getItem('token');
    return !!token;
}

function removeLoginToken()
{
    sessionStorage.removeItem('token');
}
