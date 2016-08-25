

void system_global_settings_get_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *jarray = json_object_new_array();
    struct conf_node *cnode;
    struct json_object *jobject;
    char pathname[1024] = "system global";
    int err = -1;
    cnode = conf_find_node_by_path(devctx->conf->global, pathname);
    if (cnode) {
        jobject = json_object_new_object();
        conf_to_json_attr(jobject, devctx->conf, cnode, "adminPort", "admin-port", NULL);
        conf_to_json_attr(jobject, devctx->conf, cnode, "adminHttpsRedirect", "admin-https-redirect", NULL);
        conf_to_json_attr(jobject, devctx->conf, cnode, "adminsPort", "admin-sport", NULL);
        conf_to_json_attr(jobject, devctx->conf, cnode, "adminSshPort", "admin-ssh-port", NULL);
        conf_to_json_attr(jobject, devctx->conf, cnode, "adminTelnetPort", "admin-telnet-port", NULL);
        conf_to_json_attr(jobject, devctx->conf, cnode, "admintimeout", "admintimeout", NULL);
        json_object_array_add(jarray, jobject);
        err = 200;
    }
    json_object_object_add(json_resp, "code", json_object_new_int(0));
    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "entry not found" : "ok"));
    if (err == 200) json_object_object_add(json_resp, "result", jarray);
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    json_object_put(json_resp);
}

void firewall_addrgrp_put_handler(struct json_object *request, void *data) {
    int len, err = -1;
    char pathname[128];
    char *msg = "failed";
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct conf_node *parent = NULL, *node = NULL;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jnode = json_object_object_get(params, "addrgrp");
    struct json_object *jname = json_object_object_get(jnode, "name");
    char *name = json_object_get_string(jname);
    char cname[64] = {0};
    len = snprintf(pathname, sizeof(pathname), "root/firewall addrgrp/%s", name);
    node = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (!node) {
        len = snprintf(pathname, sizeof(pathname), "root/firewall addrgrp");
        parent = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (!parent) {
            node = create_conf_node(devctx->conf, "firewall addrgrp", NODE_T_TABLE);
            if (!node) { msg = "create conf node failed!"; goto out; }
            conf_add_node(devctx->conf, devctx->conf->cli_ctx, conf_get_root_vdom(devctx->conf), node);
            parent = node;
        }
    
        snprintf(cname, sizeof(cname), "\"%s\"", name);
        node = create_conf_node(devctx->conf, cname, NODE_T_ENTRY);
        if (!node) { msg = "create conf node failed!"; goto out; }
        conf_add_node(devctx->conf, devctx->conf->cli_ctx, parent, node);
    }
    json_to_conf_attr(jnode, devctx->conf, node, "member", "member", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "visibility", "visibility", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "allowRouting", "allowRouting", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "comment", "comment", NULL);
    err = 200; msg = "ok";
out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(msg));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);    
}

void firewall_addrgrp_get_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *jarray = json_object_new_array();

    struct conf_node *cnodes, *cnode, *attr;
    struct json_object *jnode, *jprofile;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "name");
    char name[64];
    char pathname[1024] = "root/firewall addrgrp";
    int err = -1, res = -1, array_length = 0;

    cnodes = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (cnodes) {
        list_for_each_entry(cnode, &cnodes->children, peer) {
            conf_dequote(cnode->name, name);
            if (jarrayname) {
                array_length = json_object_array_length(jarrayname);
                if (array_length && !json_object_array_find(jarrayname, name))
                    continue;
            }

            jnode = json_object_new_object();

            json_object_object_add(jnode, "name", json_object_new_string(name));
            conf_to_json_attr(jnode, devctx->conf, cnode, "member", "member", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "visibility", "visibility", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "allowRouting", "allowRouting", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "comment", "comment", NULL);

            json_object_array_add(jarray, jnode);
            err = 0;
        }
    }

    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err ? "entry not found" : "ok"));
    json_object_object_add(json_resp, "result", jarray);
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_addrgrp_delete_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();

    struct conf_node *node;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "names");
    char pathname[1024], *name = NULL;
    int err = -1, len;
    int i = 0, array_length = 0;

    if(!jarrayname){
        // We don't support "delete all"
        goto out;
    }

    array_length = json_object_array_length(jarrayname);
    for (i = 0; i < array_length; ++i) {
        name = json_object_get_string(json_object_array_get_idx(jarrayname, i));
        len = snprintf(pathname, sizeof(pathname), "root/firewall addrgrp/%s", name);
        node = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (node) {
            conf_node_delete(devctx->conf, node);
            err = 200;
        }
    }

out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "entry not found" : "ok"));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_address_put_handler(struct json_object *request, void *data) {
    int len, err = -1;
    char pathname[128];
    char *msg = "failed";
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct conf_node *parent = NULL, *node = NULL;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jnode = json_object_object_get(params, "address");
    struct json_object *jname = json_object_object_get(jnode, "name");
    char *name = json_object_get_string(jname);
    char cname[64] = {0};
    len = snprintf(pathname, sizeof(pathname), "root/firewall address/%s", name);
    node = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (!node) {
        len = snprintf(pathname, sizeof(pathname), "root/firewall address");
        parent = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (!parent) {
            node = create_conf_node(devctx->conf, "firewall address", NODE_T_TABLE);
            if (!node) { msg = "create conf node failed!"; goto out; }
            conf_add_node(devctx->conf, devctx->conf->cli_ctx, conf_get_root_vdom(devctx->conf), node);
            parent = node;
        }
    
        snprintf(cname, sizeof(cname), "\"%s\"", name);
        node = create_conf_node(devctx->conf, cname, NODE_T_ENTRY);
        if (!node) { msg = "create conf node failed!"; goto out; }
        conf_add_node(devctx->conf, devctx->conf->cli_ctx, parent, node);
    }
    json_to_conf_attr(jnode, devctx->conf, node, "type", "type", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "subnet", "subnet", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "startIp", "start-ip", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "endIp", "endip", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "fqdn", "fqdn", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "wildcardFqdn", "wildcard-fqdn", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "country", "country", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "associatedInterface", "associated-interface", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "visibility", "visibility", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "allowRouting", "allow-routing", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "comment", "comment", NULL);
    err = 200; msg = "ok";
out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(msg));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);    
}

