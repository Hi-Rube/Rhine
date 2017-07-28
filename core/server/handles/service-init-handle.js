/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const BaseHandle = require('./base-handle');
const fs = require('fs');
const path = require('path');

const services = fs.readdir(path.join(__dirname, '../services')).map(serviceName => {
    return require(`../services/${serviceName}`);
});

class ServiceInitHandle extends BaseHandle{
    run(subject, cxt){
        //this handle's subject is app config
        services.forEach(service => {
            service(cxt.services, cxt);
        });

        cxt.emit(cxt.constant.EVENT_HANDLE_SERVICE_INIT_AFTER, cxt.services);
    }
}

module.exports = ServiceInitHandle;