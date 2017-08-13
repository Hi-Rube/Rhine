/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports = (mount, cxt) => {

    mount.isFirstInit = () => {

        let isFirst = true;

        if (cxt.dbModel.Settings){
            isFirst = !cxt.dbModel.Settings.existsSync({key: 'init_first', value: '0'});
        }

        cxt.cache.config.isFirstInit = isFirst;
        return isFirst;
    };

    mount.passFirstInit = () => {

        if (cxt.dbModel.Settings){
            let obj = {
                key: 'init_first',
                value: '0',
                create_by: cxt.constant.FLAG_ROLE_ORIGIN,
                update_by: cxt.constant.FLAG_ROLE_ORIGIN
            };

            try{
                let setting = cxt.dbModel.Settings.oneSync({
                    key: 'init_first'
                });

                setting && setting.id ? setting.saveSync(obj) : cxt.dbModel.Settings.createSync(obj);
                cxt.cache.config.isFirstInit = false;
            } catch (e){
                return false;
            }
        } else {
            return false;
        }
    };

    mount.updateBlogTitle = (title, userId) => {

        let obj = {
            key: 'blog_title',
            value: title,
            create_by: cxt.constant.FLAG_ROLE_ORIGIN,
            update_by: userId || cxt.constant.FLAG_ROLE_ORIGIN
        };

        let setting = cxt.dbModel.Settings.oneSync({
            key: 'blog_title'
        });

        setting && setting.id ? setting.saveSync(obj) : cxt.dbModel.Settings.createSync(obj);
        cxt.cache.data.blog.title = title;
    };

    mount.getBlogTitle = () => {

        let setting = cxt.dbModel.Settings.oneSync({
            key: 'blog_title'
        });

        return setting && setting.value ? setting.value : 'Rhine';
    };
};