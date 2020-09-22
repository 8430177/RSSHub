const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const baseUrl = 'http://www.mottoin.com/';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('#timeline .news-list');
    ctx.state.data = {
        title: `mottoin ~ 资讯`,
        link: `www.mottoin.com/`,
        description: 'mottoin ~ 资讯',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('dt a', item).text(),
                        link: $('dt a', item).attr('href'),
                        description: $('.text', item).text(),
                    };
                })
                .get(),
    };
};
