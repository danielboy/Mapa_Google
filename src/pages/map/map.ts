import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleMaps } from '../../providers/google-maps';
import { NavController, Platform , NavParams} from 'ionic-angular';
//import { Geolocation } from 'ionic-native';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('pleaseConnect') pleaseConnect: ElementRef;
  google; any;
  lat: any;
  lon: any;
  edificio: any;
  android: any
  ios: any;
  dom: any;
  zoom: any;
  tel: any;

  constructor(public navCtrl: NavController, public maps: GoogleMaps, public platform: Platform, private params:NavParams) {
   
    this.lat = params.data.data.lat;
    this.lon = params.data.data.lon;
    this.edificio = params.data.data.edificio;
    this.zoom = params.data.data.zoom;
    this.dom = params.data.data.domicilio;
    this.tel = params.data.data.telefono;
    this.ios = 'http://maps.apple.com?addr=Current%20Location&daddr='+ this.lat +',' + this.lon;
    this.android = 'http://maps.google.com?addr=Current%20Location&daddr='+ this.lat +',' + this.lon;


  }

  ionViewDidLoad(){


    this.platform.ready().then(() => {

        this.maps.init(this.mapElement.nativeElement, this.pleaseConnect.nativeElement, this.lat, this.lon, this.zoom);
            
    });

   if (this.platform.is('android')) {
      window.location.href = this.android;

   }
   if (this.platform.is('ios')) { 
      window.location.href = this.ios;
         
   } else {
     console.log('Información no disponible')
   }    

  }

  ionViewDidEnter(){

    this.maps.addMarker(this.lat, this.lon, this.edificio, this.dom, this.tel);

  }

}