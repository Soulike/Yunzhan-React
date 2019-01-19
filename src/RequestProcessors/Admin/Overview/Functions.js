import Functions from '../../../Functions';
import {adminPrefix} from '../Functions';

const {removePrependSlashes} = Functions;

export function overviewPrefix(url)
{
    url = removePrependSlashes(url);
    return adminPrefix(`/admin/${url}`);
}