void firewall_address_get_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *jarray = json_object_new_array();

    struct conf_node *cnodes, *cnode, *attr;
    struct json_object *jnode, *jprofile;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "name");
    char name[64];
    char pathname[1024] = "root/firewall address";
    int err = -1, res = -1, array_length = 0;

    cnodes = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (cnodes) {
        list_for_each_entry(cnode, &cnodes->children, peer) {
            conf_dequote(cnode->name, name);
            if (jarrayname) {
                array_length = json_object_array_length(jarrayname);
                if (array_length && !json_object_array_find(jarrayname, name))
                    continue;
            }

            jnode = json_object_new_object();

            json_object_object_add(jnode, "name", json_object_new_string(name));
            conf_to_json_attr(jnode, devctx->conf, cnode, "type", "type", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "subnet", "subnet", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "startIp", "start-ip", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "endIp", "endip", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "fqdn", "fqdn", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "wildcardFqdn", "wildcard-fqdn", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "country", "country", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "associatedInterface", "associated-interface", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "visibility", "visibility", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "allowRouting", "allow-routing", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "comment", "comment", NULL);

            json_object_array_add(jarray, jnode);
            err = 0;
        }
    }

    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err ? "entry not found" : "ok"));
    json_object_object_add(json_resp, "result", jarray);
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_address_delete_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();

    struct conf_node *node;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "names");
    char pathname[1024], *name = NULL;
    int err = -1, len;
    int i = 0, array_length = 0;

    if(!jarrayname){
        // We don't support "delete all"
        goto out;
    }

    array_length = json_object_array_length(jarrayname);
    for (i = 0; i < array_length; ++i) {
        name = json_object_get_string(json_object_array_get_idx(jarrayname, i));
        len = snprintf(pathname, sizeof(pathname), "root/firewall address/%s", name);
        node = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (node) {
            conf_node_delete(devctx->conf, node);
            err = 200;
        }
    }

out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "entry not found" : "ok"));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_schedule_onetime_put_handler(struct json_object *request, void *data) {
    int len, err = -1;
    char pathname[128];
    char *msg = "failed";
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct conf_node *parent = NULL, *node = NULL;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jnode = json_object_object_get(params, "onetime");
    struct json_object *jname = json_object_object_get(jnode, "name");
    char *name = json_object_get_string(jname);
    char cname[64] = {0};
    len = snprintf(pathname, sizeof(pathname), "root/firewall schedule onetime/%s", name);
    node = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (!node) {
        len = snprintf(pathname, sizeof(pathname), "root/firewall schedule onetime");
        parent = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (!parent) {
            node = create_conf_node(devctx->conf, "firewall schedule onetime", NODE_T_TABLE);
            if (!node) { msg = "create conf node failed!"; goto out; }
            conf_add_node(devctx->conf, devctx->conf->cli_ctx, conf_get_root_vdom(devctx->conf), node);
            parent = node;
        }
    
        snprintf(cname, sizeof(cname), "\"%s\"", name);
        node = create_conf_node(devctx->conf, cname, NODE_T_ENTRY);
        if (!node) { msg = "create conf node failed!"; goto out; }
        conf_add_node(devctx->conf, devctx->conf->cli_ctx, parent, node);
    }
    json_to_conf_attr(jnode, devctx->conf, node, "start", "start", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "end", "end", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "expirationDays", "expiration-days", NULL);
    err = 200; msg = "ok";
out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(msg));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);    
}

void firewall_schedule_onetime_get_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *jarray = json_object_new_array();

    struct conf_node *cnodes, *cnode, *attr;
    struct json_object *jnode, *jprofile;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "name");
    char name[64];
    char pathname[1024] = "root/firewall schedule onetime";
    int err = -1, res = -1, array_length = 0;

    cnodes = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (cnodes) {
        list_for_each_entry(cnode, &cnodes->children, peer) {
            conf_dequote(cnode->name, name);
            if (jarrayname) {
                array_length = json_object_array_length(jarrayname);
                if (array_length && !json_object_array_find(jarrayname, name))
                    continue;
            }

            jnode = json_object_new_object();

            json_object_object_add(jnode, "name", json_object_new_string(name));
            conf_to_json_attr(jnode, devctx->conf, cnode, "start", "start", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "end", "end", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "expirationDays", "expiration-days", NULL);

            json_object_array_add(jarray, jnode);
            err = 0;
        }
    }

    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err ? "entry not found" : "ok"));
    json_object_object_add(json_resp, "result", jarray);
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_schedule_onetime_delete_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();

    struct conf_node *node;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "names");
    char pathname[1024], *name = NULL;
    int err = -1, len;
    int i = 0, array_length = 0;

    if(!jarrayname){
        // We don't support "delete all"
        goto out;
    }

    array_length = json_object_array_length(jarrayname);
    for (i = 0; i < array_length; ++i) {
        name = json_object_get_string(json_object_array_get_idx(jarrayname, i));
        len = snprintf(pathname, sizeof(pathname), "root/firewall schedule onetime/%s", name);
        node = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (node) {
            conf_node_delete(devctx->conf, node);
            err = 200;
        }
    }

out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "entry not found" : "ok"));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_schedule_recurring_put_handler(struct json_object *request, void *data) {
    int len, err = -1;
    char pathname[128];
    char *msg = "failed";
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct conf_node *parent = NULL, *node = NULL;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jnode = json_object_object_get(params, "recurring");
    struct json_object *jname = json_object_object_get(jnode, "name");
    char *name = json_object_get_string(jname);
    char cname[64] = {0};
    len = snprintf(pathname, sizeof(pathname), "root/firewall schedule recurring/%s", name);
    node = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (!node) {
        len = snprintf(pathname, sizeof(pathname), "root/firewall schedule recurring");
        parent = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (!parent) {
            node = create_conf_node(devctx->conf, "firewall schedule recurring", NODE_T_TABLE);
            if (!node) { msg = "create conf node failed!"; goto out; }
            conf_add_node(devctx->conf, devctx->conf->cli_ctx, conf_get_root_vdom(devctx->conf), node);
            parent = node;
        }
    
        snprintf(cname, sizeof(cname), "\"%s\"", name);
        node = create_conf_node(devctx->conf, cname, NODE_T_ENTRY);
        if (!node) { msg = "create conf node failed!"; goto out; }
        conf_add_node(devctx->conf, devctx->conf->cli_ctx, parent, node);
    }
    json_to_conf_attr(jnode, devctx->conf, node, "day", "day", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "start", "start", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "end", "end", NULL);
    err = 200; msg = "ok";
out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(msg));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);    
}

