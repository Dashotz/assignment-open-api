import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class AppService {
  private readonly baseUrl = 'https://www.digi-api.com/api/v1';

  constructor(private readonly httpService: HttpService) {}

  getDigimonList(
    name?: string,
    exact?: boolean,
    page: number = 0,
    pageSize: number = 20,
  ): Observable<any> {
    return this.httpService
      .get(`${this.baseUrl}/digimon`, {
        params: {
          name,
          pageSize,
          page,
          ...(exact && { exact }),
        },
      })
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('API Error:', error);
          throw error;
        }),
      );
  }

  getAllDigimon(): Observable<any> {
    return this.httpService
      .get(`${this.baseUrl}/digimon`)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('API Error:', error);
          throw error;
        }),
      );
  }

  getDigimon(idOrName: string): Observable<any> {
    return this.httpService
      .get(`${this.baseUrl}/digimon/${idOrName}`)
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          console.error('API Error:', error);
          throw error;
        }),
      );
  }
} 