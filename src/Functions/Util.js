export default {
    prefixZero,
    generateTimeStr,
    generateDateStr,
    setsEqual,
    randomString,
};

function prefixZero(num)
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

function generateTimeStr(time)
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

function generateDateStr(time)
{
    const date = new Date(time);
    return `${date.getFullYear()}-${prefixZero(date.getMonth() + 1)}-${prefixZero(date.getDate())}`;
}

function setsEqual(setA, setB)
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

function randomString(length = 11)
{
    if (!Number.isInteger(length))
    {
        throw new TypeError('The length of the string must be an integer');
    }
    const charArray = [];
    if (length <= 11)
    {
        charArray.push(...Math.random().toString(36).slice(2, 2 + length));
    }
    else
    {
        const generateTime = Math.floor(length / 10);
        const restLength = length - 10 * generateTime;
        for (let i = 0; i < generateTime; i++)
        {
            charArray.push(...Math.random().toString(36).slice(2));
        }
        charArray.push(...Math.random().toString(36).slice(2, 2 + restLength));
    }
    return charArray.join('');
}
