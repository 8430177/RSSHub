const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    const baseUrl = 'https://academy.sinoclick.com/articles/list/content/all';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('div[style="margin-bottom:0.3rem"]');
    ctx.state.data = {
        title: '海外广告培训教程 - 资讯',
        link: baseUrl,
        description: '海外广告培训教程 - 资讯',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('h1', item).text(),
                        link: `https://academy.sinoclick.com` + $('a', item).attr('href'),
                    };
                })
                .get(),
    };
};
