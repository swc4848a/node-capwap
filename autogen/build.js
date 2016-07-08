const fs = require('fs');
const S = require('string');

function toSource(code) {
    fs.appendFileSync('./build/fcldd_pages_auto.c', code, 'utf8', (err) => {
        if (err) throw err;
    });
};

function toHeader(code) {
    fs.appendFileSync('./build/fcldd_pages_auto.h', code, 'utf8', (err) => {
        if (err) throw err;
    });
};

function cleanAutoFile() {
    [
        './build/fcldd_pages_auto.c',
        './build/fcldd_pages_auto.h'
    ].forEach((file) => {
        fs.writeFileSync(file, '\r\n', 'utf8', (err) => {
            if (err) throw err;
        });
    });
};

function getNode(config) {
    toSource('        len = snprintf(pathname, sizeof(pathname), "root/' + config + '/%lu", my_id);\r\n');
    toSource('        node = conf_find_node_by_path(devctx->conf->vdom, pathname);\r\n');
    toSource('        if (!node) { msg = "routing not found"; goto out; }\r\n');
};

function createNode(config) {
    toSource('        new_node = 1;\r\n');
    toSource('        len = snprintf(pathname, sizeof(pathname), "root/' + config + '");\r\n');
    toSource('        parent = conf_find_node_by_path(devctx->conf->vdom, pathname);\r\n');
    toSource('        if(!parent) goto out;        \r\n');
    toSource('        l = &parent->children;\r\n');
    toSource('        my_id = 1;\r\n');
    toSource('        list_for_each_entry(child, l, peer) {\r\n');
    toSource('            routing_id = atol(child->name);\r\n');
    toSource('            if(my_id <= routing_id){\r\n');
    toSource('                my_id = routing_id + 1;\r\n');
    toSource('            }\r\n');
    toSource('        }\r\n');
    toSource('        sprintf(real_name, "%lu", my_id);\r\n');
    toSource('        node = create_conf_node(devctx->conf, real_name, NODE_T_ENTRY);\r\n');
    toSource('        if(!node){ goto out; }\r\n');
    toSource('        conf_add_node(devctx->conf, devctx->conf->cli_ctx, parent, node);\r\n');
};

function buildTableIdPutHandler(item) {
    let configFunctionName = S(item.config).replaceAll(' ', '_').s;

    toSource('\r\nvoid ' + configFunctionName + '_put_handler(struct json_object *request, void *data) {\r\n');

    toSource('    int len, err = -1, new_node = 0;\r\n');
    toSource('    char pathname[128];\r\n');
    toSource('    char *msg = "failed";\r\n');
    toSource('    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;\r\n');
    toSource('    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;\r\n');
    toSource('    struct conf_node *parent, *child, *node = NULL;\r\n');
    toSource('    struct list_head *l;\r\n');
    toSource('    long my_id = 0, routing_id;\r\n');
    toSource('    char real_name[100];\r\n');

    toSource('    struct json_object *json_resp = json_object_new_object();\r\n');
    toSource('    struct json_object *params = json_object_object_get(request, "params");\r\n');
    toSource('    struct json_object *jrouting = json_object_object_get(params, "' + item.params + '");\r\n');
    toSource('    struct json_object *jid = json_object_object_get(jrouting, "seqNum");\r\n');
    toSource('    struct json_object *jreply_id;\r\n');

    toSource('    if(jid) my_id = json_object_get_uint(jid);\r\n');

    toSource('    if(my_id > 0) {\r\n');
    getNode(item.config);
    toSource('    } else {\r\n');
    createNode(item.config);
    toSource('    }\r\n');

    for (p in item.map) {
        let callback = 'NULL';
        if (p in item.cb) {
            callback = item.cb[p];
        }
        toSource('    json_to_conf_attr(jrouting, devctx->conf, node, "' + p + '", "' + item.map[p] + '", ' + callback + ');\r\n');
    }

    toSource('    err = 200; msg = "ok";\r\n');

    toSource('out:\r\n');
    toSource('    json_object_object_add(json_resp, "code", json_object_new_int(err));\r\n');
    toSource('    json_object_object_add(json_resp, "message", json_object_new_string(msg));\r\n');
    toSource('    if(err == 200 && new_node){\r\n');
    toSource('        jreply_id = json_object_new_object();\r\n');
    toSource('        json_object_object_add(jreply_id, "id", json_object_new_int(my_id));\r\n');
    toSource('        json_object_object_add(json_resp, "result", jreply_id);\r\n');
    toSource('    }\r\n');
    toSource('    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);\r\n');
    toSource('    json_object_put(json_resp);\r\n');

    toSource('}\r\n');
};

