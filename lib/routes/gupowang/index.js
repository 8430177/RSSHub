const got = require('@/utils/got');
const cheerio = require('cheerio');
const translate = require('translation-google');
translate.suffix = 'cn';
module.exports = async (ctx) => {
    const baseUrl = 'http://www.gupowang.com';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const items = $('.news-list .item')
        .map((index, item) => {
            item = $(item);
            return {
                title: $('h3', item).text(),
                link:  baseUrl + $('h3 a', item).attr('href'),
            };
        })
        .get();
    ctx.state.data = {
        title: `姑婆那些事儿官网 - 互联网推广运营知识分享平台`,
        link: baseUrl,
        description: `姑婆那些事儿官网 - 互联网推广运营知识分享平台`,
        item: items,
    };
};
