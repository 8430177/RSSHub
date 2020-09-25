const Parser = require('rss-parser');
module.exports = async (ctx) => {
    const baseUrl = 'https://www.wickedfire.com/external.php?type=RSS2';
    const parser = new Parser({
        headers: {
            accept: `text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
            'accept-encoding': `gzip, deflate, br`,
            'accept-language': `en,zh-CN;q=0.9,zh;q=0.8`,
            'cache-control': `no-cache`,
            cookie: `bblastvisit=1600917381; bblastactivity=0; sucuri_cloudproxy_uuid_875605036=5cffe592b3009a0ef107b183dd69b341; sucuri_cloudproxy_uuid_009450982=9f4fdc7568f23439d6a156d6ee9d5a2e; bbsessionhash=44911396392049e360cd8911c8913e0f`,
            pragma: `no-cache`,
            'sec-fetch-dest': `document`,
            'sec-fetch-mode': `navigate`,
            'sec-fetch-site': `none`,
            'sec-fetch-user': `?1`,
            'upgrade-insecure-requests': `1`,
            'user-agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36`,
        },
    });
    const feed = await parser.parseURL(baseUrl);
    ctx.state.data = {
        title: `wickedfire ~ 资讯`,
        link: `www.sgoldcn.com/`,
        description: 'wickedfire ~ 资讯',
        item: feed.items,
    };
};
