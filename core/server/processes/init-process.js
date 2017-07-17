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
const DbInitHandle = require('../handles/db-init-handle');

class InitProcess extends BaseProcess{
    constructor(cxt){
        super(config, cxt);
        this.setHandle([
            DbInitHandle
        ]);
    }
}

module.exports = InitProcess;