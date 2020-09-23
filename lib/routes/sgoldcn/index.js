const Parser = require('rss-parser');
const got = require('@/utils/got');
module.exports = async (ctx) => {
    const parser = new Parser();
    const baseUrl = 'http://www.sgoldcn.com/rss.php';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const feed = await parser.parseString(response.data);
    ctx.state.data = {
        title: `赏金论坛 ~ 资讯`,
        link: `www.sgoldcn.com/`,
        description: '赏金论坛 ~ 资讯',
        item: feed.items,
    };
};
