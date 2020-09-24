const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    const query = ctx.params.query;
    const baseUrl = 'https://bestofshowhn.com/' + query;
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('.col-lg-12');
    ctx.state.data = {
        title: `bestofshowhn ~ 资讯`,
        link: `https://bestofshowhn.com`,
        description: 'bestofshowhn ~ 资讯',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('.card-title', item).text(),
                        link: $('.card-body a', item).attr('href'),
                    };
                })
                .get(),
    };
};
