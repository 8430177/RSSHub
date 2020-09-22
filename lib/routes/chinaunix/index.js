const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const baseUrl = 'http://blog.chinaunix.net/site/commendago.html';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('div[class="recommend_con1 recommend_con2"]');
    ctx.state.data = {
        title: `ChinaUnix ~ 资讯`,
        link: `https://www.chinaunix.com/`,
        description: 'ChinaUnix ~ 资讯',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('.two_cont2_1', item).text(),
                        link: 'http://blog.chinaunix.net/' + $('.two_cont2_1 a', item).attr('href'),
                        description: $('.two_cont2_3 span', item).text(),
                    };
                })
                .get(),
    };
};
