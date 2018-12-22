import axios from 'axios';
import crypto from 'crypto';

export function requestPrefix(url)
{
    while (url.charAt(0) === '/')
    {
        url = url.substring(1);
    }
    return `/server/${url}`;
}

// TODO: 把之前所有的调用都改成 code 形式
export async function getAsync(url, allowCache = true, params = {}, config = {})
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            const res = await axios.get(url, allowCache ? {params, ...config} : {
                params: {
                    ...params,
                    _t: Date.now()
                },
                ...config
            });
            resolve(res.data);
        }
        catch (e)
        {
            reject(e);
        }
    });

}

export async function postAsync(url, params = {}, config = {})
{
    return new Promise(async (resolve, reject) =>
    {
        try
        {
            const res = await axios.post(url, params, config);
            resolve(res.data);
        }
        catch (e)
        {
            reject(e);
        }
    });
}

export function downloadFile(url)
{
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = url;
    iframe.onload = function ()
    {
        document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
}

export function prefixZero(num)
{
    if (num >= 0 && num < 10)
    {
        return '0' + num.toString();
    }
    else
    {
        return num.toString();
    }

}

export function getHash(text, hashMethod)
{
    const hash = crypto.createHash(hashMethod);
    hash.update(text);
    return hash.digest('hex');
}

export function getSHA256(text)
{
    return getHash(text, 'sha256');
}

export function generateTimeStr(time)
{
    const MILLISECONDS = {
        YEAR: 365 * 24 * 60 * 60 * 1000,
        MONTH: 30 * 24 * 60 * 60 * 1000,
        WEEK: 7 * 24 * 60 * 60 * 1000,
        DAY: 24 * 60 * 60 * 1000,
        HOUR: 60 * 60 * 1000,
        MINUTE: 60 * 1000,
        SECOND: 1000
    };
    const date = new Date(time);
    const diff = Date.now() - date.getTime();
    const {floor} = Math;
    if (diff >= MILLISECONDS.YEAR)
    {
        return `${date.getFullYear()}-${prefixZero(date.getMonth() + 1)}-${prefixZero(date.getDate())}`;
    }
    else if (diff >= MILLISECONDS.MONTH)
    {
        return `${floor(diff / MILLISECONDS.MONTH)} 月前`;
    }
    else if (diff >= MILLISECONDS.WEEK)
    {
        return `${floor(diff / MILLISECONDS.WEEK)} 周前`;
    }
    else if (diff >= MILLISECONDS.DAY)
    {
        return `${floor(diff / MILLISECONDS.DAY)} 天前`;
    }
    else if (diff >= MILLISECONDS.HOUR)
    {
        return `${floor(diff / MILLISECONDS.HOUR)} 小时前`;
    }
    else if (diff >= MILLISECONDS.MINUTE)
    {
        return `${floor(diff / MILLISECONDS.MINUTE)} 分钟前`;
    }
    else if (diff >= MILLISECONDS.SECOND)
    {
        return `${floor(diff / MILLISECONDS.SECOND)} 秒前`;
    }
    else
    {
        return `刚刚`;
    }
}

export function generateDateStr(time)
{
    const date = new Date(time);
    return `${date.getFullYear()}-${prefixZero(date.getMonth() + 1)}-${prefixZero(date.getDate())}`;
}

export function setsEqual(setA, setB)
{
    if (setA.size !== setB.size)
    {
        return false;
    }
    else
    {
        for (const key of setA.keys())
        {
            if (!setB.has(key))
            {
                return false;
            }
        }
        return true;
    }
}