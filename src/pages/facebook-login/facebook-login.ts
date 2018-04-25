import { Component, ViewChild } from '@angular/core';
import { Facebook } from '@ionic-native/facebook';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Storage } from '@ionic/storage';
import { NavParams, IonicPage, Segment } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser'
import { SafeHtmlPipe } from '../../shared/safe-html-pipe';

@IonicPage({
    segment: 'facebookLogin/:status'
})
@Component({
    selector: 'page-facebook-login',
    templateUrl: 'facebook-login.html',
})
export class FacebookLoginPage {
    facebookData: any;
    globoPage:string;
    safeHtmlContent: string;
    noLogin: boolean = true;
    GLBID: string;
    interval: number;
    constructor(public facebook: Facebook, public http: Http, private storage: Storage, public navParams: NavParams) {
    }
    @ViewChild('teste') teste;
    ionViewDidLoad() {  
        // this.cartolaLogin();
        this.verifyLogin();
    }

    verifyLogin(){
        this.interval = setInterval(() => {
            console.log('verificando');
            var cookie = window.frames[0].document.cookie;
            var name = "GLBID=";
            var decodedCookie = decodeURIComponent(cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    this.noLogin = false;
                    this.GLBID = c.substring(name.length, c.length);
                    this.loginOk();
                }
            }
        }, 1000);
    }

    loginOk(){
        clearInterval(this.interval);
        console.log(this.GLBID);
    }

    cartolaLogin() {
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');

        let options = new RequestOptions({ headers: headers });
        // usuario.nome = res.name;
        // usuario.email = res.email;
        // usuario.senha = res.id;
        // usuario.login = res.email;
        let postParams = {
            "payload": {
                "email": "junior310595@gmail.com",
                "password": "Oliveira-123",
                "serviceId": 438
            }
        }

        this.http.get("https://login.globo.com/login/438", options)
            .subscribe(data => {
                console.log("ok");

                console.log(data);
                this.safeHtmlContent = data['_body'];
            }, error => {
                console.log("erro");

                console.log(error);// Error getting the data
            });
    }

    facebookLogin() {
        let permissions = new Array<string>();
        permissions = ["public_profile", "email"];

        this.facebook.login(permissions).then(() => {
            let params = new Array<string>();

            this.facebook.api("/me?fields=name,email", params).then((res) => {
                // let usuario = new Usuario();

                // usuario.nome = res.name;
                // usuario.email = res.email;
                // usuario.senha = res.id;
                // usuario.login = res.email;

                console.log("Autenticado com sucesso: ", JSON.stringify(res));
                this.facebookData = res;
                this.cartolaLogin();
                // Mozilla / 5.0(Macintosh; Intel Mac OS X 10_12_5) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 58.0.3029.110 Safari / 537.36
            }, (error) => {
                console.log("Api login error");
                console.log(error);
            });
        }, (err) => {
            console.log("Login error");
            console.log(err);
        });
    }

}
