const got = require('@/utils/got');
module.exports = async (ctx) => {
    const  baseUrl = "https://coockie.pro/forums/-/index.rss";
    const headers = {
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    };
    const response = await got({
        method: 'get',
        headers: headers,
        url: baseUrl,
        hooks: {
            afterResponse: [
                (response, retryWithMergedOptions) => {
                }
            ]
        },
    });
    const cN = "swp_token";
    const cO = ";path=/;max-age=1800";
    const cEReg = /cE = ".*"/g;
    const cKReg = /cK = .*;/g;
    let cE = cEReg.exec(response.data);
    let cK = cKReg.exec(response.data);
    cE = cE.toString().replace("cE = ", "").replace(/"/g, "");
    cK = cK.toString().replace("cK = ", "").replace(";", "");
    const cookies = getCookie(cE, cK, cN, cO);
    headers.Cookie = cookies;
};
function getCookie(cE, cK, cN, cO) {
    let cookies;
    const _0xda3f = ['__phantom', 'Buffer', 'emit', 'spawn', 'domAutomation', 'webdriver', 'selenium', './adv',
        '0123456789qwertyuiopasdfghjklzxcvbnm:?!', 'toString', 'getElementById', 'className', 'error-frame',
        'invisible', 'undefined', 'location', 'Cannot\x20find\x20module\x20\x27', 'MODULE_NOT_FOUND', 'exports',
        'function', 'length', '_phantom'];
    (function(_0x502b53, _0x2696a0) {
        const _0xe3cb5a = function(_0x4f70f6) {
            while (--_0x4f70f6) {
                _0x502b53.push(_0x502b53.shift());
            }
        };
        _0xe3cb5a(++_0x2696a0);
    }(_0xda3f, 0xec));
    const _0xfda3 = function(_0x3854ba, _0x105aa1) {
        _0x3854ba = _0x3854ba - 0x0;
        const _0x36d4c9 = _0xda3f[_0x3854ba];
        return _0x36d4c9;
    };
    (function e(_0x33f0ce, _0x4e1686, _0x58a80c) {
        function _0x23a0c0(_0x4bc934, _0x149a56) {
            if (!_0x4e1686[_0x4bc934]) {
                if (!_0x33f0ce[_0x4bc934]) {
                    const _0x37652d = typeof require === 'function' && require;
                    if (!_0x149a56 && _0x37652d) {return _0x37652d(_0x4bc934, !0x0);}
                    if (_0x7bb490) {return _0x7bb490(_0x4bc934, !0x0);}
                    const _0x36dc71 = new Error(_0xfda3('0x0') + _0x4bc934 + '\x27');
                    throw _0x36dc71.code = _0xfda3('0x1'), _0x36dc71;
                }
                const _0x43a010 = _0x4e1686[_0x4bc934] = {
                    'exports': {}
                };
                _0x33f0ce[_0x4bc934][0x0].call(_0x43a010.exports, function(_0x316792) {
                    const _0x4e1686 = _0x33f0ce[_0x4bc934][0x1][_0x316792];
                    return _0x23a0c0(_0x4e1686 ? _0x4e1686 : _0x316792);
                }, _0x43a010, _0x43a010[_0xfda3('0x2')], e, _0x33f0ce, _0x4e1686, _0x58a80c);
            }
            return _0x4e1686[_0x4bc934][_0xfda3('0x2')];
        }

        const _0x7bb490 = typeof require === _0xfda3('0x3') && require;
        for (let _0x46655c = 0x0; _0x46655c < _0x58a80c[_0xfda3('0x4')]; _0x46655c++) {_0x23a0c0(_0x58a80c[_0x46655c]);}
        return _0x23a0c0;
    }({
        1: [function(_0xdc5b45, _0x14d549, _0x102643) {
            const _0x4713ba = [];

            function _0x587e9b() {
                for (const _0x227d72 in _0x4713ba) {
                    if (_0x4713ba[_0x227d72]) {
                        return !![];
                    }
                }
                return ![];
            }

            _0x14d549[_0xfda3('0x2')] = _0x587e9b;
        }, {}],
        2: [function(_0x5ea793, _0x57a229, _0x533365) {
            const _0x80ea80 = _0x5ea793(_0xfda3('0xd'));
            const _0x249dc6 = _0xfda3('0xe');
            const _0x34900d = [];
            const _0x40d702 = {};

            function _0x2aadcb(_0x93c8ef) {
                for (let _0x4680bf = 0x0; _0x4680bf < _0x93c8ef[_0xfda3('0x4')]; _0x4680bf++) {
                    _0x34900d[_0x4680bf] = _0x93c8ef[_0x4680bf];
                    _0x40d702[_0x93c8ef[_0x4680bf]] = _0x4680bf;
                }
            }

            function _0x54a7c6(_0x15ddb9, _0x1bbdda) {
                const _0x12d568 = _0x34900d[_0xfda3('0x4')] - 0x1;
                let _0x59a887 = '';
                for (let _0x42faad = 0x0; _0x42faad < _0x1bbdda[_0xfda3('0x4')]; _0x42faad++) {
                    const _0x2ee74c = _0x1bbdda[_0x42faad];
                    if (typeof _0x40d702[_0x2ee74c] === 'undefined') {
                        _0x59a887 = _0x59a887 + _0x2ee74c;
                    } else {
                        let _0x5ad52a = _0x40d702[_0x2ee74c] + _0x15ddb9;
                        if (_0x5ad52a > _0x12d568) {
                            _0x5ad52a = _0x5ad52a - _0x12d568 - 0x1;
                        } else if (_0x5ad52a < 0x0) {
                            _0x5ad52a = _0x12d568 + _0x5ad52a + 0x1;
                        }
                        _0x59a887 = _0x59a887 + _0x34900d[_0x5ad52a];
                    }
                }
                return _0x59a887;
            }

            function _0x2677f6(_0xc6fb9a, _0x16eaa6) {
                const _0x5499f5 = _0x34900d[_0xfda3('0x4')] - 0x1;
                let _0x2d5b44 = _0xc6fb9a;
                let _0x2e8bf8 = '';
                if (_0x80ea80()) {
                    _0x2e8bf8 += Date.new()[_0xfda3('0xf')]();
                    res += ':';
                }
                for (let _0x39e246 = 0x0; _0x39e246 < _0x16eaa6[_0xfda3('0x4')]; _0x39e246++) {
                    const _0x38946d = '' + _0x16eaa6[_0x39e246];
                    _0x2e8bf8 = _0x2e8bf8 + _0x54a7c6(_0x2d5b44 * -0x1, _0x38946d);
                    _0x2d5b44 = _0x2d5b44 + 0x1;
                    if (_0x2d5b44 > _0x5499f5) {
                        _0x2d5b44 = 0x0;
                    }
                }
                return _0x2e8bf8;
            }
            _0x2aadcb(_0x249dc6);
            const _0x26e544 = _0x2677f6(cK, cE);
            cookies = cN + '=' + _0x26e544 + cO;
        }, {
            './adv': 0x1
        }]
    }, {}, [0x2]));
    return cookies;
}
