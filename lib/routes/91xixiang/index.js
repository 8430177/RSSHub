const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    const baseUrl = 'http://www.91xixiang.com/index.html';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('.fly-list li');
    ctx.state.data = {
        title: `话题首页 - 西厢跨境`,
        link: baseUrl,
        description: `话题首页 - 西厢跨境`,
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('h2', item).last().text(),
                        link: 'http://www.91xixiang.com' + $('h2 a', item).last().attr('href'),
                    };
                })
                .get(),
    };
};