function buildFormGetHandler(item) {
    let functionName = S(item.config + ' ' + item.params).replaceAll(' ', '_').s;
    toSource('\r\nvoid ' + functionName + '_get_handler(struct json_object *request, void *data) {\r\n');

    toSource('    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;\r\n');
    toSource('    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;\r\n');
    toSource('    struct json_object *json_resp = json_object_new_object();\r\n');
    toSource('    struct json_object *jarray = json_object_new_array();\r\n');

    toSource('    struct conf_node *cnode;\r\n');
    toSource('    struct json_object *jobject;\r\n');
    toSource('    char pathname[1024] = "system global";\r\n');
    toSource('    int err = -1;\r\n');

    toSource('    cnode = conf_find_node_by_path(devctx->conf->global, pathname);\r\n');
    toSource('    if (cnode) {\r\n');
    toSource('        jobject = json_object_new_object();\r\n');

    for (p in item.map) {
        let callback = 'NULL';
        if (item.cb && p in item.cb) {
            callback = item.cb[p];
        }
        toSource('        conf_to_json_attr(jobject, devctx->conf, cnode, "' + p + '", "' + item.map[p] + '", ' + callback + ');\r\n');
    }

    toSource('        json_object_array_add(jarray, jobject);\r\n');
    toSource('        err = 200;\r\n');
    toSource('    }\r\n');

    toSource('    json_object_object_add(json_resp, "code", json_object_new_int(0));\r\n');
    toSource('    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "dns not found" : "ok"));\r\n');
    toSource('    if (err == 200) json_object_object_add(json_resp, "result", jarray);\r\n');
    toSource('    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);\r\n');
    toSource('    json_object_put(json_resp);\r\n');

    toSource('}\r\n');
};

function buildFormPutHandler(item) {};

function buildTableNamePutHandler(item) {
    let configFunctionName = S(item.config).replaceAll(' ', '_').s;
    toSource('\r\nvoid ' + configFunctionName + '_put_handler(struct json_object *request, void *data) {\r\n');

    toSource('    int len, err = -1;\r\n');
    toSource('    char pathname[128];\r\n');
    toSource('    char *msg = \"failed\";\r\n');
    toSource('    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;\r\n');
    toSource('    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;\r\n');

    toSource('    struct conf_node *parent = NULL, *node = NULL;\r\n');
    toSource('    struct json_object *json_resp = json_object_new_object();\r\n');
    toSource('    struct json_object *params = json_object_object_get(request, "params");\r\n');
    toSource('    struct json_object *jnode = json_object_object_get(params, "' + item.params + '");\r\n');
    toSource('    struct json_object *jname = json_object_object_get(jnode, "name");\r\n');
    toSource('    char *name = json_object_get_string(jname);\r\n');
    toSource('    char cname[64] = {0};\r\n');


    toSource('    len = snprintf(pathname, sizeof(pathname), "root/' + item.config + '/%s", name);\r\n');
    toSource('    node = conf_find_node_by_path(devctx->conf->vdom, pathname);\r\n');
    toSource('    if (!node) {\r\n');
    toSource('        len = snprintf(pathname, sizeof(pathname), "root/' + item.config + '");\r\n');
    toSource('        parent = conf_find_node_by_path(devctx->conf->vdom, pathname);\r\n');
    toSource('        if (!parent) {\r\n');
    toSource('            node = create_conf_node(devctx->conf, "' + item.config + '", NODE_T_TABLE);\r\n');
    toSource('            if (!node) { msg = "create conf node failed!"; goto out; }\r\n');
    toSource('            conf_add_node(devctx->conf, devctx->conf->cli_ctx, conf_get_root_vdom(devctx->conf), node);\r\n');
    toSource('            parent = node;\r\n');
    toSource('        }\r\n');
    toSource('    \r\n');
    toSource('        snprintf(cname, sizeof(cname), "\\"%s\\"", name);\r\n');
    toSource('        node = create_conf_node(devctx->conf, cname, NODE_T_ENTRY);\r\n');
    toSource('        if (!node) { msg = "create conf node failed!"; goto out; }\r\n');
    toSource('        conf_add_node(devctx->conf, devctx->conf->cli_ctx, parent, node);\r\n');
    toSource('    }\r\n');

    for (p in item.map) {
        let callback = 'NULL';
        if (item.cb && p in item.cb) {
            callback = item.cb[p];
        }
        toSource('    json_to_conf_attr(jnode, devctx->conf, node, "' + p + '", "' + item.map[p] + '", ' + callback + ');\r\n');
    }

    toSource('    err = 200; msg = "ok";\r\n');

    toSource('out:\r\n');
    toSource('    json_object_object_add(json_resp, "code", json_object_new_int(err));\r\n');
    toSource('    json_object_object_add(json_resp, "message", json_object_new_string(msg));\r\n');
    toSource('    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);\r\n');
    toSource('    free_request_event_handle(ctx);\r\n');
    toSource('    json_object_put(json_resp);    \r\n');

    toSource('}\r\n');
};

