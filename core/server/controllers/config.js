/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const path = require('path');
const configTemplatePath = path.join(__dirname, '../views/config.ejs');
const ConfigUtil = require('../utils/biz/config-util');

const DS_TEMPLATE = '/config/database-setting.ejs';
const BI_TEMPLATE=  '/config/blog-info.ejs';
const SS_TEMPLATE = '/config/success.ejs';

function buildDSData(cxt){
    return {
        page: {
            selected: 1,
            contentTemplate: DS_TEMPLATE
        },
        data: {
            dbok: !!cxt.cache.config.dbok,
            dbInfo: cxt.cache.config.dbInfo
        }
    };
}

function buildBIData(cxt){
    return {
        page: {
            selected: 2,
            contentTemplate: BI_TEMPLATE
        }
    };
}

function buildSSData(cxt){
    return {
        page: {
            selected: 3,
            contentTemplate: SS_TEMPLATE
        }
    };
}

module.exports = (route, cxt) => {
    route.get('/config', function(){

        cxt.cache.config.isFirstInit ?
            this.viewFile(configTemplatePath, buildDSData(cxt)) :
            this.redirect('/');
    });

    route.post('/config', function(){

        switch (this.form.action){
            case 'databaseSetting':
                this.type = 'text/html';
                if (cxt.services.changeDbConfig(ConfigUtil.convertConfigDBForm2NewConfig(this.form), cxt.cache.config.dbInfo)){
                    this.viewFile(configTemplatePath, buildBIData(cxt));
                } else {
                    this.viewFile(configTemplatePath, buildDSData(cxt));
                }
                break;
            case 'blogInfo':
                this.type = 'text/html';
                cxt.services.updateBlogTitle(this.form['blogName']);
                cxt.services.createUser(
                    this.form['blogAdminName'],
                    this.form['blogAdminPwdA'],
                    this.form['blogAdminEmail']
                );
                this.viewFile(configTemplatePath, buildSSData(cxt));
                break;
            default:
                this.redirect('/config');
        }
    });
};