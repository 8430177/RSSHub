const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const baseUrl = 'https://www.amz520.com/amzarticle/index.html';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('article');

    ctx.state.data = {
        title: `最新文章 |Amz520跨境卖家导航`,
        link: `https://www.amz520.com/`,
        description: '最新文章 |Amz520跨境卖家导航',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('h2', item).text(),
                        link: 'https://www.amz520.com' + $('h2 a', item).attr('href'),
                        description: $('.text_box', item).text(),
                        pubDate: new Date($('.muted time', item).text()).toUTCString(),
                    };
                })
                .get(),
    };
};
