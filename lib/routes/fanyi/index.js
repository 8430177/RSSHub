const Parser = require('rss-parser');
const translate = require('translation-google');
translate.suffix = 'cn';
module.exports = async (ctx) => {
    const query = ctx.params.query.replace(/:/g, '-').replace(/_/g, '.').replace(/=/g, '/').replace(/;/g, '?');
    const parser = new Parser();
    const i = query.indexOf('js9wrfo.monster');
    let baseUrl;
    if (i !== -1) {
        baseUrl = 'http://127.0.0.1:1200' + query.substring(i + 15, query.length);
    } else {
        baseUrl = 'https://' + query;
    }

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
        title: query + ` ~ 资讯`,
        link: baseUrl,
        description: query + ` ~ 资讯`,
        item: feed.items,
    };
};
