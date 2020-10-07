import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadFilesService {

  private baseUrl = 'http://localhost:3230';

  constructor(private http: HttpClient) { }

  upload(file: any, selectedFileType:string): Observable<HttpEvent<any>> {
    debugger;
    const formData: FormData = new FormData();

    for(var i=0; i<= file.length-1;i++){
      formData.append('image', file[i]);
    }
    

    const req = new HttpRequest('POST', `${this.baseUrl}/multiple/`+selectedFileType, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.baseUrl}/files`);
  }
}
