const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    const baseUrl = 'https://www.alexzk.com/';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('article');
    ctx.state.data = {
        title: `最新文章 - 赚客头条`,
        link: baseUrl,
        description: `最新文章 - 赚客头条`,
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('h2', item).last().text(),
                        link: $('h2 a', item).last().attr('href'),
                        description: $('.note', item).text(),
                    };
                })
                .get(),
    };
};
