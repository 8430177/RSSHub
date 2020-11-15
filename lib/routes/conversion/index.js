const got = require('@/utils/got');
const cheerio = require('cheerio');
const translate = require('translation-google');
translate.suffix = 'cn';
module.exports = async (ctx) => {
    const baseUrl = 'https://conversion.im';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const items = $('#post-items article')
        .map((index, item) => {
            item = $(item);
            return {
                title: $('h2 a', item).text(),
                link:  $('h2 a', item).attr('href'),
            };
        })
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
        title: `conversion 最新资讯`,
        link: baseUrl,
        description: `conversion 最新资讯`,
        item: items,
    };
};
