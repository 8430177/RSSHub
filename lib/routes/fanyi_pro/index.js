const Parser = require('rss-parser');
const translate = require('translation-google');
const got = require('@/utils/got');
module.exports = async (ctx) => {
    // http://127.0.0.1:1200/fanyi_pro/fb-killa_pro=index_php;forums=:=index_rss
    const query = ctx.params.query.replace(/:/g, '-').replace(/_/g, '.').replace(/=/g, '/').replace(/;/g, '?');
    const baseUrl = 'https://' + query;
    const parser = new Parser();
    const tempItem = [];
    const headers = {
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    };
    let c;
    await got({
        method: 'get',
        headers: headers,
        url: baseUrl,
        hooks: {
            beforeRedirect: [
                (options, response) => {
                    const cookie = response.headers['set-cookie'];
                    if (cookie) {
                        const cook = cookie.map((c) => c.split(';')[0]).join('; ');
                        options.headers.Cookie = cook;
                        c = cook;
                        options.headers.Referer = response.url;
                    }
                },
            ],
        },
    });
    headers.Cookie = c;
    const result = await got({
        method: 'get',
        headers: headers,
        url: baseUrl,
    });
    const feed = await parser.parseString(result.data);
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
