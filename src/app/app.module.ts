import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { MapPage } from '../pages/map/map';
import { SedesPage } from '../pages/sedes/sedes';
import { GoogleMaps } from '../providers/google-maps';
import { Connectivity } from '../providers/connectivity';
import { informacion } from '../providers/servicios';

@NgModule({
  declarations: [
    MyApp,
    SedesPage,
    MapPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SedesPage,
    MapPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, GoogleMaps, Connectivity, informacion]
})
export class AppModule {}