const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    const baseUrl = 'https://www.affpaying.com/blog';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('li[class="flex w-full py-6 border-b border-dashed"]');
    ctx.state.data = {
        title: 'affpaying - 博客资讯',
        link: baseUrl,
        description: 'affpaying - 博客资讯',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('h2', item).text(),
                        link: `https://www.affpaying.com` + $('h2 a', item).attr('href'),
                    };
                })
                .get(),
    };
};
