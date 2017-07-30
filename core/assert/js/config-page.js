/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

define('page/config/db-setting', function(){

    var $type = $('.r-config-content-ds .ri-select[name=type]'),
        $sqliteSetting = $('.ds-sqlite-setting'),
        $mysqlSetting = $('.ds-mysql-setting');

    function doBiz(type){
        switch(type){
            case 'sqlite':
                $sqliteSetting.show();
                $mysqlSetting.hide();
                break;
            case 'mysql':
                $mysqlSetting.show();
                $sqliteSetting.hide();
                break;
        }
    }

    doBiz($type.val());
    $type.on('change', function(){
        doBiz($(this).val());
    });
});

define([
    'page/config/db-setting'
], function(){

});