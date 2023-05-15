import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {VideoViewComponent} from "../video-view/video-view.component";
import {HomeComponent} from "../home/home.component";
import {UploadComponent} from "../upload/upload.component";
import {SearchPageComponent} from "../search-page/search-page.component";
import {ManageComponent} from "../manage/manage.component";

const routes: Routes = [
  {
    path: 'video', component: VideoViewComponent
  }, {
    path: '', component: HomeComponent
  }, {
    path: 'upload', component: UploadComponent
  }, {
    path: 'search', component: SearchPageComponent
  }, {
    path: 'manage', component: ManageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
