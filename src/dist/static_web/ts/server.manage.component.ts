/**
 * Created by k on 16. 3. 7.
 */
import {Component, HostListener} from 'angular2/core';
import {ServerInputComponent} from './server.input.component';
import {ProxyInputComponent} from './proxy.input.component';
import {Server} from './lib/server'
import {ServerListService} from './service/server.list.service'
import {ServerListComponent} from './server.list.component'

@Component({
    selector: "server-manage",
    templateUrl: 'html/server.manage.component.html',
    directives: [ServerInputComponent, ProxyInputComponent, ServerListComponent]
})

export class ServerManageComponent {

    servers : Server[] = [];
    proxy: Server;

    constructor(private _serverListService: ServerListService) {}

    @HostListener('addServer', ['$event']) onAddServer(e) {
        if (this.servers) {
            this.servers.push(e);
            var s = '';
            for (var idx in this.servers) {
                s += this.servers[idx].addr + ',';
            }

            if (s.length > 0) {
                s = s.substr(0, s.length - 1);
                this._serverListService.setServers(s);
            }
        }
    }

    @HostListener('setProxy', ['$event']) onSetProxy(e) {
        this.proxy = e;
        this._serverListService.setProxyServer(this.proxy);
    }

    ngOnInit() {
        this.servers = this._serverListService.getServers();
        this.proxy = this._serverListService.getProxyServer();
    }
}
