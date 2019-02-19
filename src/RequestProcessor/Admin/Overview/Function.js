import Functions from '../../../Function';
import {adminPrefix} from '../Functions';

const {removePrependSlashes} = Functions;

export function overviewPrefix(url)
{
    url = removePrependSlashes(url);
    return adminPrefix(`/overview/${url}`);
}
