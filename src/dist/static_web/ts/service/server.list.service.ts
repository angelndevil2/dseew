/**
 * Created by k on 16. 3. 6.
 */
import {Injectable, Injector} from 'angular2/core'
import {Server} from '../lib/server'
import {CookieService} from './cookie.service'

@Injectable()
export class ServerListService {

    private _proxyServer : Server = null;
    private _servers : Server[] = [];

    constructor(private _cookie:CookieService) {
        this.getServers(true);
        this.getProxyServer(true);
    }

    getServers(force:boolean = false) {
        if (force) {
            var s = this._cookie.getCookie("servers");
            var c = s && s.split(",");
            for (var idx in c) {
                var server = new Server();
                server.addr = c[idx];
                this._servers.push(server);
            }
        }
        return this._servers;
    }

    setServers(servers:string) {
        this._cookie.setCookie("servers", servers);
    }

    getProxyServer(force:boolean = false) {
        if (force) {
            var addr = this._cookie.getCookie("proxy");
            if (addr != null) {
                var server = new Server();
                server.addr = addr;
                    this._proxyServer = server;
            } else {
                this._proxyServer = null;
            }
        }
        return this._proxyServer;
    }

    setProxyServer(server:Server) {
        this._proxyServer = server;
        this._cookie.setCookie("proxy", server.addr);
    }
}