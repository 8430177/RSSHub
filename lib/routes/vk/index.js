const Parser = require('rss-parser');
const translate = require('translation-google');
translate.suffix = 'cn';
module.exports = async (ctx) => {
    const query = ctx.params.query.replace(/:/g, '-').replace(/_/g, '.').replace(/=/g, '/').replace(/;/g, '?').replace(/@/g, '_')
        .replace(/!/g, '=').replace(/`/g, ':');
    const parser = new Parser();
    const pre = "https://vkrss.ru/";
    const  baseUrl = pre + query;
    const feed = await parser.parseURL(baseUrl);
    const tempItem = [];
    tempItem.push(feed.title);
    feed.items.forEach((item, index) => {
        if (feed.items[index].contentSnippet === '') {
            tempItem.push("The title is empty");
        } else {
            tempItem.push(feed.items[index].contentSnippet);
        }
    });
    await translate(tempItem.join('\n\n\n\n'), { to: 'zh-cn' }).then((res) => {
        const itemTitles = res.text.split('\n\n\n\n');
        itemTitles.forEach((item, index) => {
            if (index === 0) {
                feed.title = item;
            } else {
                feed.items[index - 1].title = itemTitles[index];
            }
        });
    });
    ctx.state.data = {
        title: feed.title + ` ~ 资讯`,
        link: baseUrl,
        description: feed + ` ~ 资讯`,
        item: feed.items,
    };
};
