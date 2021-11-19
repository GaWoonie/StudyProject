/*
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public BASE_URL = environment.baseUrl

  constructor(private http: HttpClient) {}

  get<T>(endPoint: string): Observable<T> {
    return this.http.get<T>(`${this.BASE_URL}${endPoint}`)
  }

  post<T>(endPoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.BASE_URL}${endPoint}`, body)
  }

  put<T>(endPoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.BASE_URL}${endPoint}`, body)
  }

  delete<T>(endPoint: string): Observable<T> {
    return this.http.delete<T>(`${this.BASE_URL}${endPoint}`)
  }
}
*/
