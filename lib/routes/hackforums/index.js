const Parser = require('rss-parser');
const got = require('@/utils/got');
module.exports = async (ctx) => {
    const parser = new Parser();
    const baseUrl = 'https://hackforums.net/syndication.php';
    const response = await got({
        method: 'get',
        url: baseUrl,
        headers: {
            'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36`,
        },
    });
    const feed = await parser.parseString(response.data);
    ctx.state.data = {
        title: `HackForums ~ 资讯`,
        link: `www.hackforums.net/`,
        description: 'HackForums ~ 资讯',
        item: feed.items,
    };
};
