/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

class BaseHandle {
    constructor(config){
        this.config = config || {};
    }

    run(subject, cxt){}
}

module.exports = BaseHandle;