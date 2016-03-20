/**
 * Created by k on 16. 3. 9.
 */
import {Component,
    Input,
    Output,
    EventEmitter,
    OnChanges,
    OnInit,
    SimpleChange,
    ContentChild
} from 'angular2/core';
import {
    MBean,
    MBeanServer,
    MBeanAttribute
} from './lib/mbean';
import {HttpMbeanProxyService} from './service/http.mbean.proxy.service';
import {Server} from './lib/server';
import {limitTo} from './lib/limit.to.pipe';
import {MBeanAttributesComponent} from "./mbean.attributes.component";


@Component({
    "selector" : "mbeans",
    "templateUrl" : "html/mbeans.component.html",
    "styleUrls": ["css/mbeans.component.css"],
    "pipes": [limitTo],
    directives:[
        MBeanAttributesComponent
    ]
})

export class MbeansComponent implements OnChanges, OnInit {

    /**
     * primary field to manage with this class
     *
     * @type {@link MBean[]}
     */
    mbeans : MBean[];
    selectedMBean: MBean;
    @Input() selectedServer:Server;
    @Input() selectedMBeanServer:MBeanServer;
    @Input() selectedMBeanDomain:string;
    /**
     * {@link MbeansComponent.mbeans} chnagned
     * @type {EventEmitter}
     */
    @Output() MBeanListChanged: EventEmitter<any> = new EventEmitter();
    @Output() get_attributes: EventEmitter<any> = new EventEmitter();

    /**
     *
     * @param _http {@link HttpMbeanProxyService} provided by parent
     */
    constructor(private _http:HttpMbeanProxyService){}

    getMBeans() {
        var self = this;
        this._http.getMBeans(this.selectedServer.addr, this.selectedMBeanServer.id, this.selectedMBeanDomain)
            .subscribe(data => (function(data){
                var mbeans:MBean[] = [];
                for (var idx in data) {
                    var mbean = new MBean();
                    mbean.domain = self.selectedMBeanDomain;
                    mbean.objectName = data[idx];
                    mbean.nameValues = MbeansComponent.parseObjectName(data[idx]);
                    mbeans.push(mbean);
                }

                self.mbeans = mbeans;
                self.MBeanListChanged.emit(self.mbeans);
            })(data), err => console.error(err));
    }

    onSelectMBean(mbean: MBean) {
        this.selectedMBean = mbean;
    }

    /**
     * when selected mbean domain is changed, reload {@link MbeansComponent.mbeans}
     * @param changes
     */
    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        // initailizing or can be check by each isFirstChange method
        // eg. if (changes['porxy'],isFirstChange()) ...
        if ("selectedMBeanDomain" in changes) {
            if (!changes['selectedMBeanDomain'].isFirstChange()) {
                if (changes['selectedMBeanDomain'].currentValue) this.getMBeans();
            }
        }
    }

    ngOnInit() {
        if (this.selectedServer && this.selectedMBeanServer && this.selectedMBeanDomain) {
            this.getMBeans();
        }
    }

    private static parseObjectName(objectName:string) : Object {
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