/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const InitProcess = require('./init-process');
const ServletProcess = require('./servlet-process');

const processes = [
    InitProcess,
    ServletProcess
];

let _cache = {};
let cxt = {
    dbModel: {},
    route: null,
    emit: function(event, ...cxt){
        _cache[event] && _cache[event].forEach(listener => {
            listener.apply(null, cxt);
        })
    },
    on: function(event, func){
        if (_cache[event]){
            _cache.push(func);
        } else {
            _cache[event] = [func];
        }
    }
};
processes.forEach(Process => {
    let process = new Process(cxt);
    process.run();
    cxt = process.getContext();
});