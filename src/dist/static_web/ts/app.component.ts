/**
 * Created by k on 16. 3. 4.
 */
import {Component} from 'angular2/core';
import {MBeanExplorerComponent} from './mbean.explorer.component';
import {HomeComponent} from './home.component';
import {
    RouteConfig,
    Router,
    RouteParams,
    ROUTER_DIRECTIVES,
    Location
} from 'angular2/router';

@Component({
    selector: 'my-app',
    templateUrl: 'html/app.component.html',
    styleUrls : ['css/app.component.css'],
    directives: [
        ROUTER_DIRECTIVES
    ]
})

@RouteConfig([
    {
        path:'/',
        name: 'Home',
        component: HomeComponent
    },
    {
        path:'/mbean-explorer',
        name: 'MBeanExplorer',
        component: MBeanExplorerComponent,
        //useAsDefault: true
    }
    //{path:'/server/:id',      name: 'Server',   component: HomeComponent/*not implemented*/}
])

export class AppComponent {}
