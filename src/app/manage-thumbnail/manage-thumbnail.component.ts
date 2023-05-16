import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {angularAddress, serverAddress} from "../../environments/environment";
import {ActivatedRoute} from "@angular/router";
import {DataGrabberService} from "../data-grabber.service";

@Component({
  selector: 'app-manage-thumbnail',
  templateUrl: './manage-thumbnail.component.html',
  styleUrls: ['./manage-thumbnail.component.css']
})
export class ManageThumbnailComponent {
  address: string = angularAddress;
  requestId = ''
  @Input() videoThumbObj: any
  @ViewChild('deleteConf') deleteConf: ElementRef | undefined

  getRequestId(videoId: number) {
    let object: any
    let deleteConf = this.deleteConf?.nativeElement
    deleteConf.style.display = 'block'

    this.apiService.getData(serverAddress + '/delete/?video-id=' + videoId).subscribe(res => {
      object = res
      this.requestId = object.requestId
      console.log(object.requestId)
    })
  }
  closeDeleteDB() {
    let deleteConf = this.deleteConf?.nativeElement
    deleteConf.style.display = 'none'
  }
  deleteVideo() {
    this.apiService.getData(serverAddress + '/delete/?request-id=' + this.requestId).subscribe(res => {
      console.log(res)
    })
    this.closeDeleteDB()
    location.reload()
  }
  constructor(private apiService: DataGrabberService) {
  }
}
