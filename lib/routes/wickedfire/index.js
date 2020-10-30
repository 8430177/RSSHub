const got = require('@/utils/got');
module.exports = async (ctx) => {
    const baseUrl = 'https://www.wickedfire.com/external.php?type=RSS2';
    const response = await got({
        method: 'get',
        url: baseUrl,
        header: {
            Host: `www.wickedfire.com`,
            'User-Agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.105 Safari/537.36`,
            Referer: `https://www.wickedfire.com/external.php`,
            Cookie: `sucuri_cloudproxy_uuid_6155c89ce=97d13157740508292dbf2928f1ef935b`,
        },
    });
    ctx.state.data = {
        title: `wickedfire ~ 资讯`,
        link: `www.sgoldcn.com/`,
        description: 'wickedfire ~ 资讯',
        item: response.data,
    };
};
