/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const fs = require('fs');
const path = require('path');
const THEME_PATH = path.join(__dirname, '../../../themes');

module.exports = (mount, cxt) => {

    mount.getThemeNowSelected = () => {

        let setting = cxt.dbModel.Settings.oneSync({key: 'theme_selected'});
        let themeName =  setting && setting.value ? setting.value : 'default';

        if (!fs.existsSync(path.join(THEME_PATH, `./${themeName}/index.js`))){
            //TODO log theme not exit
            themeName = 'default';
        }

        return {
            name: themeName,
            config: require(`../../../themes/${themeName}/index.js`)
        };
    };

    mount.setThemeNowSelected = (name, userId) => {

        let obj = {
            key: 'theme_selected',
            value: name,
            create_by: userId,
            update_by: userId
        };

        let setting = cxt.dbModel.Settings.oneSync({key: 'theme_selected'});
        if (setting && setting.id){
            delete obj.create_by;
            setting.saveSync(obj);
        } else {
            cxt.dbModel.Settings.createSync(obj);
        }
    };

    mount.configTheme = (name, theme) => {
        if (!theme || !name){
            let rs = cxt.services.getThemeNowSelected();
            theme = rs.config;
            name = rs.name;
        }

        //目前只支持 ejs 模板引擎
        if (theme.engine !== 'ejs'){
            //TODO log view engine not support
            theme.engine = 'ejs';
        }

        //配置转换
        cxt.theme.engine = theme.engine;
        cxt.theme.name = name;
        cxt.theme.root = path.join(THEME_PATH, `./${name}`);
        cxt.theme.cssRoot = '/css';
        cxt.theme.jsRoot = '/js';
        cxt.theme.viewRoot = '/view';
        cxt.theme.route = {};
        theme.route && cxt.constant.THEME_HOOK_ROUTE.forEach(item => {
            cxt.theme.route[item] = theme.route[item];
        });
    };
};