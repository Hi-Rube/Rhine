/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
const connect = require('../data/db/connect');
const schemas = require('../data/schema/db-define');
const ObjectUtil = require('../utils/object-util');
const fs = require('fs');
const path = require('path');
const CONFIG_FILE_PATH = path.join(__dirname, '../../../config.json');

module.exports = (mount, cxt) => {

    mount.changeDbConfig = (newConfig, oldConfig) => {
        if (!oldConfig ||
            newConfig.type !== oldConfig.type ||
            (newConfig.type === oldConfig.type && !ObjectUtil.hasSameOneLevelProperty(newConfig[newConfig.type], oldConfig[oldConfig.type]))
        ){

            let config = JSON.parse(fs.readFile(CONFIG_FILE_PATH).toString());
            if (typeof config.db === 'undefined'){
                config.db = {};
            }
            config.db.type = newConfig.type;
            config.db[newConfig.type] = newConfig[newConfig.type];
            //update dbModel
            cxt.services.dbInit(config);
            //update config file
            fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(config));
            //update cache
            cxt.cache.config.dbok = true;
            cxt.cache.config.dbInfo = config.db;
        }
        return true;
    };

    mount.dbInit = (config) => {
        const db = connect(config);

        if (db) {
            for (let schema in schemas) {
                if (schemas.hasOwnProperty(schema)) {
                    let schemaModelName = `${schema[0].toUpperCase()}${schema.substr(1)}`;
                    cxt.dbModel[schemaModelName] = db.define(schema, schemas[schema]);
                }
            }

            db.syncSync();
        }
    }
};