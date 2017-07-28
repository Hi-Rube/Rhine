/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var orm = require('fib-orm');

module.exports = function(config){
    var db = null;

    if (config.db) {
        switch (config.db.type) {
            case 'sqlite':
                db = orm.connectSync(`sqlite:${config.db.sqlite.name}`);
                break;
            case 'mysql':
                break;
        }
    }

    return db;
};