const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    const baseUrl = 'https://mjzj.com/newmjzj';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('.flow-item');
    ctx.state.data = {
        title: '卖家之家 - 最新资讯',
        link: baseUrl,
        description: '卖家之家 - 最新资讯',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('.title-wrapper', item).text(),
                        link: 'https://mjzj.com' + $('a', item).attr('href'),
                        description: $('.article-item-description', item).text(),
                    };
                })
                .get(),
    };
};
