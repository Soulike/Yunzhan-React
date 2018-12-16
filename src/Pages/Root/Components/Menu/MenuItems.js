/*
* 本文件配置所有的侧边栏按钮，这个文件负责侧栏按钮的切换
* 如果要添加新的 LinkItem，先在此进行编辑，然后到 Pages/Root/Components/Menu/View.js 的 this.state 下按照已有格式添加。注意，添加后下标应当与这个文件中值的数字对应
* */

export const Items = {
    '/admin/overview': 0,
    '/admin/screenManagement': 1,
    '/admin/advertiseManagement': 2,
    '/admin/tagManagement': 3,
    '/admin/resourceManagement': 4
};