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
import {MBeanServersComponent} from './mbean.servers.component';
import {Server} from './lib/server';
import {ServerListService} from "./service/server.list.service";
import {MbeansComponent} from "./mbeans.component";
import {HttpMbeanProxyService} from "./service/http.mbean.proxy.service";
import {MBeanDomainsComponent} from "./mbean.doamins.component";
import {MBean, MBeanServer, MBeanAttribute} from "./lib/mbean";
import {ProxyComponent} from './proxy.component';
import {Widget} from './lib/widget'
import 'rxjs/Rx';

@Component({
    selector : "mbean-explorer",
    templateUrl: 'html/mbean.explorer.component.html',
    styleUrls : ['css/mbean.explorer.component.css'],
    directives: [
        ServerListComponent,
        MBeanServersComponent,
        MbeansComponent,
        MBeanDomainsComponent,
        ProxyComponent
    ]
})

export class MBeanExplorerComponent implements OnInit{

    /**
     * selected jvm server get from {@link ProxyComponent}
     */
    @Input() selectedServer : Server;
    @Input() selectedMBeanServer: MBeanServer;
    @Input() selectedMBeanDomain : string;
    @Input() servers : Server[];
    @Input() domains:string[];
    @Input() mbeans:MBean[];
    @Input() selectedMBean:MBean;
    @Input() mbeanAttributes:MBeanAttribute[];
    @Input() proxy:Server;
    @Input() mbeanServers:MBeanServer[];

    constructor(private _http:HttpMbeanProxyService) {}

    /**
     * listen from {@link ProxyComponent}
     * @param e
     */
    @HostListener('setProxy', ['proxy']) onSetProxy(e) {
        this.proxy = e;
    }

    /**
     * listen from {@link ServerListComponent}
     *
     * @param e
     */
    @HostListener('ServerListChanged', ['$event']) onServerListChanged(e) {
        this.selectedMBeanServer = null;
        this.selectedMBeanDomain = null;
        this.domains = null;
        this.mbeans = null;
        this.mbeanAttributes = null;
        this.servers = e;
    }

    /**
     * listen from {@link ServerListComponent}
     *
     * @param e
     */
    @HostListener('ServerSelected', ['$event']) onSelectServer(e) {
        this.selectedMBeanServer = null;
        this.selectedMBeanDomain = null;
        this.domains = null;
        this.mbeans = null;
        this.mbeanAttributes = null;
        this.selectedServer = e;
    }

    /**
     *  listen from {@link MBeanServersComponent}
     * @param e
     */
    @HostListener('MBeanSeverListChanged', ['$event']) onMBeanServerListChange(e) {
        this.selectedMBeanDomain = null;
        this.domains = null;
        this.mbeans = null;
        this.mbeanAttributes = null;
        this.mbeanServers = e;
    }

    /**
     *  listen from {@link MBeanServersComponent}
     * @param e
     */
    @HostListener('MBeanServerSelected', ['$event']) onSelectMBeanServer(e) {
        this.domains = null;
        this.mbeans = null;
        this.mbeanAttributes = null;
        this.selectedMBeanDomain = null;
        this.selectedMBeanServer = e;
    }

    /**
     *  listen from {@link MBeanDomainsComponent}
     * @param e
     */
    @HostListener('MBeanDomainSelected', ['$event']) onSelectMBeanDomain(e) {
        this.mbeans = null;
        this.mbeanAttributes = null;
        this.selectedMBeanDomain = e;
    }

    /**
     *  listen from {@link MBeanDomainsComponent}
     * @param e
     */
    @HostListener('MBeanDomainListChanged', ['$event']) onMBeanDomainListChange(e) {
        this.selectedMBeanDomain = null;
        this.mbeans = null;
        this.mbeanAttributes = null;
        this.domains = e;
    }

    @HostListener('get_attributes', ['$event']) getAttributes(e) {
        var self = this;
        this.selectedMBean = e;
        this._http.getAttributes(this.selectedServer.addr, this.selectedMBeanServer.id, e.objectName)
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

    }
}