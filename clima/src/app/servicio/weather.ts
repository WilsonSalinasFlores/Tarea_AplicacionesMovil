import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Weather {
  constructor(private http: HttpClient) { }

  // Método en español: obtenerClima
  obtenerClima(ciudad: string) {
    const urlGeo = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(ciudad)}&count=1&language=es&format=json`;

    return this.http.get(urlGeo).pipe(
      switchMap((geoData: any) => {
        const resultados = geoData?.results;
        if (!resultados || resultados.length === 0) {
          // No hay resultados de geocoding
          return throwError(() => ({ message: 'No se encontraron coordenadas para la ciudad.' }));
        }
        const { latitude: latitud, longitude: longitud, name, country } = resultados[0];
        // Obtener clima usando las coordenadas
        const urlClima = `https://api.open-meteo.com/v1/forecast?latitude=${latitud}&longitude=${longitud}&current_weather=true&hourly=relative_humidity_2m&timezone=auto`;
        return this.http.get(urlClima).pipe(
          map((climaData: any) => {
            
            return {
              lugar: {
                nombre: name,
                pais: country,
                latitud,
                longitud
              },
              clima: climaData
            };
          })
        );
      }),
      catchError(err => throwError(() => err))
    );
  }

  // Alias para mantener compatibilidad con llamadas existentes
  getWeather(ciudad: string) {
    return this.obtenerClima(ciudad);
  }
}
