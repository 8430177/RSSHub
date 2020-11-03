const Parser = require('rss-parser');
const translate = require('translation-google');
const got = require('@/utils/got');
translate.suffix = 'cn';
module.exports = async (ctx) => {
    const query = ctx.params.query.replace(/:/g, '-').replace(/_/g, '.').replace(/=/g, '/').replace(/;/g, '?').replace(/@/g, '_')
        .replace(/!/g, '=').replace(/`/g, ':');
    const parser = new Parser();
    const i = query.indexOf('js9wrfo.monster');
    const isHttp =  query.indexOf('https');
    let baseUrl;
    if (i !== -1) {
        baseUrl = 'http://127.0.0.1:1200' + query.substring(i + 15, query.length);
    } else if (isHttp !== -1) {
        baseUrl =   query;
    } else {
        baseUrl = 'http://' + query;
    }
    const response = await got({
        method: 'get',
        url: baseUrl,
        rejectUnauthorized: false
    });
    const feed = await parser.parseString(response.data);
    const tempItem = [];
    tempItem.push(feed.title);
    feed.items.forEach((item, index) => {
        tempItem.push(feed.items[index].title);
    });
    await translate(tempItem.join('\n'), { to: 'zh-cn' }).then((res) => {
        const itemTitles = res.text.split('\n');
        itemTitles.forEach((item, index) => {
            if (index === 0) {
                feed.title = item;
            } else {
                feed.items[index - 1].title = itemTitles[index];
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