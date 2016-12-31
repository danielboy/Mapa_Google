import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {informacion} from '../../providers/servicios';
import {MapPage} from '../map/map';

@Component({
  templateUrl: 'sedes.html',
  providers: [informacion]
})
export class SedesPage {

  Servicio: any;
  data_edi: any;

  constructor(public navCtrl: NavController, private servicios: informacion) {


    this.Servicio = servicios;
    this.data_edi = this.Servicio.edificios;

  }

  goMap(datos){
    this.navCtrl.push(MapPage,{data:datos.data});

  }

}
