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
const http = require('http');
const path = require('path');

class ServerHandle extends BaseHandle{
    run(subject, cxt){
        //this handle's subject is app config
        const fileHandler = new http.fileHandler(path.join(__dirname, '../../assert'));
        fibx.use(fibxEjs({
            root: path.join(__dirname, '../views/include')
        }));
        fibx.use('/assert/(.*)', fileHandler);
        fibx.use('/', cxt.route.getAllRoute());
        fibx.listen(subject.server.port);
    }
}

module.exports = ServerHandle;