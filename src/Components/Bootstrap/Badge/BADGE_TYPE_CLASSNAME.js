function prefix(badgeType)
{
    return `badge-${badgeType}`;
}

export default {
    PRIMARY: prefix('primary'),
    SECONDARY: prefix('secondary'),
    SUCCESS: prefix('success'),
    DANGER: prefix('danger'),
    WARNING: prefix('warning'),
    INFO: prefix('info'),
    LIGHT: prefix('light'),
    DARK: prefix('dark'),
};