void firewall_schedule_recurring_get_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *jarray = json_object_new_array();

    struct conf_node *cnodes, *cnode, *attr;
    struct json_object *jnode, *jprofile;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "name");
    char name[64];
    char pathname[1024] = "root/firewall schedule recurring";
    int err = -1, res = -1, array_length = 0;

    cnodes = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (cnodes) {
        list_for_each_entry(cnode, &cnodes->children, peer) {
            conf_dequote(cnode->name, name);
            if (jarrayname) {
                array_length = json_object_array_length(jarrayname);
                if (array_length && !json_object_array_find(jarrayname, name))
                    continue;
            }

            jnode = json_object_new_object();

            json_object_object_add(jnode, "name", json_object_new_string(name));
            conf_to_json_attr(jnode, devctx->conf, cnode, "day", "day", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "start", "start", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "end", "end", NULL);

            json_object_array_add(jarray, jnode);
            err = 0;
        }
    }

    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err ? "entry not found" : "ok"));
    json_object_object_add(json_resp, "result", jarray);
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_schedule_recurring_delete_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();

    struct conf_node *node;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "names");
    char pathname[1024], *name = NULL;
    int err = -1, len;
    int i = 0, array_length = 0;

    if(!jarrayname){
        // We don't support "delete all"
        goto out;
    }

    array_length = json_object_array_length(jarrayname);
    for (i = 0; i < array_length; ++i) {
        name = json_object_get_string(json_object_array_get_idx(jarrayname, i));
        len = snprintf(pathname, sizeof(pathname), "root/firewall schedule recurring/%s", name);
        node = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (node) {
            conf_node_delete(devctx->conf, node);
            err = 200;
        }
    }

out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "entry not found" : "ok"));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_schedule_group_put_handler(struct json_object *request, void *data) {
    int len, err = -1;
    char pathname[128];
    char *msg = "failed";
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct conf_node *parent = NULL, *node = NULL;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jnode = json_object_object_get(params, "scheduleGroup");
    struct json_object *jname = json_object_object_get(jnode, "name");
    char *name = json_object_get_string(jname);
    char cname[64] = {0};
    len = snprintf(pathname, sizeof(pathname), "root/firewall schedule group/%s", name);
    node = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (!node) {
        len = snprintf(pathname, sizeof(pathname), "root/firewall schedule group");
        parent = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (!parent) {
            node = create_conf_node(devctx->conf, "firewall schedule group", NODE_T_TABLE);
            if (!node) { msg = "create conf node failed!"; goto out; }
            conf_add_node(devctx->conf, devctx->conf->cli_ctx, conf_get_root_vdom(devctx->conf), node);
            parent = node;
        }
    
        snprintf(cname, sizeof(cname), "\"%s\"", name);
        node = create_conf_node(devctx->conf, cname, NODE_T_ENTRY);
        if (!node) { msg = "create conf node failed!"; goto out; }
        conf_add_node(devctx->conf, devctx->conf->cli_ctx, parent, node);
    }
    json_to_conf_attr(jnode, devctx->conf, node, "member", "member", NULL);
    err = 200; msg = "ok";
out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(msg));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);    
}

void firewall_schedule_group_get_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *jarray = json_object_new_array();

    struct conf_node *cnodes, *cnode, *attr;
    struct json_object *jnode, *jprofile;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "name");
    char name[64];
    char pathname[1024] = "root/firewall schedule group";
    int err = -1, res = -1, array_length = 0;

    cnodes = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (cnodes) {
        list_for_each_entry(cnode, &cnodes->children, peer) {
            conf_dequote(cnode->name, name);
            if (jarrayname) {
                array_length = json_object_array_length(jarrayname);
                if (array_length && !json_object_array_find(jarrayname, name))
                    continue;
            }

            jnode = json_object_new_object();

            json_object_object_add(jnode, "name", json_object_new_string(name));
            conf_to_json_attr(jnode, devctx->conf, cnode, "member", "member", NULL);

            json_object_array_add(jarray, jnode);
            err = 0;
        }
    }

    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err ? "entry not found" : "ok"));
    json_object_object_add(json_resp, "result", jarray);
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_schedule_group_delete_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();

    struct conf_node *node;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "names");
    char pathname[1024], *name = NULL;
    int err = -1, len;
    int i = 0, array_length = 0;

    if(!jarrayname){
        // We don't support "delete all"
        goto out;
    }

    array_length = json_object_array_length(jarrayname);
    for (i = 0; i < array_length; ++i) {
        name = json_object_get_string(json_object_array_get_idx(jarrayname, i));
        len = snprintf(pathname, sizeof(pathname), "root/firewall schedule group/%s", name);
        node = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (node) {
            conf_node_delete(devctx->conf, node);
            err = 200;
        }
    }

out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "entry not found" : "ok"));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_vip_put_handler(struct json_object *request, void *data) {
    int len, err = -1;
    char pathname[128];
    char *msg = "failed";
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct conf_node *parent = NULL, *node = NULL;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jnode = json_object_object_get(params, "vip");
    struct json_object *jname = json_object_object_get(jnode, "name");
    char *name = json_object_get_string(jname);
    char cname[64] = {0};
    len = snprintf(pathname, sizeof(pathname), "root/firewall vip/%s", name);
    node = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (!node) {
        len = snprintf(pathname, sizeof(pathname), "root/firewall vip");
        parent = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (!parent) {
            node = create_conf_node(devctx->conf, "firewall vip", NODE_T_TABLE);
            if (!node) { msg = "create conf node failed!"; goto out; }
            conf_add_node(devctx->conf, devctx->conf->cli_ctx, conf_get_root_vdom(devctx->conf), node);
            parent = node;
        }
    
        snprintf(cname, sizeof(cname), "\"%s\"", name);
        node = create_conf_node(devctx->conf, cname, NODE_T_ENTRY);
        if (!node) { msg = "create conf node failed!"; goto out; }
        conf_add_node(devctx->conf, devctx->conf->cli_ctx, parent, node);
    }
    json_to_conf_attr(jnode, devctx->conf, node, "comment", "comment", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "srcFilter", "src-filter", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "extip", "extip", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "extintf", "extintf", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "portforward", "portforward", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "mappedip", "mappedip", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "protocol", "protocol", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "extport", "extport", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "mappedport", "mappedport", NULL);
    err = 200; msg = "ok";
out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(msg));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);    
}

