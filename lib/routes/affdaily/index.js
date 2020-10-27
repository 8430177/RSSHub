const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    const baseUrl = 'https://www.affdaily.com/';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('.border-gray-400');
    ctx.state.data = {
        title: 'affdaily - 最新资讯',
        link: baseUrl,
        description: 'affdaily - 最新资讯',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('h1', item).text(),
                        link: $('div[class="flex flex-col"] a', item).attr('href'),
                    };
                })
                .get(),
    };
};
