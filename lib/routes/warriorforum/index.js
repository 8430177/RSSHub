const got = require('@/utils/got');
const cheerio = require('cheerio');
module.exports = async (ctx) => {
    let baseUrl = 'https://warriorforum.com/';
    const query = ctx.params.query;
    if (query === 'latest' || query === 'top') {
        baseUrl = baseUrl + 'discussions/' + query;
    } else if (query === 'learn') {
        baseUrl = baseUrl + query;
        const response = await got({
            method: 'get',
            url: baseUrl,
        });
        const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
        const list = $('.ArticleList-item');
        ctx.state.data = {
            title: `warriorforum ~ 资讯`,
            link: `https://warriorforum.com`,
            description: 'warriorforum ~ 资讯',
            item:
                list &&
                list
                    .map((index, item) => {
                        item = $(item);
                        return {
                            title: $('.Article-title', item).text(),
                            link: $('.Article-title a', item).attr('href'),
                            description: $('.Article-desc', item).text(),
                        };
                    })
                    .get(),
        };
        return;
    } else {
        baseUrl = baseUrl + query;
    }
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const $ = cheerio.load(response.data); // 使用 cheerio 加载返回的 HTML
    const list = $('ul[class="TopicList"] li[class="TopicList-item"]');
    ctx.state.data = {
        title: `warriorforum ~ 资讯`,
        link: `https://warriorforum.com`,
        description: 'warriorforum ~ 资讯',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: $('.ArticleSnapshot-title', item).text(),
                        link: $('.ArticleSnapshot-title a', item).attr('href'),
                        description: $('.ArticleSnapshot-blurb', item).text(),
                    };
                })
                .get(),
    };
};
