/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const BaseHandle = require('./base-handle');

class CacheInitHandle extends BaseHandle{
    run(subject, cxt){
        //this handle's subject is app config
        if (subject.db && Object.keys(cxt.dbModel).length > 0){
            cxt.cache.config.dbok = true;
            cxt.cache.config.dbInfo = subject.db;
        }

        cxt.cache.config.isFirstInit = cxt.services.isFirstInit();
    }
}

module.exports = CacheInitHandle;