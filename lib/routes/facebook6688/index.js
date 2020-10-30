const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    const baseUrl = 'http://www.facebook6688.com/';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('div[class="whitebg bloglist"] ul li');
    ctx.state.data = {
        title: 'facebook养号技巧 - 资讯',
        link: baseUrl,
        description: 'facebook养号技巧 - 资讯',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('.blogtitle', item).text(),
                        link: `http://www.facebook6688.com` + $('.blogtitle a', item).attr('href'),
                    };
                })
                .get(),
    };
};
