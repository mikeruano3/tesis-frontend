import { Injectable } from '@angular/core';
import { PostSchema } from "../schemas/post";
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export interface GenericFilterBody {
  query:any,
  projection:any,
  sort:any,
  populate:any
}

@Injectable({
  providedIn: 'root'
})

export class PostsService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  /*** GENERIC ****/
  findAll(collectionId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/collections/${collectionId}/findall`)
      .pipe(
        tap(courses => {/*console.log('Fetched!')*/}),
        catchError(this.handleError<any[]>('Get Posts', []))
      );
  }

  findAllFilter(collectionId: string, requestBody: GenericFilterBody): Observable<any[]> {
    return this.http.post<any[]>(`${environment.apiUrl}/api/collections/${collectionId}/findbyfilter`,
        requestBody)
      .pipe(
        tap(courses => {/*console.log('Fetched!')*/}),
        catchError(this.handleError<any[]>('Get Posts', []))
      );
  }

  saveOne(collectionId: string, data: any): Observable<any> {
    return this.http.post<any[]>(`${environment.apiUrl}/api/collections/${collectionId}/insert`, data)
      .pipe(
        tap(courses => {/*console.log('Fetched!')*/}),
        catchError(this.handleError<any[]>('Save', []))
      );
  }

  updateOne(collectionId: string, data: any): Observable<any> {
    return this.http.put<any[]>(`${environment.apiUrl}/api/collections/${collectionId}/update`, data)
      .pipe(
        tap(courses => {/*console.log('Fetched!')*/}),
        catchError(this.handleError<any[]>('Save', []))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  /********************* */
}
