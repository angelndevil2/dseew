/**
 * Created by k on 16. 3. 9.
 */
import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {MBean, MBeanServer, MBeanAttribute} from './lib/mbean'
import {Server} from './lib/server'
import {limitTo} from './lib/limit.to.pipe'

@Component({
    "selector" : "mbeans",
    "templateUrl" : "html/mbeans.component.html",
    "styleUrls": ["css/mbeans.component.css"],
    "pipes": [limitTo]
})

export class MbeansComponent {
    @Input() selectedMBeanDomain:string;
    @Input() mbeans : MBean[];
    @Output() get_attributes: EventEmitter<any> = new EventEmitter();
    @Input() selectedMBean;

    getAttributes(mbean: MBean) {
        this.selectedMBean = mbean;
        this.get_attributes.emit(mbean);
    }
}