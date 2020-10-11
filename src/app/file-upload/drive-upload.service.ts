import { Injectable } from '@angular/core';
import { PostSchema } from "../schemas/post";
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericFilterBody } from '../shared/services/data.service';
import { Base64 } from '@ionic-native/base64/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private base64: Base64, private fileChooser: FileChooser) { }

  createfile(base64:any, name:string): Observable<any> {
    const formBody = {
      'folderId': environment.googleApiFolder,
      'name': name,
      'uploadFileBase64': base64
    }
    return this.http.post(`${environment.apiUrl}/createfile`, formBody).pipe(data=> {return data})
  }

  deletefile(fileId: string): Observable<any> {
    return this.http.delete(environment.apiUrl + '/filedata/' + fileId).pipe(data=> {return data})
  }

  convertToBase64(filePath: string){
    this.base64.encodeFile(filePath).then((base64File: string) => {
      console.log(base64File);
    }, (err) => {
      console.log(err);
    });
  }

  async chooseFile(){
    let result = await this.fileChooser.open().catch(
      err => { console.log(err) } 
    )
    console.log(result);
    
  }

  /********************* */
}
