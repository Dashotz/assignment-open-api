import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class DigimonService {
  private readonly baseUrl = 'https://digimon-api.vercel.app/api/digimon';

  constructor(private readonly httpService: HttpService) {}

  getDigimonList(
    page: number = 0,
    pageSize: number = 20,
    name?: string,
    level?: string,
  ): Observable<any> {
    return this.httpService
      .get(this.baseUrl)
      .pipe(
        map((response) => {
          let digimon = response.data;

          // Filter by name if specified
          if (name) {
            digimon = digimon.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
          }

          // Filter by level if specified
          if (level) {
            digimon = digimon.filter(d => d.level.toLowerCase() === level.toLowerCase());
          }

          return digimon;
        }),
        catchError((error) => {
          console.error('API Error:', error.message);
          throw error;
        }),
      );
  }

  getDigimonByName(name: string): Observable<any> {
    return this.httpService
      .get(`${this.baseUrl}/name/${name}`)
      .pipe(
        map((response) => {
          const digimon = response.data[0];
          return digimon || { name: name, level: 'Not found', img: '' };
        }),
        catchError((error) => {
          console.error('API Error:', error.message);
          throw error;
        }),
      );
  }
} 