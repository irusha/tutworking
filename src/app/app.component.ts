import {Component, OnInit} from '@angular/core';
import {DataGrabberService} from "./data-grabber.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'HomeHub';
  apiData: any;
  tempVideo: any;
  address: string | undefined;
  previousThumbnail: string | undefined;

  constructor(private apiService: DataGrabberService, private modalService: NgbModal) {
  }

  getChildStuff(stuff: any){
    this.previousThumbnail = stuff
  }

  public open(modal: any): void {
    this.modalService.open(modal);
  }

  ngOnInit(): void {
    this.address = "http://" + window.location.host.split(':')[0]
    this.apiService.getData(this.address + ":5000/recom/").subscribe(res => {
      this.apiData = res
      this.tempVideo = this.apiData.data[2]
    })
  }
}
var lastVideoPrev: any;
var lastVideoThumb: any;
