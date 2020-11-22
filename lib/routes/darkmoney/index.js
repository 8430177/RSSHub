const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    const baseUrl = 'https://darkmoney.tw';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const  list  = $('td[rowspan="3"]');
    console.log(list.data);
    ctx.state.data = {
        title: `最新文章 - 跨境知道`,
        link: baseUrl,
        description: `最新文章 - 跨境知道`,
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('font', item).text(),
                        link: baseUrl + $('a', item).attr('href'),
                    };
                })
                .get(),
    };
};