void firewall_vip_get_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *jarray = json_object_new_array();

    struct conf_node *cnodes, *cnode, *attr;
    struct json_object *jnode, *jprofile;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "name");
    char name[64];
    char pathname[1024] = "root/firewall vip";
    int err = -1, res = -1, array_length = 0;

    cnodes = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (cnodes) {
        list_for_each_entry(cnode, &cnodes->children, peer) {
            conf_dequote(cnode->name, name);
            if (jarrayname) {
                array_length = json_object_array_length(jarrayname);
                if (array_length && !json_object_array_find(jarrayname, name))
                    continue;
            }

            jnode = json_object_new_object();

            json_object_object_add(jnode, "name", json_object_new_string(name));
            conf_to_json_attr(jnode, devctx->conf, cnode, "comment", "comment", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "srcFilter", "src-filter", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "extip", "extip", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "extintf", "extintf", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "portforward", "portforward", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "mappedip", "mappedip", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "protocol", "protocol", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "extport", "extport", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "mappedport", "mappedport", NULL);

            json_object_array_add(jarray, jnode);
            err = 0;
        }
    }

    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err ? "entry not found" : "ok"));
    json_object_object_add(json_resp, "result", jarray);
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_vip_delete_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();

    struct conf_node *node;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "names");
    char pathname[1024], *name = NULL;
    int err = -1, len;
    int i = 0, array_length = 0;

    if(!jarrayname){
        // We don't support "delete all"
        goto out;
    }

    array_length = json_object_array_length(jarrayname);
    for (i = 0; i < array_length; ++i) {
        name = json_object_get_string(json_object_array_get_idx(jarrayname, i));
        len = snprintf(pathname, sizeof(pathname), "root/firewall vip/%s", name);
        node = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (node) {
            conf_node_delete(devctx->conf, node);
            err = 200;
        }
    }

out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "entry not found" : "ok"));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_vipgrp_put_handler(struct json_object *request, void *data) {
    int len, err = -1;
    char pathname[128];
    char *msg = "failed";
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct conf_node *parent = NULL, *node = NULL;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jnode = json_object_object_get(params, "vipgrp");
    struct json_object *jname = json_object_object_get(jnode, "name");
    char *name = json_object_get_string(jname);
    char cname[64] = {0};
    len = snprintf(pathname, sizeof(pathname), "root/firewall vipgrp/%s", name);
    node = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (!node) {
        len = snprintf(pathname, sizeof(pathname), "root/firewall vipgrp");
        parent = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (!parent) {
            node = create_conf_node(devctx->conf, "firewall vipgrp", NODE_T_TABLE);
            if (!node) { msg = "create conf node failed!"; goto out; }
            conf_add_node(devctx->conf, devctx->conf->cli_ctx, conf_get_root_vdom(devctx->conf), node);
            parent = node;
        }
    
        snprintf(cname, sizeof(cname), "\"%s\"", name);
        node = create_conf_node(devctx->conf, cname, NODE_T_ENTRY);
        if (!node) { msg = "create conf node failed!"; goto out; }
        conf_add_node(devctx->conf, devctx->conf->cli_ctx, parent, node);
    }
    json_to_conf_attr(jnode, devctx->conf, node, "comments", "comments", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "interface", "interface", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "member", "member", NULL);
    err = 200; msg = "ok";
out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(msg));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);    
}

void firewall_vipgrp_get_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *jarray = json_object_new_array();

    struct conf_node *cnodes, *cnode, *attr;
    struct json_object *jnode, *jprofile;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "name");
    char name[64];
    char pathname[1024] = "root/firewall vipgrp";
    int err = -1, res = -1, array_length = 0;

    cnodes = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (cnodes) {
        list_for_each_entry(cnode, &cnodes->children, peer) {
            conf_dequote(cnode->name, name);
            if (jarrayname) {
                array_length = json_object_array_length(jarrayname);
                if (array_length && !json_object_array_find(jarrayname, name))
                    continue;
            }

            jnode = json_object_new_object();

            json_object_object_add(jnode, "name", json_object_new_string(name));
            conf_to_json_attr(jnode, devctx->conf, cnode, "comments", "comments", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "interface", "interface", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "member", "member", NULL);

            json_object_array_add(jarray, jnode);
            err = 0;
        }
    }

    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err ? "entry not found" : "ok"));
    json_object_object_add(json_resp, "result", jarray);
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_vipgrp_delete_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();

    struct conf_node *node;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "names");
    char pathname[1024], *name = NULL;
    int err = -1, len;
    int i = 0, array_length = 0;

    if(!jarrayname){
        // We don't support "delete all"
        goto out;
    }

    array_length = json_object_array_length(jarrayname);
    for (i = 0; i < array_length; ++i) {
        name = json_object_get_string(json_object_array_get_idx(jarrayname, i));
        len = snprintf(pathname, sizeof(pathname), "root/firewall vipgrp/%s", name);
        node = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (node) {
            conf_node_delete(devctx->conf, node);
            err = 200;
        }
    }

