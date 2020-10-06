const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    const query = ctx.params.query;
    const baseUrl = 'https://sec-wiki.com/' + query;
    let title;
    if (query === 'news') {
        title = '安全技术 - sec-wiki';
    } else if (query === 'event') {
        title = '安全新闻 - sec-wiki';
    }
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('tbody tr');
    ctx.state.data = {
        title: title,
        link: baseUrl,
        description: title,
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('.links', item).text(),
                        link: $('.links', item).attr('href'),
                    };
                })
                .get(),
    };
};
