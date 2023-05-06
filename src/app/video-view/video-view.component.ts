import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {DataGrabberService} from "../data-grabber.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-video-view',
  templateUrl: './video-view.component.html',
  styleUrls: ['./video-view.component.css']
})
export class VideoViewComponent implements OnInit, AfterViewInit {
  videoId: string | undefined;
  address: string | undefined;
  apiDataObj: any;

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
      this.address = "http://" + window.location.host.split(':')[0]
      this.apiService.getData(this.address + ":5000/library/?video-id=" + this.videoId).subscribe(res => {
        this.apiDataObj = res
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
    this.titleService.setTitle(this.apiDataObj.title + ' - HomeHub')
  }
}
