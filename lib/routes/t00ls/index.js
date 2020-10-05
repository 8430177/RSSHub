const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    let baseUrl = 'https://www.t00ls.net/';
    const query = ctx.params.query;
    baseUrl = baseUrl + query + '.html';
    let title;
    if (query === 'tech') {
        title = '技术文章 - T00ls.Net';
    } else {
        title = '新闻资讯 - T00ls.Net';
    }
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('.col_12_of_12');
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
                        title: $('h4', item).text(),
                        link: $('h4 a', item).attr('href'),
                        description: $('p', item).text(),
                    };
                })
                .get(),
    };
};
