import {Component, OnInit} from '@angular/core';
import {DataGrabberService} from "./data-grabber.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'HomeHub';
  apiData: any;
  tempVideo: any;

  constructor(private apiService: DataGrabberService) {
  }

  ngOnInit(): void {
    this.apiService.getData("http://localhost:5000/recom/").subscribe(res => {
      this.apiData = res
      this.tempVideo = this.apiData.data[2]
    })
  }
}