out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "entry not found" : "ok"));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_ippool_put_handler(struct json_object *request, void *data) {
    int len, err = -1;
    char pathname[128];
    char *msg = "failed";
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct conf_node *parent = NULL, *node = NULL;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jnode = json_object_object_get(params, "ippool");
    struct json_object *jname = json_object_object_get(jnode, "name");
    char *name = json_object_get_string(jname);
    char cname[64] = {0};
    len = snprintf(pathname, sizeof(pathname), "root/firewall ippool/%s", name);
    node = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (!node) {
        len = snprintf(pathname, sizeof(pathname), "root/firewall ippool");
        parent = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (!parent) {
            node = create_conf_node(devctx->conf, "firewall ippool", NODE_T_TABLE);
            if (!node) { msg = "create conf node failed!"; goto out; }
            conf_add_node(devctx->conf, devctx->conf->cli_ctx, conf_get_root_vdom(devctx->conf), node);
            parent = node;
        }
    
        snprintf(cname, sizeof(cname), "\"%s\"", name);
        node = create_conf_node(devctx->conf, cname, NODE_T_ENTRY);
        if (!node) { msg = "create conf node failed!"; goto out; }
        conf_add_node(devctx->conf, devctx->conf->cli_ctx, parent, node);
    }
    json_to_conf_attr(jnode, devctx->conf, node, "type", "type", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "startip", "startip", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "endip", "endip", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "sourceStartip", "source-startip", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "sourceEndip", "source-endip", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "blockSize", "block-size", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "numBlocksPerUser", "num-blocks-per-user", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "arpReply", "arp-reply", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "comments", "comments", NULL);
    err = 200; msg = "ok";
out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(msg));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);    
}

void firewall_ippool_get_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *jarray = json_object_new_array();

    struct conf_node *cnodes, *cnode, *attr;
    struct json_object *jnode, *jprofile;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "name");
    char name[64];
    char pathname[1024] = "root/firewall ippool";
    int err = -1, res = -1, array_length = 0;

    cnodes = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (cnodes) {
        list_for_each_entry(cnode, &cnodes->children, peer) {
            conf_dequote(cnode->name, name);
            if (jarrayname) {
                array_length = json_object_array_length(jarrayname);
                if (array_length && !json_object_array_find(jarrayname, name))
                    continue;
            }

            jnode = json_object_new_object();

            json_object_object_add(jnode, "name", json_object_new_string(name));
            conf_to_json_attr(jnode, devctx->conf, cnode, "type", "type", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "startip", "startip", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "endip", "endip", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "sourceStartip", "source-startip", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "sourceEndip", "source-endip", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "blockSize", "block-size", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "numBlocksPerUser", "num-blocks-per-user", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "arpReply", "arp-reply", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "comments", "comments", NULL);

            json_object_array_add(jarray, jnode);
            err = 0;
        }
    }

    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err ? "entry not found" : "ok"));
    json_object_object_add(json_resp, "result", jarray);
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_ippool_delete_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();

    struct conf_node *node;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "names");
    char pathname[1024], *name = NULL;
    int err = -1, len;
    int i = 0, array_length = 0;

    if(!jarrayname){
        // We don't support "delete all"
        goto out;
    }

    array_length = json_object_array_length(jarrayname);
    for (i = 0; i < array_length; ++i) {
        name = json_object_get_string(json_object_array_get_idx(jarrayname, i));
        len = snprintf(pathname, sizeof(pathname), "root/firewall ippool/%s", name);
        node = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (node) {
            conf_node_delete(devctx->conf, node);
            err = 200;
        }
    }

out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "entry not found" : "ok"));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_shaper_traffic_shaper_put_handler(struct json_object *request, void *data) {
    int len, err = -1;
    char pathname[128];
    char *msg = "failed";
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct conf_node *parent = NULL, *node = NULL;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jnode = json_object_object_get(params, "trafficShaper");
    struct json_object *jname = json_object_object_get(jnode, "name");
    char *name = json_object_get_string(jname);
    char cname[64] = {0};
    len = snprintf(pathname, sizeof(pathname), "root/firewall shaper traffic-shaper/%s", name);
    node = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (!node) {
        len = snprintf(pathname, sizeof(pathname), "root/firewall shaper traffic-shaper");
        parent = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (!parent) {
            node = create_conf_node(devctx->conf, "firewall shaper traffic-shaper", NODE_T_TABLE);
            if (!node) { msg = "create conf node failed!"; goto out; }
            conf_add_node(devctx->conf, devctx->conf->cli_ctx, conf_get_root_vdom(devctx->conf), node);
            parent = node;
        }
    
        snprintf(cname, sizeof(cname), "\"%s\"", name);
        node = create_conf_node(devctx->conf, cname, NODE_T_ENTRY);
        if (!node) { msg = "create conf node failed!"; goto out; }
        conf_add_node(devctx->conf, devctx->conf->cli_ctx, parent, node);
    }
    json_to_conf_attr(jnode, devctx->conf, node, "guaranteedBandwidth", "guaranteed-bandwidth", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "maximumBandwidth", "maximum-bandwidth", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "priority", "priority", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "diffserv", "diffserv", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "diffservcode", "diffservcode", NULL);
    err = 200; msg = "ok";
out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(msg));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);    
}

void firewall_shaper_traffic_shaper_get_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *jarray = json_object_new_array();

    struct conf_node *cnodes, *cnode, *attr;
    struct json_object *jnode, *jprofile;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "name");
    char name[64];
    char pathname[1024] = "root/firewall shaper traffic-shaper";
    int err = -1, res = -1, array_length = 0;

    cnodes = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (cnodes) {
        list_for_each_entry(cnode, &cnodes->children, peer) {
            conf_dequote(cnode->name, name);
            if (jarrayname) {
                array_length = json_object_array_length(jarrayname);
                if (array_length && !json_object_array_find(jarrayname, name))
                    continue;
            }

            jnode = json_object_new_object();

            json_object_object_add(jnode, "name", json_object_new_string(name));
            conf_to_json_attr(jnode, devctx->conf, cnode, "guaranteedBandwidth", "guaranteed-bandwidth", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "maximumBandwidth", "maximum-bandwidth", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "priority", "priority", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "diffserv", "diffserv", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "diffservcode", "diffservcode", NULL);

            json_object_array_add(jarray, jnode);
            err = 0;
        }
    }

    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err ? "entry not found" : "ok"));
    json_object_object_add(json_resp, "result", jarray);
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_shaper_traffic_shaper_delete_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();

    struct conf_node *node;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "names");
    char pathname[1024], *name = NULL;
    int err = -1, len;
    int i = 0, array_length = 0;

    if(!jarrayname){
        // We don't support "delete all"
        goto out;
    }

    array_length = json_object_array_length(jarrayname);
    for (i = 0; i < array_length; ++i) {
        name = json_object_get_string(json_object_array_get_idx(jarrayname, i));
        len = snprintf(pathname, sizeof(pathname), "root/firewall shaper traffic-shaper/%s", name);
        node = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (node) {
            conf_node_delete(devctx->conf, node);
            err = 200;
        }
    }

