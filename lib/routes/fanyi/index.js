const Parser = require('rss-parser');
const translate = require('translation-google');
const got = require('@/utils/got');
translate.suffix = 'cn';
module.exports = async (ctx) => {
    const query = ctx.params.query.replace(/:/g, '-').replace(/_/g, '.').replace(/=/g, '/').replace(/;/g, '?').replace(/@/g, '_');
    const parser = new Parser();
    const i = query.indexOf('js9wrfo.monster');
    let baseUrl;
    if (i !== -1) {
        baseUrl = 'http://127.0.0.1:1200' + query.substring(i + 15, query.length);
    } else {
        baseUrl = 'https://' + query;
    }
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const feed = await parser.parseString(response.data);
    const tempItem = [];
    feed.items.forEach((item, index) => {
        if (index === 0) {
            tempItem.push(feed.title);
        } else {
            tempItem.push(feed.items[index].title);
        }
    });
    await translate(tempItem.join('\n'), { to: 'zh-cn' }).then((res) => {
        const itemTitles = res.text.split('\n');
        feed.items.forEach((item, index) => {
            if (index === 0) {
                feed.title = itemTitles[index];
            } else {
                feed.items[index].title = itemTitles[index];
            }
        });
    });
    ctx.state.data = {
        title: feed.title + ` ~ 资讯`,
        link: baseUrl,
        description: feed + ` ~ 资讯`,
        item: feed.items,
    };
};
