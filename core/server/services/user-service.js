/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

const uuid = require('uuid');
const md5 = require('hash').md5;

module.exports = (mount, cxt) => {

    mount.createToken = () => {
        return md5(uuid.node().toString('base64') + Date.now()).digest().hex();
    };

    mount.createUser = (name, password, email, session) => {

        let salt = uuid.node().toString('base64').substr(0, 8),
            pwd = md5(salt + password).digest(salt).hex();

        let user = cxt.dbModel.Users.createSync({
            name: name,
            password: pwd,
            salt: salt,
            email: email,
            last_login: Date.now(),
            create_at: Date.now(),
            update_at: Date.now()
        });

        session.user = user;
    };

    mount.loginAuth = (name, password, session) => {

        let user = cxt.dbModel.Users.findOne({name: name});
        if (user && md5(user.salt + password).digest(user.salt).hex() === password){
            session.user = user;
        }
    };
};