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
const BaseHandle = require('./base-handle');
const route = require('@fibjs/fibx-router')({
    fixSlash: true,
    simulation: true,
    size: 200
});

const controllers = fs.readdir(path.join(__dirname, '../controllers')).map(ctrName => {
    return require(`../controllers/${ctrName}`);
});

class ControllerHandle extends BaseHandle{
    run(subject, cxt){
        //this handle's subject is app config
        controllers.forEach(controller => {
            controller(route, cxt);
        });
        cxt.route = route;
        cxt.emit(cxt.constant.EVENT_HANDLE_CONTROLLER_AFTER, route);
    }
}

module.exports = ControllerHandle;
