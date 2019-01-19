import crypto from 'crypto';

export default {
    getHash,
    getSHA256
};

function getHash(text, hashMethod)
{
    const hash = crypto.createHash(hashMethod);
    hash.update(text);
    return hash.digest('hex');
}

function getSHA256(text)
{
    return getHash(text, 'sha256');
}
