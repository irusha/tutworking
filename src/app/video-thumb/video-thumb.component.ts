import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {angularAddress, serverAddress} from "../../environments/environment";

@Component({
  selector: 'app-video-thumb',
  templateUrl: './video-thumb.component.html',
  styleUrls: ['./video-thumb.component.css']
})

export class VideoThumbComponent implements AfterViewInit, OnInit {
  @ViewChild('thumbPrev') thumbPrev: ElementRef | undefined;
  @ViewChild('thumbImg') thumbImg: ElementRef | undefined;
  @ViewChild('thumbnail') thumbnail: ElementRef | undefined;
  @ViewChild('progressBarCont') progressBarCont: ElementRef | undefined;
  @Input() videoThumbObj: any;
  @Input() prevVideoElements: any;
  @Output() itemEvent = new EventEmitter<any>;
  time: string | undefined;
  address: string = angularAddress;

  setPreviousItem(values: any) {
    this.itemEvent.emit(values);
  }

  ngOnInit():void {
    this.secondsToFormatted()
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
      if (this.prevVideoElements[0] != newVideoPrev) {
        this.pauseVideo(this.prevVideoElements[0], this.prevVideoElements[1])
      }
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

  secondsToFormatted() {
    const seconds = this.videoThumbObj.length
    const intSec = parseInt(seconds)
    if (intSec < 60) {
      this.time = `00:${seconds < 10 ? '0' + seconds : seconds}`
    } else if (intSec >= 60 && intSec < 3600) {
      this.time = `${(intSec / 60) < 10 ? '0'
        + parseInt(String(intSec / 60)) : parseInt(String(intSec / 60))}:${(intSec % 60) < 10 ? '0'
        + (intSec % 60) : (intSec % 60)
      }`
    } else {
      this.time = `${parseInt(String(intSec / 3600))
      }:${
        ((intSec % 3600) / 60) < 10 ? '0' + parseInt(String((intSec % 3600) / 60)) :
          parseInt(String((intSec % 3600) / 60))
      }:${
        ((intSec % 3600) % 60) < 10 ? '0' + parseInt(String((intSec % 3600) % 60)) :
          parseInt(String((intSec % 3600) % 60))
      }`
    }
  }
}
