import { Component } from '@angular/core';
import { Weather } from '../servicio/weather';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  nombreCiudad: string = '';
  weatherData: any;
  today: Date = new Date();

  constructor(
    private weatherServicio: Weather,
    private toastCtrl: ToastController
  ) {}

  searchWeather() {
    this.weatherServicio.getWeather(this.nombreCiudad).subscribe({
      next: (data) => {
       
        try {
          console.log(data);
          const lugar = data.lugar;
          const clima = data.clima;
          const actual = clima.current_weather;

          let humedad: any = undefined;
          const tiempos = clima.hourly?.time;

          
          if (actual.weathercode >= 0) {
            humedad = clima.hourly.relative_humidity_2m[Number.parseInt(actual.weathercode)];
          }
          
          const viento= `${actual.windspeed} km/h  ${actual.winddirection}°` ;
          
          this.weatherData = {
            nombre: lugar?.nombre ?? 'Desconocido',
            pais: lugar?.pais ?? '',
            temp: actual?.temperature ?? null,
            humedad: humedad ?? null,
            descripcion: actual?.weathercode ? `Código ${actual.weathercode}` : 'Datos del clima',
            viento: viento

          };
          console.log('Datos mapeados:', this.weatherData);
        } catch (e) {
          console.error('Error mapeando datos del clima', e, data);
          this.weatherData = null;
        }
      },
      error: (err) => {
        console.error('Error al consultar el clima', err);
        
        const mensaje = err?.error?.message ? `Error: ${err.error.message}` : 'Ciudad no encontrada';
        this.mostrarToast(mensaje);
      }
    });
  }

  mostrarToast(mensaje: string) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    }).then(toast => toast.present());
  }

}
