import { Injectable } from '@angular/core';
import { Course } from './interfaces/course';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  insertOne(course: Course): Observable<any> {
    return this.http.post<Course>(`${environment.apiUrl}/api/course/insert`, course, this.httpOptions)
      .pipe(
        catchError(this.handleError<Course>('Add Course'))
      );
  }

  getOne(id): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.apiUrl}/api/course/findone/${id}`)
      .pipe(
        tap(_ => console.log(`Course fetched: ${id}`)),
        catchError(this.handleError<Course[]>(`Get Course id=${id}`))
      );
  }

  findAll(): Observable<Course[]> {
    return this.http.get<Course[]>(`${environment.apiUrl}/api/course/findall`)
      .pipe(
        tap(courses => {/*console.log('Courses fetched!')*/}),
        catchError(this.handleError<Course[]>('Get Songs', []))
      );
  }

  update(_id, course: Course): Observable<any> {
    let data = {
      query: {
        id: _id
      },
      data: course
    }
    return this.http.put(`${environment.apiUrl}/api/course/update`, data, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Course updated: ${_id}`)),
        catchError(this.handleError<Course[]>('Update Song'))
      );
  }

  delete(id): Observable<Course[]> {
    return this.http.delete<Course[]>(`${environment.apiUrl}/api/course/delete/` + id, this.httpOptions)
      .pipe(
        tap(_ => console.log(`Course deleted: ${id}`)),
        catchError(this.handleError<Course[]>('Delete Course'))
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
