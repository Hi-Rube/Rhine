/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const BaseHandle = require('./base-handle');
const languageHook = require('../hook/language');
const fs = require('fs');
const path = require('path');

class CacheInitHandle extends BaseHandle{
    run(subject, cxt){
        //this handle's subject is app config

        /** 数据库信息 **/
        if (subject.db && Object.keys(cxt.dbModel).length > 0){
            cxt.cache.config.dbok = true;
            cxt.cache.config.dbInfo = subject.db;
        }

        /** 是否第一次进入 **/
        cxt.cache.config.isFirstInit = cxt.services.isFirstInit();

        /** 初始化语言缓存 **/
        if (!fs.existsSync(path.join(__dirname, `../i18n/${subject.language || 'zh-cn'}.js`))){
            cxt.cache.language.name = 'zh-cn';
            //TODO log language file not exit
        } else {
            cxt.cache.language.name = subject.language || 'zh-cn';
        }
        cxt.cache.language.i18n = require(`../i18n/${cxt.cache.language.name}`);
        cxt.cache.language.from = 'local';

        let langs = cxt.invoke(languageHook.languageInit().event);
        if (langs && langs.length){
            if (langs.length > 1){
                //TODO log has more language plugin
            }
            let lang = langs[0];
            if (lang.name && lang.i18n && lang.pluginName){
                cxt.cache.language.i18n = lang.i18n;
                cxt.cache.language.name = lang.name;
                cxt.cache.language.from = lang.pluginName;
            }
        }
    }
}

module.exports = CacheInitHandle;