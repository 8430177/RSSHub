const got = require('@/utils/got');
const cheerio = require('cheerio');
const translate = require('translation-google');
translate.suffix = 'cn';
module.exports = async (ctx) => {
    const query = ctx.params.query;
    const baseUrl = 'https://richadvert.ru';
    let url;
    let title;
    if (query === 'news') {
        title = 'richadvert ~ 最新资讯';
        url = baseUrl;
    } else {
        title = 'richadvert ~ 知识库';
        url = 'https://richadvert.ru/baza-znanij-po-arbitrazhu.html';
    }
    const response = await got({
        method: 'get',
        url: url,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const items = $('.news-box')
        .map((i, e) => ({
            title: $('h2', e).text(),
            link: baseUrl + $('h2 a', e).attr('href'),
        }))
        .get();
    const tempItem = [];
    items.forEach((item) => {
        tempItem.push(item.title.trim());
    });
    await translate(tempItem.join('\n'), { to: 'zh-cn' }).then((res) => {
        const itemTitles = res.text.split('\n');
        items.forEach((item, index) => {
            items[index].title = itemTitles[index];
        });
    });
    ctx.state.data = {
        title: title,
        link: baseUrl,
        description: title,
        item: items,
    };
};
