import { Injectable } from '@angular/core';
import { PostSchema } from "../schemas/post";
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PostsService {
  apiKeyword = 'posts'

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  findAll(): Observable<PostSchema[]> {
    return this.http.get<PostSchema[]>(`${environment.apiUrl}/api/collections/${this.apiKeyword}/findall`)
      .pipe(
        tap(courses => {/*console.log('Courses fetched!')*/}),
        catchError(this.handleError<PostSchema[]>('Get Posts', []))
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
