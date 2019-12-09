import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-price-checker-input',
  templateUrl: './price-checker-input.component.html',
  styleUrls: ['./price-checker-input.component.scss']
})
export class PriceCheckerInputComponent implements OnInit {

  fileData: File = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      const formData = new FormData();
      formData.append('file', this.fileData);
      this.http.post('/api/file-upload', formData)
        .subscribe(res => {
          console.log(res);
        })
  }
}
