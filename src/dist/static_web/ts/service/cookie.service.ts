/**
 * Created by k on 16. 3. 7.
 */
import {Injectable} from "angular2/core"
import {Cookie} from "../util/cookie"

@Injectable()
export class CookieService {

    private _cookie = new Cookie();

    getCookie(id:string) {
        return this._cookie.getCookie(id);
    }

    setCookie(id:string, value:string) {
        this._cookie.setCookie(id, value);
    }
}