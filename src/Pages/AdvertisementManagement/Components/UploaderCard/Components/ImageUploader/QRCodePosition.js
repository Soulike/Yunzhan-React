// 要添加选项，在此文件添加ID与名称即可

export const QRCodePositionId = {
    TOP_LEFT: 1,
    TOP_RIGHT: 2,
    BOTTOM_LEFT: 3,
    BOTTOM_RIGHT: 4,
};

export const QRCodePositionIdToName = {
    [QRCodePositionId.TOP_LEFT]: '左上',
    [QRCodePositionId.TOP_RIGHT]: '右上',
    [QRCodePositionId.BOTTOM_LEFT]: '左下',
    [QRCodePositionId.BOTTOM_RIGHT]: '右下',
};