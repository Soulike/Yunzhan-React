class Item
{
    constructor(icon, text)
    {
        this.icon = icon;
        this.text = text;
    }

}

export class LinkItem extends Item
{
    constructor(icon, text, href)
    {
        super(icon, text);
        this.href = href;
        this.isLink = true;
    }
}

export class FuncItem extends Item
{
    constructor(icon, text, func)
    {
        super(icon, text);
        this.func = func;
        this.isLink = false;
    }
}