function buildTableNameGetHandler(item) {
    let configFunctionName = S(item.config).replaceAll(' ', '_').s;

    toSource('\r\nvoid ' + configFunctionName + '_get_handler(struct json_object *request, void *data) {\r\n');
    toSource('    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;\r\n');
    toSource('    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;\r\n');
    toSource('    struct json_object *json_resp = json_object_new_object();\r\n');
    toSource('    struct json_object *jarray = json_object_new_array();\r\n');
    toSource('\r\n');
    toSource('    struct conf_node *cnodes, *cnode, *attr;\r\n');
    toSource('    struct json_object *jnode, *jprofile;\r\n');
    toSource('    struct json_object *params = json_object_object_get(request, "params");\r\n');
    toSource('    struct json_object *jarrayname = json_object_object_get(params, "name");\r\n');
    toSource('    char name[64];\r\n');
    toSource('    char pathname[1024] = "root/' + item.config + '";\r\n');
    toSource('    int err = -1, res = -1, array_length = 0;\r\n');
    toSource('\r\n');
    toSource('    cnodes = conf_find_node_by_path(devctx->conf->vdom, pathname);\r\n');
    toSource('    if (cnodes) {\r\n');
    toSource('        list_for_each_entry(cnode, &cnodes->children, peer) {\r\n');
    toSource('            conf_dequote(cnode->name, name);\r\n');
    toSource('            if (jarrayname) {\r\n');
    toSource('                array_length = json_object_array_length(jarrayname);\r\n');
    toSource('                if (array_length && !json_object_array_find(jarrayname, name))\r\n');
    toSource('                    continue;\r\n');
    toSource('            }\r\n');
    toSource('\r\n');
    toSource('            jnode = json_object_new_object();\r\n');
    toSource('\r\n');
    toSource('            json_object_object_add(jnode, "name", json_object_new_string(name));\r\n');

    for (p in item.map) {
        let callback = 'NULL';
        if (item.cb && p in item.cb) {
            callback = item.cb[p];
        }
        toSource('            conf_to_json_attr(jnode, devctx->conf, cnode, "' + p + '", "' + item.map[p] + '", ' + callback + ');\r\n');
    }

    toSource('\r\n');
    toSource('            json_object_array_add(jarray, jnode);\r\n');
    toSource('            err = 0;\r\n');
    toSource('        }\r\n');
    toSource('    }\r\n');
    toSource('\r\n');
    toSource('    json_object_object_add(json_resp, "code", json_object_new_int(err));\r\n');
    toSource('    json_object_object_add(json_resp, "message", json_object_new_string(err ? "service not found" : "ok"));\r\n');
    toSource('    json_object_object_add(json_resp, "result", jarray);\r\n');
    toSource('    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);\r\n');
    toSource('    free_request_event_handle(ctx);\r\n');
    toSource('    json_object_put(json_resp);\r\n');
    toSource('}\r\n');
};

