import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-video-thumb',
  templateUrl: './video-thumb.component.html',
  styleUrls: ['./video-thumb.component.css']
})

export class VideoThumbComponent implements AfterViewInit {
  @ViewChild('thumbPrev') thumbPrev: ElementRef | undefined;
  @ViewChild('thumbImg') thumbImg: ElementRef | undefined;
  @ViewChild('thumbnail') thumbnail: ElementRef | undefined;
  @Input() videoThumbObj: any;
  @Input() prevVideoElements: any;
  @Output() itemEvent = new EventEmitter<any>;

  lastVideoPrev: any;
  lastVideoThumb: any;

  setPreviousItem(values: any) {
    this.itemEvent.emit(values);
  }

  ngAfterViewInit(): void {
    let thumbElement = this.thumbnail?.nativeElement
    let thumbVideo = this.thumbPrev?.nativeElement
    let thumbImage = this.thumbImg?.nativeElement
    thumbElement.onmouseover = () => this.playVideo(thumbVideo, thumbImage)
    thumbElement.onmouseleave = () => this.pauseVideo(thumbVideo, thumbImage)
    thumbElement.addEventListener("touchstart", () =>
      this.playCertainVideo(thumbVideo, thumbImage))
  }

  playCertainVideo(newVideoPrev: any, newVideoThumb: any) {
    if (this.prevVideoElements != null) {
      this.pauseVideo(this.prevVideoElements[0], this.prevVideoElements[1])
    }
    this.setPreviousItem([newVideoPrev, newVideoThumb])
    this.playVideo(newVideoPrev, newVideoThumb)
  }

  playVideo(thumbVideo: any, thumbImage: any) {
    thumbImage.style.display = 'none'
    thumbVideo.style.display = 'block'
    thumbVideo.play()
  }

  pauseVideo(thumbVideo: any, thumbImage: any) {
    thumbVideo.pause()
    thumbImage.style.display = 'block'
    thumbVideo.style.display = 'none'
  }

}
function handleStart() {
  console.log("yoyo")
}

