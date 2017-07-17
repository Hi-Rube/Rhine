/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

class BaseProcess {
    constructor(subject, cxt){
        this.cxt = cxt || {};
        this.subject = subject;
        this.handles = [];
    }

    setHandle(handle){
        if (Array.isArray(handle)){
            this.handles = this.handles.concat(handle);
        } else {
            this.handles.push(handle);
        }
    }

    getContext(){
        return this.cxt;
    }

    run(subject, cxt){
        if (this.handles && Array.isArray(this.handles)){
            this.handles.forEach(Handle => {
                (typeof Handle === 'function' ?
                    new Handle() :
                    Handle
                ).run(subject || this.subject, cxt || this.cxt);
            });
        }
    }
}

module.exports = BaseProcess;