import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CourseFilterModalPage} from "./modal/course-filter-modal/course-filter-modal.page";
import { IonicStorageModule } from '@ionic/storage';
import {HttpAuthInterceptor} from "./services/interceptor/http.auth.interceptor";
import {HttpAdditionalHeaderInterceptor} from "./services/interceptor/http-additional-header.interceptor";
import {HttpErrorInterceptor} from "./services/interceptor/http-error.interceptor";

@NgModule({
  declarations: [AppComponent, CourseFilterModalPage],
  entryComponents: [CourseFilterModalPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
      HttpClientModule,
      IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: HttpAdditionalHeaderInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
