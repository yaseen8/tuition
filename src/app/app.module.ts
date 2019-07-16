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
import { FormsModule } from '@angular/forms';
import { BookingHistoryPage } from './pages/booking-history/booking-history.page';
import { SharedModuleModule } from './shared-module/shared-module.module';
import { PaymentHistoryPage } from './pages/payment-history/payment-history.page';
import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { BookingStatusComponent } from './components/booking-status/booking-status.component';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';

@NgModule({
  declarations: [AppComponent, CourseFilterModalPage, BookingHistoryPage, PaymentHistoryPage, PaymentStatusComponent, BookingStatusComponent],
  entryComponents: [CourseFilterModalPage, BookingHistoryPage, PaymentHistoryPage, PaymentStatusComponent, BookingStatusComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    FormsModule,
    SharedModuleModule,
    AppRoutingModule,
      HttpClientModule,
      IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    FileTransfer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
      { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: HttpAdditionalHeaderInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
