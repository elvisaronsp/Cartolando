import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Home } from '../pages/home/home';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SelectEmoji } from '../pages/selectEmoji/selectEmoji';
import { ParticipanteService } from '../shared/participante/participante.service';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FacebookLoginPage } from '../pages/facebook-login/facebook-login';
import { Facebook } from '@ionic-native/facebook';
import { HTTP } from '@ionic-native/http';
import { IonicStorageModule } from '@ionic/storage';
import { FacebookLoginPageModule } from '../pages/facebook-login/facebook-login.module';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@NgModule({
  declarations: [
    MyApp,
    Home,
    SelectEmoji,
    // FacebookLoginPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    FacebookLoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Home,
    SelectEmoji,
    FacebookLoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ParticipanteService,
    StatusBar,
    Facebook,
    InAppBrowser
  ]
})
export class AppModule {}
