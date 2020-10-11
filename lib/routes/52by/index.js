const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    const baseUrl = 'https://www.52by.com';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('#artlist li');
    ctx.state.data = {
        title: '邦阅网-外贸知识服务平台',
        link: baseUrl,
        description: '邦阅网-外贸知识服务平台',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('.article-title', item).text(),
                        link: baseUrl + $('.article-title', item).attr('href'),
                    };
                })
                .get(),
    };
};
