const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    const baseUrl = 'https://www.jb51.net/new/new_1.htm';
    const query = ctx.params.query;
    let title;
    const response = await got({
        method: 'get',
        url: baseUrl,
        headers: {
            Host: `www.jb51.net`,
            'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.70 Safari/537.36`,
        },
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    let list;
    if (query === 'it') {
        title = '编程技术 - jb51.net';
        list = $('li', $('ul[class="w100 left new_list"]').get(0));
    } else if (query === 'download') {
        title = '下载更新 - jb51.net';
        list = $('li', $('ul[class="w100 left new_list"]').get(1));
    } else if (query === 'tutorial') {
        title = '文章教程 - jb51.net';
        list = $('li', $('ul[class="w100 left new_list"]').get(2));
    }
    ctx.state.data = {
        title: title,
        link: baseUrl,
        description: title,
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('a', item).text(),
                        link: 'https://www.jb51.net' + $('a', item).attr('href'),
                    };
                })
                .get(),
    };
};
