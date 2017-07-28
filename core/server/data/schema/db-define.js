/**
 * Copyright (c) 2015-present, Rube Dong
 * All rights reserved.
 *
 * This source code is licensed under the GPL-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

module.exports = {
    users: {
        id: {type: 'serial', key: true, unique: true},
        name: {type: 'text', size: 32, required: true, unique: true},
        password: {type: 'text', size: 32, required: true},
        salt: {type: 'text', size: 8, required: true},
        email: {type: 'text', size: 32, required: true},
        profile_image: {type: 'text'},
        profile_thumbnail: {type: 'text'},
        location: {type: 'text'},
        website: {type: 'text'},
        mobile: {type: 'text', size: 16},
        status: {type: 'text', required: true, defaultValue: 'active'},
        last_login: {type: 'date', time: false},
        create_at: {type: 'date', time: false},
        update_at: {type: 'date', time: false}
    },
    user_info: {
        id: {type: 'serial', key: true, unique: true},
        key: {type: 'text', required: true, unique: true},
        value: {type: 'text', required: true},
        user_id: {type: 'integer', required: true},
        create_at: {type: 'date', time: false},
        update_at: {type: 'date', time: false}
    },
    posts: {
        id: {type: 'serial', key: true, unique: true},
        uuid: {type: 'text', size: 64, required: true, unique: true},
        title: {type: 'text', required: true},
        post_html: {type: 'text', required: true},
        post_text: {type: 'text', required: true},
        desc: {type: 'text', required: true},
        feature_image: {type: 'text'},
        featured: {type: 'boolean', required: true, defaultValue: false},
        paged: {type: 'boolean', required: true, defaultValue: false},
        status: {type: 'text', required: true, defaultValue: 'draft'},
        meta_title: {type: 'text', size: 128},
        meta_desc: {type: 'text', size: 1024},
        author_id: {type: 'integer', required: true},
        create_by: {type: 'integer', required: true},
        create_at: {type: 'date', time: false},
        update_by: {type: 'integer', required: true},
        update_at: {type: 'date', time: false},
        publish_by: {type: 'integer', required: true},
        publish_at: {type: 'date', time: false}
    },
    settings: {
        id: {type: 'serial', key: true, unique: true},
        key: {type: 'text', required: true, unique: true},
        value: {type: 'text', required: true},
        create_by: {type: 'integer', required: true},
        update_by: {type: 'integer', required: true},
        create_at: {type: 'date', time: false},
        update_at: {type: 'date', time: false}
    },
    plugins: {
        id: {type: 'serial', key: true, unique: true},
        uuid: {type: 'text', size: 64, required: true},
        path: {type: 'text', required: true},
        version: {type: 'text', required: true},
        desc: {type: 'text', required: true},
        homepage: {type: 'text'},
        author: {type: 'text', size: 32, required: true},
        author_link: {type: 'text'},
        status: {type: 'text', size: 10, required: true, defaultValue: 'wait'},
        create_at: {type: 'date', time: false},
        update_at: {type: 'date', time: false}
    },
    tags: {
        id: {type: 'serial', key: true, unique: true},
        name: {type: 'text', size: 32, required: true, unique: true},
        desc: {type: 'text', size: 128, required: true},
        type: {type: 'text', size: 10, required: true, defaultValue: 'list'},
        create_at: {type: 'date', time: false},
        update_at: {type: 'date', time: false}
    },
    post_tags: {
        id: {type: 'serial', key: true, unique: true},
        tag_id: {type: 'integer', required: true},
        post_id: {type: 'integer', required: true},
        create_at: {type: 'date', time: false},
        update_at: {type: 'date', time: false}
    },
    accesstokens: {
        id: {type: 'serial', key: true, unique: true},
        token: {type: 'text', size: 32, required: true},
        user_id: {type: 'integer', required: true},
        user_from: {type: 'text', size: 64, required: true, defaultValue: 'web'},
        create_at: {type: 'date', time: false},
        update_at: {type: 'date', time: false},
        refresh: {type: 'integer', required: true, defaultValue: 0},
        expires: {type: 'number', required: true, defaultValue: 604800}//s
    }
};