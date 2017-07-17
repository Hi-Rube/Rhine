/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const BaseProcess = require('./base-process');
const config = require('../../../config');
const ControllerHandle = require('../handles/controller-handle');
const ServerHandle = require('../handles/server-handle');

class ServletProcess extends BaseProcess{
    constructor(cxt){
        super(config, cxt);
        this.setHandle([
            ControllerHandle,
            ServerHandle
        ]);
    }
}

module.exports = ServletProcess;