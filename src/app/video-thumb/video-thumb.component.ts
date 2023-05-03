import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-video-thumb',
  templateUrl: './video-thumb.component.html',
  styleUrls: ['./video-thumb.component.css']
})
export class VideoThumbComponent implements AfterViewInit {
  @ViewChild('thumb') thumb: ElementRef | undefined;
  @Input() videoThumbObj: any;

  ngAfterViewInit(): void {
    // @ts-ignore
    let thumbElement = this.thumb.nativeElement
    thumbElement.onmouseover = () => this.playVideo(thumbElement)
    thumbElement.onmouseleave = () => this.pauseVideo(thumbElement)
  }

  playVideo(thumbElement: any) {
    thumbElement.play()
  }

  pauseVideo(thumbElement: any) {
    thumbElement.pause()
  }

}


