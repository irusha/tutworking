import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {DataGrabberService} from "../data-grabber.service";
import {Title} from "@angular/platform-browser";
import {serverAddress} from "../../environments/environment";

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit, AfterViewInit {
  videoId: string | undefined;
  labels: any;
  apiDataObj: any;
  private recomObj: any;
  apiData: any;

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
          this.videoId = params['id']
          console.log(params);
        }
      );

    if (this.videoId == null) {
      window.location.href = "/";
    }
    else {
      this.apiService.getData(serverAddress + "/library/?video-id=" + this.videoId).subscribe(res => {
        this.apiDataObj = res
      })

      this.apiService.getData(serverAddress + "/recom/").subscribe(res => {
        this.recomObj = res
        this.apiData = this.recomObj.data
      })
    }

  }

  constructor(private route: ActivatedRoute, private apiService: DataGrabberService, private titleService:Title) {

  }

  titleFormatter(title: string) {
    const splitTitle = title.split('.')[0]
    return splitTitle
  }

  ngAfterViewInit(): void {
    this.titleService.setTitle(this.titleFormatter(this.apiDataObj.title) + ' - HomeHub')
  }
}
