const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    const baseUrl = 'https://www.amz123.com/forum-1.htm';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('div[class="bus_loop wow fadeIn animated thread"]');
    ctx.state.data = {
        title: `最新文章 - 跨境头条`,
        link: baseUrl,
        description: `最新文章 - 跨境头条`,
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('h2', item).last().text(),
                        link: $('h2 a', item).last().attr('href'),
                        description: $('.pjj', item).text(),
                    };
                })
                .get(),
    };
};
