import Functions from '../../Functions';

const {requestPrefix, removePrependSlashes} = Functions;

export function adminPrefix(url)
{
    url = removePrependSlashes(url);
    return requestPrefix(`/admin/${url}`);
}
