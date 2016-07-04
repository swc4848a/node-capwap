const fs = require('fs');
const S = require('string');

function toSource(code) {
    fs.appendFileSync('./cwJsonApi.c', code, 'utf8', (err) => {
        if (err) throw err;
    });
};

function cleanAutoFile() {
    [
        './cwJsonApi.c',
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

(() => {
    fs.readFile('./template.json', 'utf8', (err, data) => {
        if (err) throw err;
        let template = JSON.parse(data);

        cleanAutoFile();

        template.forEach((item) => {
            let configFunctionName = S(item.config).replaceAll(' ', '_').s;
            toSource('void ' + configFunctionName + '_put_handler(struct json_object *request, void *data) {\r\n');

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
        });
    });
})();
