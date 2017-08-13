/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const path = require('path');

module.exports = (route, cxt) => {
    route.get('/*', function(){
        cxt.cache.config.isFirstInit ?
            this.redirect('/config') :
            this.viewFile(path.join(__dirname, '../views/index.ejs'), {
                data: cxt.cache.data,
                page: {
                    theme: cxt.theme,
                    isLogin: !!this.r.session.user
                },
                i18n: cxt.cache.language.i18n
            }, {
                root: cxt.theme.root
            });
    });
};