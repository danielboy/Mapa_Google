import { Injectable } from '@angular/core';
import { Connectivity } from './connectivity';
import { Geolocation } from 'ionic-native';

declare var google;

@Injectable()
export class GoogleMaps {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string;
  lat: any;
  lon: any;
  zoom: number;

  constructor(public connectivityService: Connectivity) {

  }

  init(mapElement: any, pleaseConnect: any, lat: any, lon: any, zoom: any): Promise<any> {

    this.mapElement = mapElement;
    this.pleaseConnect = pleaseConnect;
    this.lat = lat;
    this.lon = lon;
    this.zoom = zoom;
    //this.apiKey = 'AIzaSyDJp7EuJwc7k3f-NUaApYsR9e_xOr5Tyr4';
    
    return this.loadGoogleMaps();
    
  }

  loadGoogleMaps(): Promise<any> {

    return new Promise((resolve) => {

      if(typeof google == "undefined" || typeof google.maps == "undefined"){

        this.disableMap();

        if(this.connectivityService.isOnline()){

          window['mapInit'] = () => {

            this.initMap().then(() => {
              resolve(true);
            });

            this.enableMap();
          }

          let script = document.createElement("script");
          script.id = "googleMaps";

          if(this.apiKey){
            script.src = 'http://maps.google.com/maps/api/js?key=' + this.apiKey + '&callback=mapInit';
          } else {
            script.src = 'http://maps.google.com/maps/api/js?callback=mapInit';       
          }

          document.body.appendChild(script);  

        } 
      }
      else {

        if(this.connectivityService.isOnline()){
          this.initMap();
          this.enableMap();
        }
        else {
          this.enableMap();
        }

      }


    });

  }

  geolocation() {
          Geolocation.getCurrentPosition().then((position) => {
       // let actual = (position.coords.latitude, position.coords.longitude);
        });
  }

  initMap(): Promise<any> {

    this.mapInitialised = true;

    return new Promise((resolve) => {

        let latLng = new google.maps.LatLng(this.lat,this.lon);
        let Zoom  = Number(this.zoom);
          console.log(Zoom)
        let mapOptions = {
          center: latLng,
          zoom: Zoom,
          mapTypeId: google.maps.MapTypeId.ROAD
        }
        console.log(mapOptions)

        //google.setOnLoadCallback(initialize);


        this.map = new google.maps.Map(this.mapElement, mapOptions);
        resolve(true);


    });

  }


  disableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "block";
    }

  }

  enableMap(): void {

    if(this.pleaseConnect){
      this.pleaseConnect.style.display = "none";
    }
  }

  addMarker(lat: any, lon:any, edificio:any, dom:any, tel:any): void {
    let infowindow = new google.maps.InfoWindow( {content: '<a> <b>Sede:</b> '+edificio+'</a><br><a><b>Domicilio:</b> '+dom+'</a><br><a><b>Telefono:</b>'+tel+'</a>'});
    let latLng = new google.maps.LatLng(lat,lon);
    let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
        icon: { 'url': './assets/uan.png'}
      });

        window.setTimeout(function() {infowindow.open(this.map, marker);},2000);
        marker.addListener('click', function() {
        infowindow.open(this.map, marker);
     });

   this.markers.push(marker);  

  }

}