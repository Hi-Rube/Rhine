/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const constant = require('../data/constant');
const fs = require('fs');
const path = require('path');

//cache && cxt
let _cache = {};
let cxt = {
    dbModel: {},
    cache: {
        data: {},
        config: {},
        language: {}
    },
    constant: constant,
    services: {},
    route: null,
    emit: function(event, ...cxt){
        _cache[event] && _cache[event].forEach(listener => {
            listener.apply(null, cxt);
        })
    },
    invoke: function(event, ...cxt){
        if (_cache[event]){
            return _cache[event].map(execute => {
                return execute.apply(null, cxt);
            });
        }

        return [];
    },
    on: function(event, func){
        if (_cache[event]){
            _cache.push(func);
        } else {
            _cache[event] = [func];
        }
    }
};

//config change to runtime
let configRuntimePath = path.join(__dirname, '../../../config-runtime.json'),
    configPath = path.join(__dirname, '../../../config.json');
if (!fs.existsSync(configRuntimePath)){
    fs.copy(configPath, configRuntimePath);
}

//process depend on config-runtime.json
const processes = [
    require('./init-process'),
    require('./servlet-process')
];

processes.forEach(Process => {
    let process = new Process(cxt);
    process.run();
    cxt = process.getContext();
});