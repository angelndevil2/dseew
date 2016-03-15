/**
 * Created by k on 16. 3. 4.
 */
import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {
    ROUTER_PROVIDERS,
    RouteParams,
    RouteConfig
} from 'angular2/router';
import {enableProdMode} from 'angular2/core';
import {CookieService} from './service/cookie.service';
import {ServerListService} from './service/server.list.service';
import {HTTP_PROVIDERS} from 'angular2/http'
import {HttpMbeanProxyService} from './service/http.mbean.proxy.service'

enableProdMode();

bootstrap(AppComponent,
    [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        CookieService,
        ServerListService,
        HttpMbeanProxyService
    ]
);