out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "entry not found" : "ok"));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_shaper_per_ip_shaper_put_handler(struct json_object *request, void *data) {
    int len, err = -1;
    char pathname[128];
    char *msg = "failed";
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct conf_node *parent = NULL, *node = NULL;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jnode = json_object_object_get(params, "perIpShaper");
    struct json_object *jname = json_object_object_get(jnode, "name");
    char *name = json_object_get_string(jname);
    char cname[64] = {0};
    len = snprintf(pathname, sizeof(pathname), "root/firewall shaper per-ip-shaper/%s", name);
    node = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (!node) {
        len = snprintf(pathname, sizeof(pathname), "root/firewall shaper per-ip-shaper");
        parent = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (!parent) {
            node = create_conf_node(devctx->conf, "firewall shaper per-ip-shaper", NODE_T_TABLE);
            if (!node) { msg = "create conf node failed!"; goto out; }
            conf_add_node(devctx->conf, devctx->conf->cli_ctx, conf_get_root_vdom(devctx->conf), node);
            parent = node;
        }
    
        snprintf(cname, sizeof(cname), "\"%s\"", name);
        node = create_conf_node(devctx->conf, cname, NODE_T_ENTRY);
        if (!node) { msg = "create conf node failed!"; goto out; }
        conf_add_node(devctx->conf, devctx->conf->cli_ctx, parent, node);
    }
    json_to_conf_attr(jnode, devctx->conf, node, "maxBandwidth", "max-bandwidth", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "maxConcurrentSession", "max-concurrent-session", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "diffservForward", "diffserv-forward", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "diffservReverse", "diffserv-reverse", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "diffservcodeForward", "diffservcode-forward", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "diffservcodeRev", "diffservcode-rev", NULL);
    err = 200; msg = "ok";
out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(msg));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);    
}

void firewall_shaper_per_ip_shaper_get_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *jarray = json_object_new_array();

    struct conf_node *cnodes, *cnode, *attr;
    struct json_object *jnode, *jprofile;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "name");
    char name[64];
    char pathname[1024] = "root/firewall shaper per-ip-shaper";
    int err = -1, res = -1, array_length = 0;

    cnodes = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (cnodes) {
        list_for_each_entry(cnode, &cnodes->children, peer) {
            conf_dequote(cnode->name, name);
            if (jarrayname) {
                array_length = json_object_array_length(jarrayname);
                if (array_length && !json_object_array_find(jarrayname, name))
                    continue;
            }

            jnode = json_object_new_object();

            json_object_object_add(jnode, "name", json_object_new_string(name));
            conf_to_json_attr(jnode, devctx->conf, cnode, "maxBandwidth", "max-bandwidth", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "maxConcurrentSession", "max-concurrent-session", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "diffservForward", "diffserv-forward", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "diffservReverse", "diffserv-reverse", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "diffservcodeForward", "diffservcode-forward", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "diffservcodeRev", "diffservcode-rev", NULL);

            json_object_array_add(jarray, jnode);
            err = 0;
        }
    }

    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err ? "entry not found" : "ok"));
    json_object_object_add(json_resp, "result", jarray);
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_shaper_per_ip_shaper_delete_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();

    struct conf_node *node;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "names");
    char pathname[1024], *name = NULL;
    int err = -1, len;
    int i = 0, array_length = 0;

    if(!jarrayname){
        // We don't support "delete all"
        goto out;
    }

    array_length = json_object_array_length(jarrayname);
    for (i = 0; i < array_length; ++i) {
        name = json_object_get_string(json_object_array_get_idx(jarrayname, i));
        len = snprintf(pathname, sizeof(pathname), "root/firewall shaper per-ip-shaper/%s", name);
        node = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (node) {
            conf_node_delete(devctx->conf, node);
            err = 200;
        }
    }

