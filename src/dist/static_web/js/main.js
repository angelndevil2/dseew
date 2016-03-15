System.register(['angular2/platform/browser', './app.component', 'angular2/router', 'angular2/core', './service/cookie.service', './service/server.list.service', 'angular2/http', './service/http.mbean.proxy.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, app_component_1, router_1, core_1, cookie_service_1, server_list_service_1, http_1, http_mbean_proxy_service_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (cookie_service_1_1) {
                cookie_service_1 = cookie_service_1_1;
            },
            function (server_list_service_1_1) {
                server_list_service_1 = server_list_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (http_mbean_proxy_service_1_1) {
                http_mbean_proxy_service_1 = http_mbean_proxy_service_1_1;
            }],
        execute: function() {
            core_1.enableProdMode();
            browser_1.bootstrap(app_component_1.AppComponent, [
                router_1.ROUTER_PROVIDERS,
                http_1.HTTP_PROVIDERS,
                cookie_service_1.CookieService,
                server_list_service_1.ServerListService,
                http_mbean_proxy_service_1.HttpMbeanProxyService
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map