function buildTableNameDeleteHandler(item) {
    let configFunctionName = S(item.config).replaceAll(' ', '_').s;

    toSource('\r\nvoid ' + configFunctionName + '_delete_handler(struct json_object *request, void *data) {\r\n');
    toSource('    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;\r\n');
    toSource('    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;\r\n');
    toSource('    struct json_object *json_resp = json_object_new_object();\r\n');
    toSource('\r\n');
    toSource('    struct conf_node *node;\r\n');
    toSource('    struct json_object *params = json_object_object_get(request, "params");\r\n');
    toSource('    struct json_object *jarrayname = json_object_object_get(params, "names");\r\n');
    toSource('    char pathname[1024], *name = NULL;\r\n');
    toSource('    int err = -1, len;\r\n');
    toSource('    int i = 0, array_length = 0;\r\n');
    toSource('\r\n');
    toSource('    if(!jarrayname){\r\n');
    toSource('        // We don\'t support "delete all"\r\n');
    toSource('        goto out;\r\n');
    toSource('    }\r\n');
    toSource('\r\n');
    toSource('    array_length = json_object_array_length(jarrayname);\r\n');
    toSource('    for (i = 0; i < array_length; ++i) {\r\n');
    toSource('        name = json_object_get_string(json_object_array_get_idx(jarrayname, i));\r\n');
    toSource('        len = snprintf(pathname, sizeof(pathname), "root/' + item.config + '/%s", name);\r\n');
    toSource('        node = conf_find_node_by_path(devctx->conf->vdom, pathname);\r\n');
    toSource('        if (node) {\r\n');
    toSource('            conf_node_delete(devctx->conf, node);\r\n');
    toSource('            err = 200;\r\n');
    toSource('        }\r\n');
    toSource('    }\r\n');
    toSource('\r\n');
    toSource('out:\r\n');
    toSource('    json_object_object_add(json_resp, "code", json_object_new_int(err));\r\n');
    toSource('    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "service not found" : "ok"));\r\n');
    toSource('    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);\r\n');
    toSource('    free_request_event_handle(ctx);\r\n');
    toSource('    json_object_put(json_resp);\r\n');
    toSource('}\r\n');
};

function buildHeaderFile(item) {
    let configFunctionName = S(item.config).replaceAll(' ', '_').s;

    toHeader('extern void ' + configFunctionName + '_put_handler(struct json_object *request, void *data);\r\n');
    toHeader('extern void ' + configFunctionName + '_get_handler(struct json_object *request, void *data);\r\n');
    toHeader('extern void ' + configFunctionName + '_delete_handler(struct json_object *request, void *data);\r\n');
};

function buildTestCase(item) {
    let query = S(item.config).parseCSV(' ');
    let module = query[query.length - 1];

    let getAll = {
        action: module + 'Get',
        sn: 'FGT60D4615007833'
    };

    let file = './build/' + module + 'GetAll.json';
    let content = JSON.stringify(getAll);
    fs.writeFile(file, content, 'utf8', (err) => {
        if (err) throw err;
    });

    let get = {
        action: module + 'Get',
        sn: 'FGT60D4615007833',
        params: {
            name: ['test']
        }
    };

    file = './build/' + module + 'Get.json';
    content = JSON.stringify(get);
    fs.writeFile(file, content, 'utf8', (err) => {
        if (err) throw err;
    });

    let put = {
        action: module + 'Put',
        sn: 'FGT60D4615007833',
        params: {}
    };

    let body = put.params[module] = {};

    if ('name' === item.key) {
        body.name = "test";
    }

    for (key in item.map) {
        body[key] = "";
    }

    file = './build/' + module + 'Put.json';
    content = JSON.stringify(put);
    fs.writeFile(file, content, 'utf8', (err) => {
        if (err) throw err;
    });

    let del = {
        action: module + 'Delete',
        sn: 'FGT60D4615007833',
        params: {
            names: ['test']
        }
    };

    file = './build/' + module + 'Delete.json';
    content = JSON.stringify(del);
    fs.writeFile(file, content, 'utf8', (err) => {
        if (err) throw err;
    });
}

(() => {
    fs.readFile('./template.json', 'utf8', (err, data) => {
        if (err) throw err;
        let template = JSON.parse(data);

        cleanAutoFile();

        template.forEach((item) => {
            buildHeaderFile(item);

            if ('table' === item.type) {
                if ('name' === item.key) {
                    buildTableNamePutHandler(item);
                    buildTableNameGetHandler(item);
                    buildTableNameDeleteHandler(item);
                    buildTestCase(item);
                } else if ('id' === item.key) {
                    buildTableIdPutHandler(item);
                }
            } else if ('form' === item.type) {
                buildFormGetHandler(item);
                buildFormPutHandler(item);
            }
        });
    });
})();
