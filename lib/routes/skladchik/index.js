const Parser = require('rss-parser');
const translate = require('translation-google');
translate.suffix = 'cn';
module.exports = async (ctx) => {
    const parser = new Parser();
    const baseUrl = 'https://skladchik.com/forums/-/index.rss';
    const feed = await parser.parseURL(baseUrl);
    const tempItem = [];
    feed.items.forEach((item) => {
        tempItem.push(item.title);
    });
    await translate(tempItem.join('\n'), { to: 'zh-cn' }).then((res) => {
        const itemTitles = res.text.split('\n');
        feed.items.forEach((item, index) => {
            feed.items[index].title = itemTitles[index];
        });
    });
    ctx.state.data = {
        title: `skladchik ~ 资讯`,
        link: `www.skladchik.com/`,
        description: 'skladchik ~ 资讯',
        item: feed.items,
    };
};
