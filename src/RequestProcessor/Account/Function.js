import Functions from '../../Function';

const {requestPrefix, removePrependSlashes} = Functions;

export function accountPrefix(url)
{
    url = removePrependSlashes(url);
    return requestPrefix(`/account/${url}`);
}
