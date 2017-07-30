/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports = {

    convertConfigDBForm2NewConfig: (form) => {
        switch (form.type){
            case 'sqlite':
                return {
                    type: 'sqlite',
                    sqlite: {
                        name: form.name
                    }
                };
            case 'mysql':
                return {
                    type: 'mysql',
                    mysql: {
                        database: form.database,
                        host: form.host,
                        user: form.user,
                        password: form.password,
                        port: form.port
                    }
                };
        }
    }
};