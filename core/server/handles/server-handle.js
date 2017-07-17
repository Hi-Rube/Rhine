/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const fibx = require('@fibjs/fibx')();
const fibxEjs = require('@fibjs/fibx-ejs');
const BaseHandle = require('./base-handle');

class ServerHandle extends BaseHandle{
    run(subject, cxt){
        //this handle's subject is app config
        fibx.use(fibxEjs());
        fibx.use('/', cxt.route.getAllRoute());
        fibx.listen(subject.server.port);
    }
}

module.exports = ServerHandle;