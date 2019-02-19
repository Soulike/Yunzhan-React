import Functions from '../../Function';

const {requestPrefix} = Functions;

export function accountRequestPrefix(url)
{
    while (url.charAt(0) === '/')
    {
        url = url.substring(1);
    }
    return requestPrefix(`/account/${url}`);
}
