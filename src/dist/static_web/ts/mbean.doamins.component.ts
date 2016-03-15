/**
 * Created by k on 16. 3. 9.
 */
import {Component, Input, Output, EventEmitter} from 'angular2/core'
import {MBeanServer} from './lib/mbean'

@Component({
    "selector" : "mbean-domains",
    "templateUrl" : "html/mbean.domains.component.html"
})

export class MBeanDomainsComponent {

    @Input() selectedMBeanServer:MBeanServer;
    @Input() domains : string;
    @Output() selectMBeanDomain: EventEmitter<any> = new EventEmitter();
    selectedMBeanDomain: string;

    onSelectMBeanDomain(domain:string) {
        this.selectedMBeanDomain = domain;
        this.selectMBeanDomain.emit(domain);
    }
}