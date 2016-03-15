/**
 * Created by k on 16. 3. 6.
 */
import {
    Component,
    HostListener,
    OnInit,
    Input
} from 'angular2/core';
import {
    RouteParams
} from 'angular2/router';
import {ServerListComponent} from './server.list.component';
import {MbeanServersComponent} from './mbean.servers.component';
import {Server} from './lib/server';
import {ServerListService} from "./service/server.list.service";
import {MbeansComponent} from "./mbeans.component";
import {HttpMbeanProxyService} from "./service/http.mbean.proxy.service";
import {MBeanDomainsComponent} from "./mbean.doamins.component";
import {MBean, MBeanServer, MBeanAttribute} from "./lib/mbean";
import {MBeanAttributesComponent} from "./mbean.attributes.component";
import {ProxyInputComponent} from './proxy.input.component';
import {ServerInputComponent} from './server.input.component';
import 'rxjs/Rx';

@Component({
    selector : "mbean-explorer",
    templateUrl: 'html/mbean.explorer.component.html',
    styleUrls : ['css/mbean.explorer.component.css'],
    directives: [
        ServerListComponent,
        MbeanServersComponent,
        MbeansComponent,
        MBeanDomainsComponent,
        MBeanAttributesComponent,
        ServerInputComponent,
        ProxyInputComponent
    ],
    providers:[ServerListService]
})

export class MBeanExplorerComponent implements OnInit{

    @Input() selected : Server;
    selectedMBeanServer: MBeanServer;
    selectedMBeanDomain : string;
    @Input() servers : Server[];
    domains:string[];
    mbeans:MBean[];
    selectedMBean:MBean;
    mbeanAttributes:MBeanAttribute[];
    @Input() proxy:Server;

    constructor(private _serverListService : ServerListService,
                private _http:HttpMbeanProxyService
    ) {}

    @HostListener('selectServer', ['$event']) onSelectServer(e) {
        this.selected = e;
        this.selectedMBeanServer = null;
        this.selectedMBeanDomain = null;
        this.mbeans = null;
    }

    @HostListener('selectMBeanServer', ['$event']) onSelectMBeanServer(e) {
        this.selectedMBeanServer = e;
        this.selectedMBeanDomain = null;
        this.mbeans = null;
        var self = this;
        this._http.getMBeanDomains(this.selected.addr, e.id)
            .subscribe(data => (function(data){
                var domains:string[] = [];
                for (var idx in data) {
                    domains.push(data[idx]);
                }

                self.domains = domains;
            })(data), err => console.error(err));
    }

    @HostListener('selectMBeanDomain', ['$event']) onSelectMBeanDomain(e) {
        this.selectedMBeanDomain = e;
        this.mbeans = null;
        var self = this;
        this._http.getMBeans(this.selected.addr, this.selectedMBeanServer.id, e)
            .subscribe(data => (function(data){
                var mbeans:MBean[] = [];
                for (var idx in data) {
                    var mbean = new MBean();
                    mbean.domain = e;
                    mbean.objectName = data[idx];
                    mbean.nameValues = self.parseMBean(data[idx]);
                    mbeans.push(mbean);
                }

                self.mbeans = mbeans;
            })(data), err => console.error(err));
    }

    @HostListener('setProxy', ['$event']) onSetProxy(e) {
        this.proxy = e;
        this._serverListService.setProxyServer(this.proxy);
    }

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

    @HostListener('get_attributes', ['$event']) getAttributes(e) {
        var self = this;
        this.selectedMBean = e;
        this._http.getAttributes(this.selected.addr, this.selectedMBeanServer.id, e.objectName)
            .subscribe(data => (function(data){
                var attributes:MBeanAttribute[] = [];

                for (var idx in data) {
                    try {
                        attributes.push(new MBeanAttribute(data[idx]));
                    } catch (err) {
                        console.error(err);
                    }
                }
                self.mbeanAttributes = attributes;
            })(data), err => console.error(err));

    }

    ngOnInit() {
        this.servers = this._serverListService.getServers();
        this.proxy = this._serverListService.getProxyServer();
    }

    private parseMBean(objectName:string) : Object {
        var ret = {};
        var domainSplit = objectName.split(":");
        var domainRemoved:string = objectName;
        if (domainSplit.length > 1) {
            domainRemoved = domainSplit[1];
        }
        var objectNameArray = domainRemoved.split(",");
        for (var idx in objectNameArray) {
            try {
                var nameValue = objectNameArray[idx].split("=");
                ret[nameValue[0]] = nameValue[1];
            } catch (err) {
                console.error(err);
            }
        }

        return ret;
    }
}