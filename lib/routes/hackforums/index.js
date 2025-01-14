const Parser = require('rss-parser');
module.exports = async (ctx) => {
    const baseUrl = 'https://hackforums.net/syndication.php';
    const parser = new Parser({
        headers: {
            accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
            'accept-encoding': `gzip, deflate, br`,
            'accept-language': `en,zh-CN;q=0.9,zh;q=0.8`,
            'cache-control': `no-cache`,
            cookie: `__cfduid=d54e60652042aec6be1a7e22f5949b6bf1600399993; mybb[readallforums]=1; menutabs=0; sid=aed596359c3d09f3aaf2ce7e982df31d; cf_clearance=75292e6ecb322b4f1e37f86afbe054e9d03baa48-1600998795-0-1z7b9bd71dz3733fee7z30df37b8-250; mybb[lastvisit]=1600945781; mybb[lastactive]=1600998875`,
            pragma: `no-cache`,
            'sec-fetch-dest': `document`,
            'sec-fetch-mode': `navigate`,
            'sec-fetch-site': `cross-site`,
            'sec-fetch-user': `?1`,
            'upgrade-insecure-requests': `1`,
            'user-agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36`,
        },
    });
    const feed = await parser.parseURL(baseUrl);
    ctx.state.data = {
        title: `hackforums ~ 资讯`,
        link: `www.sgoldcn.com/`,
        description: 'hackforums ~ 资讯',
        item: feed.items,
    };
};
