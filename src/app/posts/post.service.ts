import { Injectable } from '@angular/core';
import { PostSchema } from "../schemas/post";
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericFilterBody } from '../shared/services/data.service';

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
      .pipe();
  }

  findAllFilter(collectionId: string, requestBody: GenericFilterBody): Observable<any[]> {
    return this.http.post<any[]>(`${environment.apiUrl}/api/collections/${collectionId}/findbyfilter`,
        requestBody)
      .pipe();
  }

  saveOne(collectionId: string, data: any): Observable<any> {
    return this.http.post<any[]>(`${environment.apiUrl}/api/collections/${collectionId}/insert`, data)
      .pipe();
  }

  updateOne(collectionId: string, data: any): Observable<any> {
    return this.http.put<any[]>(`${environment.apiUrl}/api/collections/${collectionId}/update`, data)
      .pipe();
  }

  deleteOne(collectionId: string, id: any): Observable<any> {
    return this.http.delete<any[]>(`${environment.apiUrl}/api/collections/${collectionId}/delete/${id}`, id)
      .pipe();
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
