import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SelectEmoji } from '../selectEmoji/selectEmoji';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
    selector: 'home',
    templateUrl: 'home.html'
})
export class Home {
    facebookData: any;
    constructor(public navCtrl: NavController, public http: Http) {
        this.getLoginApi();
    }

    escolherEmoji() {
        this.navCtrl.push(SelectEmoji);
    }

    getLoginApi(){
        // var headers = new Headers();
        // headers.append("Accept", 'application/json');
        // headers.append('Content-Type', 'application/json');
        // headers.append('Access-Control-Allow-Origin', '*');

        // // let options = new RequestOptions({ headers: headers });
        // let header = {
        //     'Access-Control-Allow-Origin' : '*'
        // };
        // this.http.get('https://login.globo.com/login/438', header).subscribe(data => {
        //     console.log(data);            
        // }, err => {
        //     console.log(err)
        // });

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
                // "email": this.facebookData.email,
                // "password": this.facebookData.id,
                // "serviceId": 438
            }
        }

        this.http.post("https://login.globo.com/login/438", postParams, options)
            .subscribe(data => {
                console.log("ok");

                console.log(data['_body']);
            }, error => {
                console.log("erro");

                console.log(JSON.stringify(error));// Error getting the data
            });
        // this.http.post("https://login.globo.com/api/authentication", postParams, options)
        //     .subscribe(data => {
        //         console.log("ok");

        //         console.log(data['_body']);
        //     }, error => {
        //         console.log("erro");

        //         console.log(JSON.stringify(error));// Error getting the data
        //     });
    }
}