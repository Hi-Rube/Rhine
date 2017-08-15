/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports = (route, cxt) => {

    route.get('/login', function(){
        if (this.r.session.user){
            this.redirect('/admin');
        } else {
            this.viewFile(path.join(__dirname, '../views/login.ejs'), {
                i18n: cxt.cache.language.i18n
            });
        }
    });

    route.post('/login', function(){
        cxt.services.loginAuth(this.form['userName'], this.form['userPassword'], this.r.session);
    });
};