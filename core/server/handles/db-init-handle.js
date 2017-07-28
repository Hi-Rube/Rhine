/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const BaseHandle = require('./base-handle');
const connect = require('../data/db/connect');
const schemas = require('../data/schema/db-define');

class DbInitHandle extends BaseHandle{
    run(subject, cxt){
        //this handle's subject is app config
        const db = connect(subject);

        if (db) {
            for (let schema in schemas) {
                if (schemas.hasOwnProperty(schema)) {
                    let schemaModelName = `${schema[0].toUpperCase()}${schema.substr(1)}`;
                    cxt.dbModel[schemaModelName] = db.define(schema, schemas[schema]);
                }
            }

            db.sync(function(err) {
                if (err) {
                    //TODO: log record
                    throw err;
                }
            });
        }
    }
}

module.exports = DbInitHandle;