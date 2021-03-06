import { Component } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { NavController } from 'ionic-angular';
import { Home } from '../home/home';

@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {
    GLBID: string;
    browser: any;
    constructor(private http: Http, private iab: InAppBrowser, private storage: Storage, private navCtrl:NavController) {
    }

    ionViewDidLoad() {
        this.storage.ready().then(() => {
            this.storage.get('GLBID').then(GLBID => {
                if (GLBID) {
                    console.log("GLBID: ", GLBID);
                    this.GLBID = GLBID;
                } else {
                    this.startLoginGlobo();
                }
            })
        })
    }

    startLoginGlobo() {
        this.browser = this.iab.create('https://login.globo.com/login/438', '_blank', { hidden: 'yes' });
        this.browser.on("loadstart").subscribe(event => this.handleOnLoadStart(event));
        this.browser.on("loadstop").subscribe(event => this.handleOnLoadStop(event));
        this.browser.on("exit").subscribe(event => this.handleOnExit(event));
    }

    private handleOnExit(event: InAppBrowserEvent) {
        this.getCartolaData();
    }

    private handleOnLoadStart(event: InAppBrowserEvent) {
        console.log("handleOnLoadStart");
    }

    private handleOnLoadStop(event: InAppBrowserEvent) {
        this.browser.show();

        setInterval(() => {
            this.browser.executeScript({ code: `document.cookie` })
                .then(args => {
                    if (args[0]) {
                        var cookie = args[0];
                        var name = "GLBID=";
                        var decodedCookie = decodeURIComponent(cookie);
                        var ca = decodedCookie.split(';');
                        for (var i = 0; i < ca.length; i++) {
                            var c = ca[i];
                            while (c.charAt(0) == ' ') {
                                c = c.substring(1);
                            }
                            if (c.indexOf(name) == 0) {
                                this.GLBID = c.substring(name.length, c.length);
                                this.storage.set('GLBID', this.GLBID);
                                this.browser.close();
                            }
                        }
                    }
                });
        }, 1000);
    }

    getCartolaData() {
        var headers = new Headers();
        headers.append("X-GLB-Token", this.GLBID);

        let options = new RequestOptions({ headers: headers });

        this.http.get("https://api.cartolafc.globo.com/auth/time", options)
            .subscribe(data => {
                console.log("ok");
                // this.navCtrl.pop();
                // this.navCtrl.push(Home, {data:data['_body']});
            }, error => {
                console.log("erro");
                console.log(error);// Error getting the data
            });
    }
}
