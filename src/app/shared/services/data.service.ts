import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class DataService {
  public apiKeyword = ''

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  setCollection(name: string){
    this.apiKeyword = name
  }

  findAll(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/collections/${this.apiKeyword}/findall`)
      .pipe(
        tap(courses => {/*console.log('Courses fetched!')*/}),
        catchError(this.handleError<any[]>('Get Posts', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
