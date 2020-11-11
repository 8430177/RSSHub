const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    const baseUrl = 'http://www.affbuzz.com/affbuzz/last200';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('tbody tr');
    ctx.state.data = {
        title: 'affbuzz - 资讯',
        link: baseUrl,
        description: 'affbuzz - 资讯',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('td', item).eq(1).text(),
                        link:   $('a', $('td', item).eq(1)).eq(1).attr('href'),
                    };
                })
                .get(),
    };
};
