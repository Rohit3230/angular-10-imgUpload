import { Component, OnInit } from '@angular/core';
import { UploadFilesService } from 'src/app/services/upload-files.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-upload-images',
  templateUrl: './upload-images.component.html',
  styleUrls: ['./upload-images.component.css']
})
export class UploadImagesComponent implements OnInit {

  selectedFiles: FileList;
  progressInfos = [];
  message = '';
  selected = 'aadhar';
  responseObj : any;
  fileTypeArr = [
      {id:'Aadhar Card',Value:'aadhar'},
      {id:'Pan Card',Value:'pan'},
      {id:'Passport',Value:'passport'},
      {id:'Bank Check',Value:'check'},
      {id:'Driving Licence',Value:'drivingLicence'}
    ];

  fileInfos: Observable<any>;

  constructor(private uploadService: UploadFilesService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

  // getProperKeyName(fileT){
    
  // }


  selectFiles(event): void {
    this.progressInfos = [];

    const files = event.target.files;
    let isImage = true;

    for (let i = 0; i < files.length; i++) {
      if (files.item(i).type.match('image.*')) {
        continue;
      } else {
        isImage = false;
        alert('invalid format!');
        break;
      }
    }

    if (isImage) {
      this.selectedFiles = event.target.files;
    } else {
      this.selectedFiles = undefined;
      event.srcElement.percentage = null;
    }
  }

  upload(idx, file): void {
    debugger;
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.uploadService.upload(file).subscribe(
      event => {
        
        if (event.type === HttpEventType.UploadProgress) {
          debugger;
          this.progressInfos[idx].percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          debugger;
          this.responseObj = event.body;
          // this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].percentage = 0;
        this.responseObj = err.error;
        // this.message = 'Could not upload the file:' + file.name;
        this.message = err.error && err.error.message ? err.error.message : 'Something Wrong.';
      });
  }

  uploadFiles(): void {
    this.message = '';
    this.responseObj = null;
    this.upload(0, this.selectedFiles);
    // for (let i = 0; i < this.selectedFiles.length; i++) {
    //   this.upload(i, this.selectedFiles[i]);
    // }
  }

}
