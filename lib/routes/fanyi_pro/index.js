const request = require('request');
const logger = require('./utils/logger');
const iconv = require('iconv-lite');
const Parser = require('rss-parser');
const translate = require('translation-google');
module.exports = async (ctx) => {
    // http://127.0.0.1:1200/fanyi_pro/fb-killa_pro=index_php;forums=:=index_rss
    request.defaults({ jar: true });
    const query = ctx.params.query.replace(/:/g, '-').replace(/_/g, '.').replace(/=/g, '/').replace(/;/g, '?');
    const baseUrl = 'https://' + query;
    const parser = new Parser();
    function httprequest(url) {
        return new Promise((resolve) => {
            const options = {
                url: url,
                encoding: null,
                followRedirect: false,
                headers: {
                    referer: url,
                },
            };

            function callback(error, response, body) {
                const regex = /charset=.*/g;
                if (response.statusCode === 307 || response.statusCode === 302) {
                    options.headers.cookie = response.headers['set-cookie'][0];
                    request(options, callback);
                } else {
                    const temp = response.headers['content-type'].match(regex).toString();
                    const result = temp.replace('charset=', '');
                    const enc = iconv.decode(body, result);
                    resolve(enc);
                }
                logger.info(error);
            }
            request(options, callback);
        });
    }
    await httprequest(baseUrl)
        .then(function (req) {
            const feed = parser.parseString(req);
            const tempItem = [];
            feed.then((item) => {
                tempItem.push(item.title);
            });
            translate(tempItem.join('\n'), { to: 'zh-cn' }).then((res) => {
                const itemTitles = res.text.split('\n');
                let i = 0;
                feed.then((item) => {
                    item.title = itemTitles[i];
                    i++;
                });
            });
            ctx.state.data = {
                title: baseUrl + ` ~ 资讯`,
                link: baseUrl,
                description: baseUrl + ` ~ 资讯`,
                item: feed.items,
            };
        })
        .catch((e) => {
            logger.info(e);
        });
};
