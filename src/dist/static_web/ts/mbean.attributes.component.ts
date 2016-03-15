/**
 * Created by k on 16. 3. 10.
 */
import {
    Component,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnChanges,
    SimpleChange
} from 'angular2/core'
import {
    MBeanAttribute,
    MBeanServer,
    MBean
} from './lib/mbean'
import {Server} from './lib/server'
import {HttpMbeanProxyService} from "./service/http.mbean.proxy.service";
import 'rxjs/Rx';

@Component({
    "selector" : "mbean-attributes",
    "templateUrl" : "html/mbean.attributes.component.html"
})

export class MBeanAttributesComponent implements OnInit, OnChanges {

    /**
     * event generated when attribute selected
     *
     * @type {EventEmitter}
     */
    @Output() select: EventEmitter<any> = new EventEmitter();
    /**
     * selected attribute
     */
    @Input() selectedAttribute : MBeanAttribute;
    /**
     * selected mbean, when changed {@link MBeanAttributesComponent#getAttributes(mbean)} is called
     */
    @Input() selectedMBean:MBean;
    /**
     * selected mbean's attributes
     */
    mbeanAttributes:MBeanAttribute[];
    /**
     * server on which jvm is running
     */
    @Input() server:Server;
    /**
     * mbean server which serve {@link MBeanAttributesComponent#selectedMBean}
     */
    @Input() mbeanServer:MBeanServer;

    /**
     * @constructor
     * @param _http
     */
    constructor(private _http:HttpMbeanProxyService) {}

    ngOnInit() {
        if (this.selectedMBean) {
            try {
                this.getAttributes(this.selectedMBean);
            } catch (err) {
                console.error(err);
            }
        }
    }

    /**
     * refresh attributes for selected mbean is changed
     *
     * @param changes
     */
    ngOnChanges(changes: {[propName: string]: SimpleChange}) {
        // initailizing or can be check by each isFirstChange method
        // eg. if (changes['porxy'],isFirstChange()) ...
        if ('selectedMBean' in changes && changes['selectedMBean'].isFirstChange()) {
        } else {
            if ("selectedMBean" in changes) {
                this.selectedMBean = changes['selectedMBean'].currentValue;
                this.getAttributes(this.selectedMBean);
            }
        }
    }

    /**
     * when selectedMBean is set, get it's attributes and set mbeanAttributes:MBeanAttribute[]
     *
     * @param mbean selected mbean
     * @returns {MBeanAttribute[] | null}
     */
    private getAttributes(mbean:MBean):MBeanAttribute[] {

        var observable = this._http.getAttributes(this.server.addr, this.mbeanServer.id, mbean.objectName);

/*        if (attribute.type === "javax.management.j2ee.statistics.Stats")
         var ret = this._http.getAttribute(this.selected.addr, this.selectedMBeanServer.id, this.selectedMBean.objectName, e.name, e.type);
         else var ret =this._http.getAttribute(this.selected.addr, this.selectedMBeanServer.id, this.selectedMBean.objectName, e.name);
                ret
         .subscribe(data => (function(data){
         console.log(data);
         })(data), err => console.error(err));*/
        if (observable) {
            var self = this;
            observable.subscribe(data => (function(data){
                var attributes:MBeanAttribute[] = [];

                for (var idx in data) {
                    try {
                        var attr = new MBeanAttribute(data[idx]);
                        self.getAttributeValue(attr);
                        console.log(attr.value);
                        attributes.push(attr);
                    } catch (err) {
                        console.error(err);
                    }
                }
                self.mbeanAttributes = attributes;
            })(data), err => console.error(err));
        }

        self.mbeanAttributes = null;

        return self.mbeanAttributes;
    }

    private getAttributeValue(attribute:MBeanAttribute) {

        var observable;
        if (attribute.type === "javax.management.j2ee.statistics.Stats") {
            observable = this._http.getAttribute(this.server.addr, this.mbeanServer.id, this.selectedMBean.objectName, attribute.name, attribute.type);
        } else {
            observable =this._http.getAttribute(this.server.addr, this.mbeanServer.id, this.selectedMBean.objectName, attribute.name);
        }

        if (observable) {
            observable
                .subscribe(data => (function (data) {
                    attribute.value = data;
                })(data), err => console.error(err));
        } else {
            throw new Error("fail to get attribute");
        }
    }

    onClick(attribute:MBeanAttribute) {
        this.selectedAttribute = attribute;
        this.select.emit(attribute);
    }

}