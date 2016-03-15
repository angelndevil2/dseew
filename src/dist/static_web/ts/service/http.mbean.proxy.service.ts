/**
 * Created by k on 16. 3. 8.
 */
import {Injectable} from 'angular2/core'
import {Http, Response} from 'angular2/http'
import {Server} from '../lib/server'
import {Observable} from 'rxjs/Observable';
/**
 * !important
 */
import 'rxjs/Rx'

@Injectable()
export class HttpMbeanProxyService {

    proxy : Server;

    constructor(private _http:Http){}

    getMBeanServers(addr:string) {
        if (this.proxy == null) throw Error("proxy server is null");
        var url = "http://" + this.proxy.addr+getMBeanServerIdQueryUri(addr);
        return this._http.get(url)
            .map(res => res.json())
            .catch(this.handleError)
    }

    getMBeanDomains(addr:string, id:string) {
        if (this.proxy == null) throw Error("proxy server is null");
        var url = "http://" + this.proxy.addr+getMBeanDomainsQueryUri(addr, id);
        return this._http.get(url)
            .map(res => res.json())
            .catch(this.handleError)
    }

    getMBeans(addr:string, id:string, domain:string) {
        if (this.proxy == null) throw Error("proxy server is null");
        var url = "http://" + this.proxy.addr+getDomainMBeansQueryUri(addr, id, domain);
        return this._http.get(url)
            .map(res => res.json())
            .catch(this.handleError)
    }

    getAttributes(addr:string, id:string, oname:string) {
        if (this.proxy == null) throw Error("proxy server is null");
        var url = "http://" + this.proxy.addr+getMBeanAttributesQueryUri(addr, id, oname);
        return this._http.get(url)
            .map(res => res.json())
            .catch(this.handleError)
    }

    getAttribute(addr:string, id:string, oname:string, aname:string, type:string = null) {

        if (this.proxy == null) throw Error("proxy server is null");

        var url = "http://" + this.proxy.addr + getMBeanAttributeQueryUri(addr, id, oname, aname, type);
        var ret = this._http.get(url);
        if (ret == null) return null;
        return ret.map(res => res.json());//.catch(this.handleError)
    }

    handleError(error) {
        // in a real world app, we may send the error to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error || 'Server error');
    }
}