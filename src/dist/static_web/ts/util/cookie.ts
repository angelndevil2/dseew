/**
 * Created by k on 16. 3. 7.
 */
export class Cookie {

    constructor() {
        this.getCookies(true);
    }

    private _cookie = {};

    getCookies(force:boolean = false) {

        if (force) {
            if (document.cookie) {
                var cookie = document.cookie.split(";");
                for (var idx in cookie) {
                    var o = cookie[idx].split("=");
                    try {
                        this._cookie[o[0].trim()] = o[1];
                    } catch (err) {
                        this._cookie[o[0].trim()] = null;
                    }
                }
            }
        }
        return this._cookie;
    }

    getCookie(id:string) {
        return this._cookie[id];
    }

    isExist(id:string) {
        return this._cookie[id] != null;
    }

    setCookie(id:string, value:string) {
        this._cookie[id] = value;
        document.cookie = id + "=" + value + ";";
    }
}