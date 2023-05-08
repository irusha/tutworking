import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { VideoThumbComponent } from './video-thumb/video-thumb.component';
import {HttpClientModule} from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VideoListComponent } from './video-list/video-list.component';
import {AppRoutingModule} from "./routing/app-routing.module";
import { VideoViewComponent } from './video-view/video-view.component';
import { HomeComponent } from './home/home.component';
import { LabelsEditorComponent } from './labels-editor/labels-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    VideoThumbComponent,
    VideoListComponent,
    VideoViewComponent,
    HomeComponent,
    LabelsEditorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
