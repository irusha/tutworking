import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})
export class VideoListComponent {
  @Input() apiData :any;
  previousThumbnail: string | undefined;

  setChildStuff(stuff: any){
    this.previousThumbnail = stuff
  }
}
