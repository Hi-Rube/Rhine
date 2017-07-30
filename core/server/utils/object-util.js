/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports = {

    hasSameOneLevelProperty: (objectA, objectB) => {
        let keysA = Object.keys(objectA),
            keysB = Object.keys(objectB);

        if (keysA.length !== keysB.length){
            return false;
        }

        for (let i = 0, len = keysA.length; i < len; i++){
            if (objectA[keysA[i]] !== objectB[keysA[i]]){
                return false;
            }
        }

        return true;
    }
};