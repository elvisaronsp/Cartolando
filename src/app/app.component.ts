import { Component } from '@angular/core';

import { Platform } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ParticipanteService } from '../shared/participante/participante.service';
import { Home } from '../pages/home/home';
<<<<<<< HEAD
import { LoginPage } from '../pages/login/login';
=======
import { FacebookLoginPage } from '../pages/facebook-login/facebook-login';
>>>>>>> parent of 1f7cc39... Login ok


@Component({
  templateUrl: 'app.html',
  providers: [ParticipanteService],
})
export class MyApp {

  // make Home the root (or first) page
<<<<<<< HEAD
  rootPage = LoginPage;
=======
  rootPage = FacebookLoginPage;
>>>>>>> parent of 1f7cc39... Login ok

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
