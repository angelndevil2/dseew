/**
 * Created by k on 16. 3. 9.
 */
import {Component,
    Input,
    Output,
    OnChanges,
    SimpleChange,
    EventEmitter} from 'angular2/core'
import {MBeanServer} from './lib/mbean'
import {Server} from './lib/server'
import {HttpMbeanProxyService} from "./service/http.mbean.proxy.service"
import {MBean} from './lib/mbean'
import 'rxjs/Rx';

@Component({
    "selector" : "mbean-domains",
    "templateUrl" : "html/mbean.domains.component.html"
})

export class MBeanDomainsComponent implements OnChanges {

    /**
     * primary field to manage with this class
     *
     * @type {string[]}
     */
    domains : string[];
    /**
     * selected mbean domain
     * @type {string}
     */
    selectedMBeanDomain: string;
    /**
     * selected jvm server
     *
     * @type {Server}
     */
    @Input() selectedServer:Server;
    /**
     * selected mbean servr
     *
     * @type {MBeanServer}
     */
    @Input() selectedMBeanServer:MBeanServer;
    /**
     * generated when mbean domain is selected
     * @type {EventEmitter}
     */
    @Output() MBeanDomainSelected: EventEmitter<any> = new EventEmitter();
    /**
     * generated when mbean domain list is changed
     *
     * @type {EventEmitter}
     */
    @Output() MBeanDomainListChanged: EventEmitter<any> = new EventEmitter();
    /**
     * mbean domain list visible flag
     * @type {boolean}
     */
    listVisible: boolean = false;

    /**
     *
     * @param _http {@link HttpMbeanProxyService} provided by parent
     */
    constructor(private _http:HttpMbeanProxyService){}

    onSelectMBeanDomain(domain:string) {
        this.selectedMBeanDomain = domain;
        this.MBeanDomainSelected.emit(domain);
    }

    /**
     * when selected mbean server is changed, reload {@link MBeanDomainsComponent.domains}
     * @param changes
     */
    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        // initailizing or can be check by each isFirstChange method
        // eg. if (changes['porxy'],isFirstChange()) ...
        if ("selectedMBeanServer" in changes) {
            if (!changes['selectedMBeanServer'].isFirstChange()) {
                if (changes['selectedMBeanServer'].currentValue) {
                    var self = this;
                    this._http.getMBeanDomains(this.selectedServer.addr, this.selectedMBeanServer.id)
                        .subscribe(data => (function(data) {
                            var domains = [];
                            for (var idx in data) {
                                domains.push(data[idx]);
                            }
                            self.changeMBeanDomainList(domains);
                            self.listVisible = true;
                        })(data), err => (function(err){
                            console.log(err);
                            self.changeMBeanDomainList(null);
                        })(err));
                } else {
                    this.changeMBeanDomainList(null);
                }
            }
        }
    }

    onListVisible() {
        this.listVisible = !this.listVisible;
    }

    private changeMBeanDomainList(domains:string[]) {
        this.domains = domains;
        this.selectedMBeanDomain = null;
        this.MBeanDomainListChanged.emit(this.domains);
    }
}