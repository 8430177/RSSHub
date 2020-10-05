const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const baseUrl = 'https://www.ms509.com';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('.post');

    ctx.state.data = {
        title: `MS509 Team | Mission Studio`,
        link: baseUrl,
        description: 'MS509 Team | Mission Studio',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('.post-title', item).text(),
                        link: baseUrl + $('.post-title a', item).attr('href'),
                        description: $('.post-content', item).text(),
                        pubDate: new Date($('.post-meta', item).text()).toUTCString(),
                    };
                })
                .get(),
    };
};