out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "entry not found" : "ok"));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_shaping_policy_put_handler(struct json_object *request, void *data) {
    int len, err = -1, new_node = 0;
    char pathname[128];
    char *msg = "failed";
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct conf_node *parent, *child, *node = NULL;
    struct list_head *lchild;
    long seq = 0, id;
    char real_name[100];
    struct json_object *json_resp = json_object_new_object();
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jnode = json_object_object_get(params, "shapingPolicy");
    struct json_object *jseq = json_object_object_get(jnode, "seqNum");
    struct json_object *jrsp;
    if(jseq) seq = json_object_get_uint(jseq);
    if(seq > 0) {
        len = snprintf(pathname, sizeof(pathname), "root/firewall shaping-policy/%lu", seq);
        node = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (!node) { msg = "entry not found"; goto out; }
    } else {
        new_node = 1;
        len = snprintf(pathname, sizeof(pathname), "root/firewall shaping-policy");
        parent = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (!parent) {
            node = create_conf_node(devctx->conf, "firewall shaping-policy", NODE_T_TABLE);
            if (!node) { msg = "create conf node failed!"; goto out; }
            conf_add_node(devctx->conf, devctx->conf->cli_ctx, conf_get_root_vdom(devctx->conf), node);
            parent = node;
        }
        lchild = &parent->children;
        seq = 1;
        list_for_each_entry(child, lchild, peer) {
            id = atol(child->name);
            if(seq <= id){
                seq = id + 1;
            }
        }
        sprintf(real_name, "%lu", seq);
        node = create_conf_node(devctx->conf, real_name, NODE_T_ENTRY);
        if(!node){ goto out; }
        conf_add_node(devctx->conf, devctx->conf->cli_ctx, parent, node);
    }
    json_to_conf_attr(jnode, devctx->conf, node, "status", "status", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "service", "service", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "application", "application", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "appCategory", "app-category", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "urlCategory", "url-category", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "dstintf", "dstintf", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "trafficShaper", "traffic-shaper", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "trafficShaperReverse", "traffic-shaper-reverse", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "perIpShaper", "per-ip-shaper", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "srcaddr", "srcaddr", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "dstaddr", "dstaddr", NULL);
    err = 200; msg = "ok";
out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(msg));
    if(err == 200 && new_node){
        jrsp = json_object_new_object();
        json_object_object_add(jrsp, "id", json_object_new_int(seq));
        json_object_object_add(json_resp, "result", jrsp);
    }
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_shaping_policy_get_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *jarray = json_object_new_array();
    struct conf_node *ctable = NULL, *cnode = NULL;
    struct json_object *jobject = NULL;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jseq = json_object_object_get(params, "seqNum");
    int seq_len = 0, err = -1, id = 0;
    char pathname[64] = "root/firewall shaping-policy";

    ctable = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (ctable) {
        list_for_each_entry(cnode, &ctable->children, peer) {
            id = atol(cnode->name);
            if (jseq) {
                seq_len = json_object_array_length(jseq);
                if (seq_len && !json_object_array_find_int(jseq, id))
                    continue;
            }

            jobject = json_object_new_object();
            json_object_object_add(jobject, "seqNum", json_object_new_uint(id));

            conf_to_json_attr(jobject, devctx->conf, cnode, "status", "status", NULL);
            conf_to_json_attr(jobject, devctx->conf, cnode, "service", "service", NULL);
            conf_to_json_attr(jobject, devctx->conf, cnode, "application", "application", NULL);
            conf_to_json_attr(jobject, devctx->conf, cnode, "appCategory", "app-category", NULL);
            conf_to_json_attr(jobject, devctx->conf, cnode, "urlCategory", "url-category", NULL);
            conf_to_json_attr(jobject, devctx->conf, cnode, "dstintf", "dstintf", NULL);
            conf_to_json_attr(jobject, devctx->conf, cnode, "trafficShaper", "traffic-shaper", NULL);
            conf_to_json_attr(jobject, devctx->conf, cnode, "trafficShaperReverse", "traffic-shaper-reverse", NULL);
            conf_to_json_attr(jobject, devctx->conf, cnode, "perIpShaper", "per-ip-shaper", NULL);
            conf_to_json_attr(jobject, devctx->conf, cnode, "srcaddr", "srcaddr", NULL);
            conf_to_json_attr(jobject, devctx->conf, cnode, "dstaddr", "dstaddr", NULL);

            json_object_array_add(jarray, jobject);
            err = 200;
        }
    }

    json_object_object_add(json_resp, "code", json_object_new_int(0));
    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "entry not found" : "ok"));
    if (err == 200) json_object_object_add(json_resp, "result", jarray);
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void firewall_shaping_policy_delete_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();
    struct conf_node *node = NULL;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jseq = json_object_object_get(params, "seqNum"); 
    char pathname[1024];
    int err = -1, len;
    long seq = 0;
    int i, array_len = 0;

    if(jseq) array_len = json_object_array_length(jseq);
    if(array_len <= 0) { goto out; }

    for(i = 0; i < array_len; i++){
        seq = json_object_get_uint(json_object_array_get_idx(jseq, i));
        len = snprintf(pathname, sizeof(pathname), "root/firewall shaping-policy/%lu", seq);
        node = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (node) {
            conf_node_delete(devctx->conf, node);
            err = 0;
        }
    }

out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err ? "entry not found" : "ok"));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void system_admin_put_handler(struct json_object *request, void *data) {
    int len, err = -1;
    char pathname[128];
    char *msg = "failed";
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct conf_node *parent = NULL, *node = NULL;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jnode = json_object_object_get(params, "admin");
    struct json_object *jname = json_object_object_get(jnode, "name");
    char *name = json_object_get_string(jname);
    char cname[64] = {0};
    len = snprintf(pathname, sizeof(pathname), "root/system admin/%s", name);
    node = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (!node) {
        len = snprintf(pathname, sizeof(pathname), "root/system admin");
        parent = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (!parent) {
            node = create_conf_node(devctx->conf, "system admin", NODE_T_TABLE);
            if (!node) { msg = "create conf node failed!"; goto out; }
            conf_add_node(devctx->conf, devctx->conf->cli_ctx, conf_get_root_vdom(devctx->conf), node);
            parent = node;
        }
    
        snprintf(cname, sizeof(cname), "\"%s\"", name);
        node = create_conf_node(devctx->conf, cname, NODE_T_ENTRY);
        if (!node) { msg = "create conf node failed!"; goto out; }
        conf_add_node(devctx->conf, devctx->conf->cli_ctx, parent, node);
    }
    json_to_conf_attr(jnode, devctx->conf, node, "accprofile", "accprofile", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "comments", "comments", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "password", "password", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "trusthost1", "trusthost1", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "trusthost2", "trusthost2", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "trusthost3", "trusthost3", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "guestAuth", "guest-auth", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "guestUsergroups", "guest-usergroups", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "remoteAuth", "remote-auth", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "wildcard", "wildcard", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "remoteGroup", "remote-group", NULL);
    err = 200; msg = "ok";
out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(msg));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);    
}

