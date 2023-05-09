import {AfterViewInit, Component, ElementRef, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {DataGrabberService} from "../data-grabber.service";
import {serverAddress} from "../../environments/environment";

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})

export class UploadComponent implements AfterViewInit {
  @ViewChild('files') files: ElementRef | undefined;
  @ViewChild('uploadedMsg') uploadedMsg: ElementRef | undefined;

  uploadFunc() {
    let files = this.files?.nativeElement.files
    let formData: FormData = new FormData()
    for (let i = 0; i < files.length; i++) {
      let currentFile = files[i]
      formData.append('file', currentFile)
    }
    console.log(formData)
    this.apiService.postData(serverAddress + '/upload/', formData).subscribe(any => this.uploadData = any)
  }

  set uploadData(data: any) {
    console.log(data)
    let uploadedMsg = this.uploadedMsg?.nativeElement
    uploadedMsg.style.display = 'block'
  }

  constructor(private apiService: DataGrabberService) {
  }

  ngAfterViewInit(): void {
  }
}
