import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
    selector: 'home',
    templateUrl: 'home.html'
})
export class Home {
    constructor(private navCtrl:NavController, private navParams: NavParams) {
       var cartolaData =  this.navParams.get('data');
       if (cartolaData) {
           console.log(cartolaData);
       } else {
           console.log("not");
           
       }
    }

    openPage(){
        this.navCtrl.push(LoginPage);
    }
}