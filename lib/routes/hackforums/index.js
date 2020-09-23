const Parser = require('rss-parser');
const got = require('@/utils/got');
module.exports = async (ctx) => {
    const parser = new Parser();
    const baseUrl = 'https://hackforums.net/syndication.php';
    const response = await got({
        method: 'get',
        url: baseUrl,
    });
    const feed = await parser.parseString(response.data);
    ctx.state.data = {
        title: `HackForums ~ 资讯`,
        link: `www.hackforums.net/`,
        description: 'HackForums ~ 资讯',
        item: feed.items,
    };
};
