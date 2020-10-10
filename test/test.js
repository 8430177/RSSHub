// const translate = require('translation-google');
// const Parser = require('rss-parser');
// translate.suffix = 'cn';
// async function asd()  {
//     const parser = new Parser();
//     const baseUrl = 'https://skladchik.com/forums/-/index.rss';
//     const feed = await parser.parseURL(baseUrl);
//     const tempItem = [];
//     feed.items.forEach((item) => {
//         tempItem.push(item.title);
//     });
//
//     await translate(tempItem.join("||||||")
//         , { to:'zh-cn'}).then((res) => {
//         const itemTitles = res.text.split('||||||');
//         feed.items.forEach((item, index) => {
//             feed.items[index].title = '' + itemTitles[index];
//         });
//     }).catch((err) => {
//     });
//
// }
// asd();