void system_admin_get_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *jarray = json_object_new_array();

    struct conf_node *cnodes, *cnode, *attr;
    struct json_object *jnode, *jprofile;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "name");
    char name[64];
    char pathname[1024] = "root/system admin";
    int err = -1, res = -1, array_length = 0;

    cnodes = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (cnodes) {
        list_for_each_entry(cnode, &cnodes->children, peer) {
            conf_dequote(cnode->name, name);
            if (jarrayname) {
                array_length = json_object_array_length(jarrayname);
                if (array_length && !json_object_array_find(jarrayname, name))
                    continue;
            }

            jnode = json_object_new_object();

            json_object_object_add(jnode, "name", json_object_new_string(name));
            conf_to_json_attr(jnode, devctx->conf, cnode, "accprofile", "accprofile", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "comments", "comments", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "password", "password", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "trusthost1", "trusthost1", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "trusthost2", "trusthost2", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "trusthost3", "trusthost3", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "guestAuth", "guest-auth", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "guestUsergroups", "guest-usergroups", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "remoteAuth", "remote-auth", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "wildcard", "wildcard", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "remoteGroup", "remote-group", NULL);

            json_object_array_add(jarray, jnode);
            err = 0;
        }
    }

    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err ? "entry not found" : "ok"));
    json_object_object_add(json_resp, "result", jarray);
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void system_admin_delete_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();

    struct conf_node *node;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "names");
    char pathname[1024], *name = NULL;
    int err = -1, len;
    int i = 0, array_length = 0;

    if(!jarrayname){
        // We don't support "delete all"
        goto out;
    }

    array_length = json_object_array_length(jarrayname);
    for (i = 0; i < array_length; ++i) {
        name = json_object_get_string(json_object_array_get_idx(jarrayname, i));
        len = snprintf(pathname, sizeof(pathname), "root/system admin/%s", name);
        node = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (node) {
            conf_node_delete(devctx->conf, node);
            err = 200;
        }
    }

out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "entry not found" : "ok"));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void system_accprofile_put_handler(struct json_object *request, void *data) {
    int len, err = -1;
    char pathname[128];
    char *msg = "failed";
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct conf_node *parent = NULL, *node = NULL;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jnode = json_object_object_get(params, "accprofile");
    struct json_object *jname = json_object_object_get(jnode, "name");
    char *name = json_object_get_string(jname);
    char cname[64] = {0};
    len = snprintf(pathname, sizeof(pathname), "root/system accprofile/%s", name);
    node = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (!node) {
        len = snprintf(pathname, sizeof(pathname), "root/system accprofile");
        parent = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (!parent) {
            node = create_conf_node(devctx->conf, "system accprofile", NODE_T_TABLE);
            if (!node) { msg = "create conf node failed!"; goto out; }
            conf_add_node(devctx->conf, devctx->conf->cli_ctx, conf_get_root_vdom(devctx->conf), node);
            parent = node;
        }
    
        snprintf(cname, sizeof(cname), "\"%s\"", name);
        node = create_conf_node(devctx->conf, cname, NODE_T_ENTRY);
        if (!node) { msg = "create conf node failed!"; goto out; }
        conf_add_node(devctx->conf, devctx->conf->cli_ctx, parent, node);
    }
    json_to_conf_attr(jnode, devctx->conf, node, "comments", "comments", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "admingrp", "admingrp", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "updategrp", "updategrp", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "authgrp", "authgrp", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "sysgrp", "sysgrp", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "netgrp", "netgrp", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "loggrp", "loggrp", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "routegrp", "routegrp", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "fwgrp", "fwgrp", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "vpngrp", "vpngrp", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "utmgrp", "utmgrp", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "wanoptgrp", "wanoptgrp", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "endpoint-control-grp", "endpoint-control-grp", NULL);
    json_to_conf_attr(jnode, devctx->conf, node, "wifi", "wifi", NULL);
    err = 200; msg = "ok";
out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(msg));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);    
}

void system_accprofile_get_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();
    struct json_object *jarray = json_object_new_array();

    struct conf_node *cnodes, *cnode, *attr;
    struct json_object *jnode, *jprofile;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "name");
    char name[64];
    char pathname[1024] = "root/system accprofile";
    int err = -1, res = -1, array_length = 0;

    cnodes = conf_find_node_by_path(devctx->conf->vdom, pathname);
    if (cnodes) {
        list_for_each_entry(cnode, &cnodes->children, peer) {
            conf_dequote(cnode->name, name);
            if (jarrayname) {
                array_length = json_object_array_length(jarrayname);
                if (array_length && !json_object_array_find(jarrayname, name))
                    continue;
            }

            jnode = json_object_new_object();

            json_object_object_add(jnode, "name", json_object_new_string(name));
            conf_to_json_attr(jnode, devctx->conf, cnode, "comments", "comments", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "admingrp", "admingrp", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "updategrp", "updategrp", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "authgrp", "authgrp", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "sysgrp", "sysgrp", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "netgrp", "netgrp", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "loggrp", "loggrp", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "routegrp", "routegrp", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "fwgrp", "fwgrp", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "vpngrp", "vpngrp", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "utmgrp", "utmgrp", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "wanoptgrp", "wanoptgrp", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "endpoint-control-grp", "endpoint-control-grp", NULL);
            conf_to_json_attr(jnode, devctx->conf, cnode, "wifi", "wifi", NULL);

            json_object_array_add(jarray, jnode);
            err = 0;
        }
    }

    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err ? "entry not found" : "ok"));
    json_object_object_add(json_resp, "result", jarray);
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}

void system_accprofile_delete_handler(struct json_object *request, void *data) {
    fgfm_event_handle_t *ctx = (fgfm_event_handle_t *)data;
    dev_ctx_t *devctx = (dev_ctx_t *)ctx->data;
    struct json_object *json_resp = json_object_new_object();

    struct conf_node *node;
    struct json_object *params = json_object_object_get(request, "params");
    struct json_object *jarrayname = json_object_object_get(params, "names");
    char pathname[1024], *name = NULL;
    int err = -1, len;
    int i = 0, array_length = 0;

    if(!jarrayname){
        // We don't support "delete all"
        goto out;
    }

    array_length = json_object_array_length(jarrayname);
    for (i = 0; i < array_length; ++i) {
        name = json_object_get_string(json_object_array_get_idx(jarrayname, i));
        len = snprintf(pathname, sizeof(pathname), "root/system accprofile/%s", name);
        node = conf_find_node_by_path(devctx->conf->vdom, pathname);
        if (node) {
            conf_node_delete(devctx->conf, node);
            err = 200;
        }
    }

out:
    json_object_object_add(json_resp, "code", json_object_new_int(err));
    json_object_object_add(json_resp, "message", json_object_new_string(err < 0 ? "entry not found" : "ok"));
    fcldd_jsonrpc_send_reply(ctx->fd, json_resp);
    free_request_event_handle(ctx);
    json_object_put(json_resp);
}
